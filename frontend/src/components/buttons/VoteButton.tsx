import {
  BiUpvote,
  BiSolidUpvote,
  BiSolidDownvote,
  BiDownvote,
} from "react-icons/bi";
import { MdCancel } from "react-icons/md";

type VoteButtonType = {
  voteType: "upvote" | "downvote";
  size: number;
  isVoted: boolean;
  onVote: () => void;
};

const VoteButton: React.FC<VoteButtonType> = ({
  voteType,
  size,
  isVoted,
  onVote,
}) => {
  const handleVote = () => {
    onVote();
  };

  return (
    <div className="flex items-center justify-start space-x-4">
      <button
        className="transition-colors ease-in-out duration-100 hover:bg-teal-200 rounded-lg"
        onClick={handleVote}
      >
        {voteType === "upvote" ? (
          <>
            {isVoted ? <BiSolidUpvote size={size} /> : <BiUpvote size={size} />}
          </>
        ) : voteType === "downvote" ? (
          <>
            {isVoted ? (
              <BiSolidDownvote size={size} />
            ) : (
              <BiDownvote size={size} />
            )}
          </>
        ) : (
          <>
            <div className="bg-red-500 rounded-lg">
              <MdCancel size={size} />
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default VoteButton;
