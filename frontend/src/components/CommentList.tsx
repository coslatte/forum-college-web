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
              key={comment.id}
              user={comment.user}
              content={comment.content}
              upvotes={20}
              downvotes={500}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
