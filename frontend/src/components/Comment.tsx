import React, { useState, useEffect } from "react";
import { voteComment } from "../services/api";
import VoteButton from "./buttons/VoteButton";

interface CommentProps {
  id: number;
  forum_user: {
    id: number;
    username: string;
    profile_pic: string | null;
  };
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  onVoteChange: (
    commentId: number,
    voteType: "upvote" | "downvote",
    upvotes: number,
    downvotes: number
  ) => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  forum_user,
  content,
  upvotes,
  downvotes,
  onVoteChange,
}) => {
  const [upvotesState, setUpvotes] = useState<number>(upvotes);
  const [downvotesState, setDownvotes] = useState<number>(downvotes);
  const [isUpvoted, setUpvoted] = useState(false);
  const [isDownvoted, setDownvoted] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      const removing = (isUpvoted && voteType === "upvote") || (isDownvoted && voteType === "downvote");
      const delta = removing ? -1 : 1;

      // Actualiza optimistamente el estado local
      if (voteType === "upvote") {
        setUpvoted(!isUpvoted);
        setUpvotes(upvotesState + delta);
        if (!removing) {
          setDownvoted(false);
        }
      } else {
        setDownvoted(!isDownvoted);
        setDownvotes(downvotesState + delta);
        if (!removing) {
          setUpvoted(false);
        }
      }

      // Llama a la API y actualiza el estado con la respuesta real
      const updated = await voteComment(id, voteType, delta);
      setUpvotes(updated.upvotes);
      setDownvotes(updated.downvotes);

      onVoteChange(id, voteType, updated.upvotes, updated.downvotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Si el componente recibe nuevos valores de upvotes/downvotes, actualizamos el estado
    setUpvotes(upvotes);
    setDownvotes(downvotes);
  }, [upvotes, downvotes]);

  return (
    <div className="flex flex-col w-full">
      {/* USER */}
      <div className="bg-teal-700 z-10 w-full rounded-xl px-2 p-1 flex items-center gap-2">
        {forum_user.profile_pic ? (
          <img
            src={forum_user.profile_pic}
            alt={`${forum_user.username}'s profile`}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">{forum_user.username[0]}</span>
          </div>
        )}
        <span className="comment-text-special">{forum_user.username}</span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center items-start bg-teal-50 -mt-3 w-full rounded-b-xl px-2 h-full pt-4 p-4 space-y-1">
        <span className="flex-shrink comment-text">{content}</span>

        {/* VOTES */}
        <div className="flex space-x-4 justify-center items-center">
          <div className="flex space-x-1">
            <VoteButton
              voteType="upvote"
              size={20}
              isVoted={isUpvoted}
              onVote={() => handleVote("upvote")}
            />
            <span>{upvotesState}</span>
          </div>
          <div className="flex space-x-1">
            <VoteButton
              voteType="downvote"
              size={20}
              isVoted={isDownvoted}
              onVote={() => handleVote("downvote")}
            />
            <span>{downvotesState}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
