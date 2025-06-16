import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Manages the increase or decrease of the votes given the Comment ID
 * @param commentId Identification of the comment
 * @param voteType could be "upvote" or "downvote"
 * @param delta exchange: if the vote increments or decrements
 * @returns data
 */
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

/**
 * Create a comment
 * @param data Bundle of information with the userId and the content
 * @returns data
 */
export const createComment = async (data: {
  forum_users_id: number;
  content: string;
}) => {
  const response = await api.post("/comments", data);
  return response.data;
};

/**
 * Obtain a comment given an ID
 * @param commentId Identification of the comment
 * @returns get data
 */
export const getCommentVotes = async (commentId: number) => {
  const response = await api.get(`/comments/${commentId}/votes`);
  return response.data;
};

export default api;
