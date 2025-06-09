import React from "react";

type CommentType = {
  user: string;
  content: string;
};

const Comment: React.FC<CommentType> = ({
  user = "User",
  content = "Content",
}) => {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* USER */}
        <div className="comment-bg-200 z-10 w-full rounded-xl px-2 p-1">
          <span className="comment-text-special">{user}</span>
        </div>

        {/* CONTENT */}
        <div className="comment-bg-300 -mt-3 w-full rounded-b-xl px-2 h-full pt-2 p-1">
          <span className="comment-text">{content}</span>
        </div>
      </div>
    </>
  );
};

export default Comment;
