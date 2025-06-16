import type { CommentType } from "../types";

export interface CommentListHandle {
  loadMore: () => void;
  addComment: (comment: CommentType) => void;
}
