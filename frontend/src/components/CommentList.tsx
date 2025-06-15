import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import api from "../services/api";

export type CommentType = {
  id: number;
  username: string;
  profilePicture: string;
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
};

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<CommentType[]>("/comments")
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading comments");
        setLoading(false);
      });
  }, []);

  const handleVoteChange = (
    commentId: number,
    voteType: "upvote" | "downvote"
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              upvotes:
                voteType === "upvote" ? comment.upvotes + 1 : comment.upvotes,
              downvotes:
                voteType === "downvote"
                  ? comment.downvotes + 1
                  : comment.downvotes,
            }
          : comment
      )
    );
  };

  if (loading) return <div>Cargando comentarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-2">Sin comentarios aún.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              id={comment.id}
              key={comment.id}
              username={comment.username}
              profilePicture={comment.profilePicture}
              content={comment.content}
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
              created_at={comment.created_at}
              updated_at={comment.updated_at}
              onVoteChange={handleVoteChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
