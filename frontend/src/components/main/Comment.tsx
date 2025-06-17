import React, { useState, useEffect, useRef } from "react";
import { voteComment, deleteComment, updateComment } from "../../services/api";
import VoteButton from "../periferics/VoteButton";
import { formatFullDate, timeAgo } from "../../utils/date";
import { ProfilePic } from "../periferics/ProfilePic";
import { PiDotsThreeCircle } from "react-icons/pi";

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
  onCommentDelete: (commentId: number) => void;
  onCommentUpdate: (commentId: number, newContent: string) => void;
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
  onCommentDelete,
  onCommentUpdate,
}) => {
  const [upvotesState, setUpvotes] = useState<number>(upvotes);
  const [downvotesState, setDownvotes] = useState<number>(downvotes);
  const [isUpvoted, setUpvoted] = useState(false);
  const [isDownvoted, setDownvoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    try {
      await deleteComment(id);
      onCommentDelete(id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
    setIsOptionsOpen(false);
  };

  const handleUpdate = async () => {
    if (editedContent.trim() === "" || editedContent === content) {
      setIsEditing(false);
      return;
    }
    try {
      await updateComment(id, editedContent);
      onCommentUpdate(id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
    setIsOptionsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
        setIsDeleting(false);
      }
    };

    if (isOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionsOpen]);

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
      <div className="comment-bg-100 z-10 w-full rounded-xl px-2 p-1 flex items-center gap-2 justify-between">
        <ProfilePic
          profile_pic={forum_user.profile_pic}
          username={forum_user.username}
        />
        <span className="comment-text-special">{forum_user.username}</span>

        {/* TIME */}
        <span className="text-xs text-gray-200 text-shadow-lg">
          · {timeAgo(created_at)}
          {updated_at !== created_at && ` · editado ${timeAgo(updated_at)}`}
        </span>

        {/* FULL DATE */}
        <span className="ml-auto text-sm md:text-base text-shadow-lg text-gray-100/75 font-semibold">
          {formatFullDate(updated_at)}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex justify-between bg-teal-50 -mt-3 w-full rounded-b-xl px-2 h-full pt-4 p-4 space-x-4">
        <div className="flex flex-col w-full">
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 text-black"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 special-button text-white rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(content);
                  }}
                  className="px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <span className="flex-shrink comment-text">{content}</span>
          )}

          {/* VOTES */}
          <div className="flex space-x-4 justify-start items-center">
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

        {/* OPCIONES ACTUALIZAR/ELIMINAR */}
        <div
          ref={optionsMenuRef}
          className="relative flex justify-end items-center p-2"
          onMouseLeave={() => setIsDeleting(false)} // Reset on mouse leave
        >
          <PiDotsThreeCircle
            className="cursor-pointer rounded-full hover:bg-gray-300"
            size={30}
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          />

          {/* MENU OPCIONES */}
          {isOptionsOpen && (
            <div className="absolute right-10 mr-2 w-32 p-2 rounded-2xl shadow-lg bg-white/10 backdrop-blur-sm z-20">
              <div
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block w-full rounded-lg text-left px-4 py-2 font-semibold text-sm text-gray-800 opacity-80 hover:opacity-100 hover:bg-gray-100/50"
                  role="menuitem"
                  onClick={() => {
                    setIsEditing(true);
                    setIsOptionsOpen(false);
                  }}
                >
                  Actualizar
                </button>
                <div className="border-t border-gray-400/50 my-1 mx-2"></div>
                <button
                  className={`block w-full rounded-lg text-left px-4 py-2 font-semibold text-sm ${
                    isDeleting ? "text-white bg-red-500" : "text-red-700"
                  } opacity-80 hover:opacity-100 hover:bg-red-600/50`}
                  role="menuitem"
                  onClick={handleDelete}
                >
                  {isDeleting ? "Seguro?" : "Eliminar"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Comment);
