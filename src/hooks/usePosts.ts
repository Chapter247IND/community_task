import { useState, useEffect } from "react";
import { PostType } from "@/types";
import { posts as defaultPosts } from "@/data/posts";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localservices";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const storedPosts = getFromLocalStorage<PostType[]>("posts") ?? [];
    if (storedPosts.length > 0) {
      setPosts(storedPosts);
    } else {
      setPosts(defaultPosts);
      setToLocalStorage("posts", defaultPosts);
    }
  }, []);

  const addPost = (newPost: PostType) => {
    const newPostWithId = { ...newPost, id: posts.length + 1, comments: [] };
    const updatedPosts = [newPostWithId, ...posts]; // New post added at the beginning
    setPosts(updatedPosts);
    setToLocalStorage("posts", updatedPosts);
  };

  const editPost = (postId: number, updatedPost: Partial<PostType>) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
    setToLocalStorage("posts", updatedPosts);
  };

  const deletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setToLocalStorage("posts", updatedPosts);
  };

  const updatePostThroughFilter = (category: string) => {
    if (category === "") setPosts(defaultPosts);
    const updatedPosts = posts.filter((post) => post.topic === category);
    setPosts(updatedPosts);
  };

  return { posts, addPost, editPost, deletePost, updatePostThroughFilter };
};
