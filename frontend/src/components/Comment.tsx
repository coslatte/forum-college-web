import React, { useState, useEffect } from "react";
import VoteButton from "./buttons/VoteButton";
import { voteComment } from "../services/api";
import type { CommentType } from "./types/comments";

interface CommentProps extends CommentType {
  id: number;
  onVoteChange?: (commentId: number, voteType: "upvote" | "downvote") => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  user,
  profilePicture,
  content,
  upvotes,
  downvotes,
  onVoteChange,
}) => {
  const [upvotesState, setUpvotes] = useState(upvotes);
  const [downvotesState, setDownvotes] = useState(downvotes);
  const [isUpvoted, setUpvoted] = useState(false);
  const [isDownvoted, setDownvoted] = useState(false);

  const handleUpvote = async () => {
    try {
      // Si el downvote está activo, desactivar
      if (isDownvoted) {
        setDownvotes(downvotesState - 1);
        setDownvoted(false);
      }
      // Manejar upvote
      if (!isUpvoted) {
        setUpvotes(upvotesState + 1);
        setUpvoted(true);

        await voteComment(id, "upvote");
        onVoteChange?.(id, "upvote");
      } else {
        setUpvotes(upvotesState - 1);
        setUpvoted(false);

        await voteComment(id, "upvote");
        onVoteChange?.(id, "upvote");
      }
    } catch {
      // Revertir cambios si hay error
      if (!isUpvoted) {
        setUpvotes(upvotesState - 1);
        setUpvoted(false);
      } else {
        setUpvotes(upvotesState + 1);
        setUpvoted(true);
      }
      if (isDownvoted) {
        setDownvotes(downvotesState + 1);
        setDownvoted(true);
      }
    }
  };

  const handleDownvote = async () => {
    try {
      // Si el upvote está activo, lo desactivamos
      if (isUpvoted) {
        setUpvotes(upvotesState - 1);
        setUpvoted(false);
      }
      // Manejamos el downvote
      if (!isDownvoted) {
        setDownvotes(downvotesState + 1);
        setDownvoted(true);
        await voteComment(id, "downvote");
        onVoteChange?.(id, "downvote");
      } else {
        setDownvotes(downvotesState - 1);
        setDownvoted(false);
        await voteComment(id, "downvote");
        onVoteChange?.(id, "downvote");
      }
    } catch {
      // Revertir cambios si hay error
      if (!isDownvoted) {
        setDownvotes(downvotesState - 1);
        setDownvoted(false);
      } else {
        setDownvotes(downvotesState + 1);
        setDownvoted(true);
      }
      if (isUpvoted) {
        setUpvotes(upvotesState + 1);
        setUpvoted(true);
      }
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
      <div className="comment-bg-200 z-10 w-full rounded-xl px-2 p-1 flex items-center gap-2">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={`${user}'s profile`}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">{user?.[0]}</span>
          </div>
        )}
        <span className="comment-text-special">{user}</span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center items-start comment-bg-300 -mt-3 w-full rounded-b-xl px-2 h-full pt-4 p-4 space-y-1">
        <span className="flex-shrink comment-text">{content}</span>

        {/* VOTES */}
        <div className="flex space-x-4 justify-center items-center">
          <div className="flex space-x-1">
            <VoteButton
              voteType="upvote"
              size={20}
              isVoted={isUpvoted}
              onVote={handleUpvote}
            />
            <span>{upvotesState}</span>
          </div>
          <div className="flex space-x-1">
            <VoteButton
              voteType="downvote"
              size={20}
              isVoted={isDownvoted}
              onVote={handleDownvote}
            />
            <span>{downvotesState}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
