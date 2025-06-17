import React, { useRef } from "react";
import CommentList from "./CommentList";
import type { CommentListHandle } from "../../interfaces";
import { createRandomUsername } from "../../utils/helpers";
import { ProfilePic } from "../periferics/ProfilePic";
import { NewComment } from "../periferics/NewComment";
import type { CommentType } from "../../types";

export const Page: React.FC = () => {
  const listRef = useRef<CommentListHandle>(null);

  const handleCommentCreated = (newComment: CommentType) => {
    listRef.current?.addComment(newComment);
  };
  const temporalUsername = createRandomUsername(20);

  return (
    <div className="min-h-screen bg-cool-300 flex flex-col">
      {/* Header */}
      <header className="bg-cool-100 text-white shadow-lg border-b-2 border-gray-800">
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold">Foro de Comentarios</h1>
            <p className="text-gray-200">Espacio para compartir tus ideas</p>
          </div>

          {/* USERNAME */}
          <div className="col-span-1 flex space-x-2 justify-end items-center pr-2">
            <span className="text-xl font-bold">{temporalUsername}</span>
            <ProfilePic
              profile_pic={null}
              username={temporalUsername}
              size={8}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="flex flex-col h-full">
          {/* INGRESAR COMENTARIO */}
          <NewComment
            onCommentCreated={(newComment: CommentType) =>
              handleCommentCreated(newComment)
            }
          />

          {/* LISTA DE COMENTARIOS */}
          <div className="h-full overflow-y-auto flex-grow p-4 flex flex-col justify-between">
            <CommentList ref={listRef} />

            <button
              onClick={() => listRef.current?.loadMore()}
              className="special-button hover:bg-teal-400 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cargar más
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cool-100-offset text-sm text-gray-100 border-t-2 border-gray-800">
        <div className="flex flex-col container mx-auto px-4 py-4">
          <p className="text-center">&copy; 2025 Foro de Comentarios</p>
          <p className="text-center">Desarrollado por</p>
          <a
            href="https://github.com/coslatte"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-supercreditos"
          >
            Gabriel Paz Ruíz
          </a>
          <a
            href="https://github.com/pedromcd999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-supercreditos opacity-90"
          >
            Pedro Miguel
          </a>
        </div>
      </footer>
    </div>
  );
};
