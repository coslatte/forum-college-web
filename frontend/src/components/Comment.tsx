import React, { useState } from "react";
import VoteButton from "./buttons/VoteButton";

type CommentType = {
  user: string;
  content: string;
  upvotes: number;
  downvotes: number;
};

const Comment: React.FC<CommentType> = ({
  user = "User",
  content = "Content",
  upvotes = 20,
  downvotes = 500,
}) => {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    setVoted(!voted);
  };

  // TODO: AGREGAR LO DE STATE ENTRE COMPONENTES, el hook

  return (
    <>
      <div className="flex flex-col w-full">
        {/* USER */}
        <div className="comment-bg-200 z-10 w-full rounded-xl px-2 p-1">
          <span className="comment-text-special">{user}</span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center items-start comment-bg-300 -mt-3 w-full rounded-b-xl px-2 h-full pt-4 p-4 space-y-1">
          <span className="flex-shrink comment-text">{content}</span>

          {/* VOTES */}
          <div className="flex space-x-4 justify-center items-center">
            <div className="flex space-x-1">
              <VoteButton voteType="upvote" size={20} />
              <span>{upvotes}</span>
            </div>
            <div className="flex space-x-1">
              <VoteButton voteType="downvote" size={20} />
              <span>{downvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
