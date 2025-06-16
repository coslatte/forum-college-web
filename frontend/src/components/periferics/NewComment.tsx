import { useRef, useState } from "react";
import { createComment } from "../../services/api";
import type { CommentType } from "../../types";
import type { CommentListHandle } from "../../interfaces";

export const NewComment: React.FC = () => {
  const [newComment, setNewComment] = useState<string>("");
  const listRef = useRef<CommentListHandle>(null);

  return (
    <>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-2 rounded-lg mr-2 border"
          placeholder="Escribe tu comentario..."
        />
        <button
          disabled={!newComment.trim()}
          onClick={async () => {
            if (!newComment.trim()) return;

            try {
              const created = await createComment({
                forum_users_id: 1,
                content: newComment.trim(),
              });
              listRef.current?.addComment(created as CommentType);
              setNewComment("");
            } catch (err) {
              console.error(err);
            }
          }}
          className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
        >
          Comentar
        </button>
      </div>
    </>
  );
};
