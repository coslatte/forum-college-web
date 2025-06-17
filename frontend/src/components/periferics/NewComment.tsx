import { useState } from "react";
import { createComment } from "../../services/api";
import type { CommentType } from "../../types";

interface NewCommentProps {
  onCommentCreated: (newComment: CommentType) => void;
}

export const NewComment: React.FC<NewCommentProps> = ({ onCommentCreated }) => {
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateComment = async () => {
    if (!newCommentContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newComment = await createComment({
        // TODO: El ID de usuario está hardcodeado. Reemplazarlo con un sistema de autenticación <<< FUTUROOOO
        // para obtener el ID del usuario que ha iniciado sesión.
        forum_users_id: 1,
        content: newCommentContent.trim(),
      });
      onCommentCreated(newComment); // Notify parent component
      setNewCommentContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-4">
        {/* ESCRIBIR COMENTARIO */}
        <input
          className="flex-grow p-2 rounded-lg mr-2 border border-teal-500 bg-teal-50"
          type="text"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleCreateComment();
            }
          }}
          placeholder="Escribe tu comentario..."
        />

        {/* ENVIAR COMENTARIO */}
        <button
          disabled={!newCommentContent.trim() || isSubmitting}
          onClick={handleCreateComment}
          className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded border border-teal-500"
        >
          Comentar
        </button>
      </div>
    </>
  );
};
