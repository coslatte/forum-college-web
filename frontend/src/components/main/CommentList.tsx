import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Comment from "./Comment";
import api from "../../services/api";
import type { CommentType } from "../../types";
import type { CommentListHandle } from "../../interfaces";

const CommentList = forwardRef<CommentListHandle>((_props, ref) => {
  const PAGE_SIZE_INITIAL = 3;
  const PAGE_SIZE_MORE = 3;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const fetchComments = async (
    limit: number,
    newOffset: number,
    append: boolean
  ) => {
    try {
      const response = await api.get<CommentType[]>("/comments", {
        params: { limit, offset: newOffset },
      });
      setComments((prev) =>
        append ? [...prev, ...response.data] : response.data
      );
      setLoading(false);
    } catch (error) {
      setLoadingError(
        (error as Error).message ||
          (error as Error).message ||
          "Error loading comments"
      );
      setLoading(false);
    }
  };

  const addComment = (comment: CommentType) => {
    setComments((prev) => [comment, ...prev]);
  };

  const loadMoreComments = () => {
    fetchComments(PAGE_SIZE_MORE, offset, true);
    setOffset((prev) => prev + PAGE_SIZE_MORE);
  };

  useEffect(() => {
    fetchComments(PAGE_SIZE_INITIAL, 0, false);
    setOffset(PAGE_SIZE_INITIAL);
  }, []);

  useImperativeHandle(ref, () => ({ loadMore: loadMoreComments, addComment }));

  const handleCommentDelete = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleCommentUpdate = (commentId: number, newContent: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              content: newContent,
              updated_at: new Date().toISOString(),
            }
          : comment
      )
    );
  };

  const handleVoteChange = (
    commentId: number,
    _voteType: "upvote" | "downvote",
    updatedUpvotes: number,
    updatedDownvotes: number
  ) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              upvotes: updatedUpvotes,
              downvotes: updatedDownvotes,
            }
          : comment
      )
    );
  };

  if (loading) return <div>Cargando comentarios...</div>;
  if (loadingError) return <div>{loadingError}</div>;

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-2">Sin comentarios aún.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              forum_user={{
                id: comment.forum_user?.id || 0,
                username: comment.forum_user?.username || "Usuario desconocido",
                profile_pic: comment.forum_user?.profile_pic || null,
              }}
              content={comment.content}
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
              created_at={comment.created_at}
              updated_at={comment.updated_at}
              onVoteChange={handleVoteChange}
              onCommentDelete={handleCommentDelete}
              onCommentUpdate={handleCommentUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default CommentList;
