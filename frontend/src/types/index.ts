export type CommentType = {
  id: number;
  forum_user: {
    id: number;
    username: string;
    profile_pic: string | null;
  };
  content: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
};
