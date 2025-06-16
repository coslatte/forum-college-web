import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const voteComment = async (
  commentId: number,
  voteType: "upvote" | "downvote",
  delta: -1 | 1
) => {
  const response = await api.post(`/comments/${commentId}/vote`, {
    voteType,
    delta,
  });
  return response.data;
};

export const createComment = async (data: {
  forum_users_id: number;
  content: string;
}) => {
  const response = await api.post("/comments", data);
  return response.data;
};

export const getCommentVotes = async (commentId: number) => {
  const response = await api.get(`/comments/${commentId}/votes`);
  return response.data;
};

export default api;
