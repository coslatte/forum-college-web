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
      <div className="flex space-y-0.5 flex-col w-svw p-2 rounded-lg comment-bg-100">
        {/* USER */}
        <div className="comment-bg-200 border-2 border-r-orange-950 rounded-lg p-1">
          <span className="ml-2 comment-text-special">{user}</span>
        </div>

        {/* CONTENT */}
        <div className="comment-bg-300 rounded-lg p-1">
          <span className="ml-2 comment-text">{content}</span>
        </div>
      </div>
    </>
  );
};

export default Comment;
