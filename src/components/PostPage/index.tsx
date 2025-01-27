"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Typography, Button, Box, CardMedia, Divider } from "@mui/material";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComment } from "@/hooks/useComment";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Styles from "@/components/PostPage/postPage.module.scss";

const PostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = useParams();
  const { post, addComment, deleteComment } = useComment(Number(postId));

  return (
    <Box sx={{marginBottom: "20px"}}>
      {post ? (
        <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
          <Box>
            <Button variant="text" onClick={() => router.back()}>
              <KeyboardBackspaceIcon /> Back to list
            </Button>
            <Typography variant="h4" className= {Styles.post_title}>
              {post.title}
            </Typography>
          </Box>
          <Box sx={{ padding: "20px 0" }}>
            <Divider />
          </Box>
          <div className={Styles.featured_image}>
            <CardMedia
              component="img"
              image={post?.featuredImage}
              alt={post.title}
            />
          </div>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {post.content}
          </Typography>

          <CommentList
            comments={post.comments || []}
            onReply={addComment}
            onDelete={deleteComment}
          />
          <CommentForm onSubmit={(text) => addComment(text, null)} />
        </Box>
      ) : (
        <Typography variant="h6">Post not found</Typography>
      )}
    </Box>
  );
};

export default PostPage;
