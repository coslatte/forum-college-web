import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import api from "../api/api";

export type CommentType = {
  id: number;
  user: string;
  content: string;
  created_at?: string;
  updated_at?: string;
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

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            user={comment.user}
            content={comment.content}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
