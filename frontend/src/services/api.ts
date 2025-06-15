import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const voteComment = async (
  commentId: number,
  voteType: "upvote" | "downvote"
) => {
  await api.post(`/comments/${commentId}/vote`, { voteType });
};

export const getCommentVotes = async (commentId: number) => {
  const response = await api.get(`/comments/${commentId}/votes`);
  return response.data;
};

export default api;
