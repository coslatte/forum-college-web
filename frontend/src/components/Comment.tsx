import React, { useState, useEffect } from "react";
import VoteButton from "./buttons/VoteButton";
import { voteComment } from "../services/api";
import type { CommentType } from "./types/comments";

interface CommentProps extends CommentType {
  id: number;
  onVoteChange: (commentId: number, voteType: "upvote" | "downvote") => void;
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

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      // Esto regula que no se accionen simultáneamente upvote y downvote
      if (voteType === "upvote" && isDownvoted) {
        setDownvotes(downvotesState - 1);
        setDownvoted(false);
      } else if (voteType === "downvote" && isUpvoted) {
        setUpvotes(upvotesState - 1);
        setUpvoted(false);
      }

      // Manejar votos
      if (voteType === "upvote" ? isUpvoted : isDownvoted) {
        // Quitar voto
        if (voteType === "upvote") {
          setUpvotes(upvotesState - 1);
          setUpvoted(false);
        } else {
          setDownvotes(downvotesState - 1);
          setDownvoted(false);
        }
      } else {
        // Dar voto
        if (voteType === "upvote") {
          setUpvotes(upvotesState + 1);
          setUpvoted(true);
        } else {
          setDownvotes(downvotesState + 1);
          setDownvoted(true);
        }
      }

      // Llamada a la API y callback
      await voteComment(id, voteType);
      onVoteChange(id, voteType);
    } catch {
      // Revertir cambios en caso de error
      if (voteType === "upvote") {
        if (!isUpvoted) {
          setUpvotes(upvotesState - 1);
          setUpvoted(false);
        } else {
          setUpvotes(upvotesState + 1);
          setUpvoted(true);
        }
      } else {
        if (!isDownvoted) {
          setDownvotes(downvotesState - 1);
          setDownvoted(false);
        } else {
          setDownvotes(downvotesState + 1);
          setDownvoted(true);
        }
      }
      // Restaurar voto opuesto si estaba activo
      if (voteType === "upvote" && isDownvoted) {
        setDownvotes(downvotesState + 1);
        setDownvoted(true);
      } else if (voteType === "downvote" && isUpvoted) {
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
