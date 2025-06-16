import React, { useState, useEffect } from "react";
import { voteComment } from "../services/api";
import VoteButton from "./buttons/VoteButton";
import { formatFullDate, timeAgo } from "../utils/date";
import { ProfilePic } from "./ProfilePic";

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
  created_at,
  updated_at,
  onVoteChange,
}) => {
  const [upvotesState, setUpvotes] = useState<number>(upvotes);
  const [downvotesState, setDownvotes] = useState<number>(downvotes);
  const [isUpvoted, setUpvoted] = useState(false);
  const [isDownvoted, setDownvoted] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    // Guardar snapshot para posible rollback en caso de error
    const prevState = {
      upvotes: upvotesState,
      downvotes: downvotesState,
      isUp: isUpvoted,
      isDown: isDownvoted,
    };

    // Determinar la operación solicitada
    const isRemoving =
      (isUpvoted && voteType === "upvote") ||
      (isDownvoted && voteType === "downvote");

    const isSwitching =
      (voteType === "upvote" && isDownvoted) ||
      (voteType === "downvote" && isUpvoted);

    // 1) Actualización optimista en el UI --------------
    let optimisticUp = upvotesState;
    let optimisticDown = downvotesState;

    if (isSwitching) {
      // Quitar voto previo y aplicar nuevo
      if (voteType === "upvote") {
        optimisticUp += 1;
        optimisticDown -= 1;
        setUpvoted(true);
        setDownvoted(false);
      } else if (voteType === "downvote") {
        optimisticUp -= 1;
        optimisticDown += 1;
        setUpvoted(false);
        setDownvoted(true);
      }
    } else {
      // Añadir o quitar
      const delta = isRemoving ? -1 : 1;

      if (voteType === "upvote") {
        optimisticUp += delta;
        setUpvoted(!isUpvoted);
        if (!isRemoving) setDownvoted(false);
      } else if (voteType === "downvote") {
        optimisticDown += delta;
        setDownvoted(!isDownvoted);
        if (!isRemoving) setUpvoted(false);
      }
    }
    setUpvotes(optimisticUp);
    setDownvotes(optimisticDown);

    // 2) Sincronizar con el servidor -------------------
    try {
      if (isSwitching) {
        // Enviar dos peticiones: quitar anterior, añadir nueva
        const firstDelta = -1;
        const secondDelta = 1;

        // Quitar el voto anterior
        await voteComment(
          id,
          voteType === "upvote" ? "downvote" : "upvote",
          firstDelta
        );

        // Nuevo voto
        const updated = await voteComment(id, voteType, secondDelta);
        setUpvotes(updated.upvotes);
        setDownvotes(updated.downvotes);
        onVoteChange(id, voteType, updated.upvotes, updated.downvotes);
      } else {
        const delta = isRemoving ? -1 : 1;
        const updated = await voteComment(id, voteType, delta);
        setUpvotes(updated.upvotes);
        setDownvotes(updated.downvotes);

        onVoteChange(id, voteType, updated.upvotes, updated.downvotes);
      }
    } catch (error) {
      console.error(error);
      // Rollback visual si la petición falla
      setUpvotes(prevState.upvotes);
      setDownvotes(prevState.downvotes);
      setUpvoted(prevState.isUp);
      setDownvoted(prevState.isDown);
    }
  };

  useEffect(() => {
    setUpvotes(upvotes);
    setDownvotes(downvotes);
  }, [upvotes, downvotes]);

  return (
    <div className="flex flex-col w-full">
      {/* USER */}
      <div className="bg-teal-700 z-10 w-full rounded-xl px-2 p-1 flex items-center gap-2 justify-between">
        <ProfilePic
          profile_pic={forum_user.profile_pic}
          username={forum_user.username}
        />
        <span className="comment-text-special">{forum_user.username}</span>

        {/* TIME */}
        <span className="text-xs text-gray-200">
          · {timeAgo(created_at)}
          {updated_at !== created_at && ` · editado ${timeAgo(updated_at)}`}
        </span>

        {/* FULL DATE */}
        <span className="ml-auto text-sm md:text-base text-gray-100/50 font-semibold">
          {formatFullDate(updated_at)}
        </span>
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
