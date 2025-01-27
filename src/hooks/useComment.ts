import { useState, useEffect } from "react";
import { PostType } from "../types";
import { addCommentRecursively, deleteCommentRecursively } from "../utils";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localservices";

export const useComment = (postId: number) => {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const posts = getFromLocalStorage<PostType[]>("posts") ?? [];
    const selectedPost = posts.find((p: PostType) => p.id === Number(postId));
    setPost(selectedPost || null);
  }, [postId]);

  const updatePost = (updatedPost: PostType) => {
    const posts = getFromLocalStorage<PostType[]>("posts") ?? [];
    const updatedPosts = posts.map((p: PostType) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    setToLocalStorage("posts", updatedPosts);
    setPost(updatedPost);
  };

  const addComment = (text: string, parentId: number | null) => {
    if (!post) return;
    const updatedPost = {
      ...post,
      comments: parentId
        ? addCommentRecursively(post?.comments || [], text, parentId)
        : [...(post.comments || []), { id: Date.now(), text, replies: [] }],
    };
    updatePost(updatedPost);
  };

  const deleteComment = (commentId: number) => {
    if (!post) return;
    const updatedPost = {
      ...post,
      comments: deleteCommentRecursively(post?.comments || [], commentId),
    };
    updatePost(updatedPost);
  };

  return { post, addComment, deleteComment };
};
