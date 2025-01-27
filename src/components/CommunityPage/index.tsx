"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Button, Container } from "@mui/material";
import Grid from "@mui/system/Grid";
import Stack from "@mui/system/Stack";
import { PostType } from "@/types";
import { usePosts } from "@/hooks/usePosts";
import AddEditForm from "./AddEditDialogForm";
import BlogCard from "../Common/Blockcard/BlogCard";

const Community: React.FC = () => {
  const { posts, addPost, editPost, deletePost } = usePosts();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts);

  const router = useRouter();
  // Get the 'category' query param
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  // Filter posts based on query parameter
  useEffect(() => {
    if (topic) {
      const filtered = posts.filter((post) => post.topic === topic);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts); // Show all posts if no topic is selected
    }
  }, [topic, posts]);

  const handlePostClick = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleEditPost = (postId: number) => {
    setEditingPostId(postId);
    setOpenModal(true);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Typography variant="h4">{topic}</Typography>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Add Post
          </Button>
        </Stack>
        {/* Posts Section */}
        <Grid container size={12} spacing={3}>
          {filteredPosts.map((post: PostType) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BlogCard
                post={post}
                handlePostClick={handlePostClick}
                handleEditPost={handleEditPost}
                deletePost={deletePost}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* Add/Edit Dialog */}
      <AddEditForm
        open={openModal}
        onClose={() => {
          setEditingPostId(null);
          setOpenModal(false);
        }}
        postId={editingPostId}
        posts={posts}
        addPost={addPost}
        editPost={editPost}
      />
    </Container>
  );
};

export default Community;
