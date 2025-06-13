import { useState } from "react";
import {
  BiUpvote,
  BiSolidUpvote,
  BiSolidDownvote,
  BiDownvote,
} from "react-icons/bi";

type voteType = {
  voteType: "upvote" | "downvote";
  size: number;
};

const VoteButton: React.FC<voteType> = ({ voteType, size }) => {
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    setVoted(!voted);
  };

  return (
    <div className="flex items-center justify-start space-x-4">
      {voteType === "upvote" ? (
        // UPVOTE
        voted ? (
          <button onClick={handleVote}>
            <BiUpvote size={size} />
          </button>
        ) : (
          <button onClick={handleVote}>
            <BiSolidUpvote size={size} />
          </button>
        )
      ) : voteType === "downvote" ? (
        // DOWNVOTE
        voted ? (
          <button onClick={handleVote}>
            <BiDownvote size={size} />
          </button>
        ) : (
          <button onClick={handleVote}>
            <BiSolidDownvote size={size} />
          </button>
        )
      ) : (
        <>
          <div className="size-20 bg-red-500 rounded-full"></div>
        </>
      )}
    </div>
  );
};

export default VoteButton;
