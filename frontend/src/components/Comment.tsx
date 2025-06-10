import React from "react";
import { CiHeart } from "react-icons/ci";

type CommentType = {
  user: string;
  content: string;
  likes: number;
};

const Comment: React.FC<CommentType> = ({
  user = "User",
  content = "Content",
  likes = 0,
}) => {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* USER */}
        <div className="comment-bg-200 z-10 w-full rounded-xl px-2 p-1">
          <span className="comment-text-special">{user}</span>
        </div>

        {/* CONTENT */}
        <div className="flex space-x-1 comment-bg-300 -mt-3 w-full rounded-b-xl px-2 h-full pt-2 p-1">
          <span className="flex-shrink comment-text">{content}</span>
	  <div className="flex-none space-x-1 justify-content items-center">
	    <CiHeart/>
	    <p className="font-light text-gray-100">{likes}</p>
	  </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
