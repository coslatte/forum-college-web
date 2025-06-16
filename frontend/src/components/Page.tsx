import React, { useRef, useState } from "react";
import CommentList from "./CommentList";
import { createComment } from "../services/api";
import type { CommentListHandle } from "../interfaces";
import type { CommentType } from "../types";

export const Page: React.FC = () => {
  const [newComment, setNewComment] = useState("");
  const listRef = useRef<CommentListHandle>(null);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-cool-100 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">Foro de Comentarios</h1>
          <p className="text-gray-200">Espacio para compartir tus ideas</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="flex flex-col h-full bg-cool-300">
          {/* LISTA DE COMENTARIOS */}
          <div className="h-128 overflow-y-auto shadow-md flex-grow p-4 flex flex-col justify-between">
            <CommentList ref={listRef} />
            <button
              onClick={() => listRef.current?.loadMore()}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cargar más
            </button>
          </div>

          {/* NUEVO COMENTARIO */}
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
                  // TODO: error handling UI
                  console.error(err);
                }
              }}
              className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
            >
              Comentar
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cool-200 text-gray-100">
        <div className="flex flex-col container mx-auto px-4 py-4">
          <p className="text-center">&copy; 2025 Foro de Comentarios</p>
          <p className="text-center">Desarrollado por</p>
          <a
            href="https://github.com/coslatte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
          >
            Gabriel Paz Ruíz
          </a>
          <a
            href="https://github.com/pedromcd999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
          >
            Pedro Miguel
          </a>
        </div>
      </footer>
    </div>
  );
};
