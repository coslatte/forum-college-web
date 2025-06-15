export type CommentType = {
  id: number;
  user: string | null;
  profilePicture: string | null;
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
};
