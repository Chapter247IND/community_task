import { CommentType } from "../types";

export const addCommentRecursively = (
  comments: CommentType[],
  text: string,
  parentId: number
): CommentType[] =>
  comments.map((comment) =>
    comment.id === parentId
      ? {
          ...comment,
          replies: [
            ...(comment.replies || []),
            { id: Date.now(), text, replies: [] },
          ],
        }
      : {
          ...comment,
          replies: addCommentRecursively(comment.replies || [], text, parentId),
        }
  );

export const deleteCommentRecursively = (
  comments: CommentType[],
  commentId: number
): CommentType[] =>
  comments
    .filter((comment) => comment.id !== commentId)
    .map((comment) => ({
      ...comment,
      replies: deleteCommentRecursively(comment.replies || [], commentId),
    }));
