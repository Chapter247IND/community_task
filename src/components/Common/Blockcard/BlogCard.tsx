import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { BlogCardType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import placeHolder from "@/app/no-preview.jpeg";
import Styles from "@/components/Common/Blockcard/card.module.scss";
import { Theme } from "@mui/material/styles";

const BlogCard: React.FC<BlogCardType> = ({
  post,
  handlePostClick,
  handleEditPost,
  deletePost,
}) => {
  return (
    <Card
      onClick={() => handlePostClick(post?.id)}
      className={Styles.blog_card}
    >
      <CardMedia
        component="img"
        height="194"
        image={(post?.featuredImage || placeHolder.src) as string}
        alt={post.title}
      />
      <CardContent>
        <Box className={Styles.topic_box}>
          <Typography variant="body2" color="white">
            {post?.topic}
          </Typography>
        </Box>
        <Box sx={{ minHeight: "60px", marginBottom: "10px" }}>
          <Typography className={Styles.post_title} variant="h6">
            {post?.title}
          </Typography>
        </Box>
        <Box sx={{ minHeight: "60px" }}>
          <Typography variant="body2" color="text.secondary">
            {post?.content.length > 90
              ? post.content.substring(0, 95) + "..."
              : post.content}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "center" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          useFlexGap={false}
          sx={{ width: "100%" }}
        >
          <Box>
            {(post?.comments?.length ?? 0) > 0 ? (
              <ListItem sx={{ padding: "0" }} className={Styles.user_icon}>
                {[...Array(3)].map((_, index) => (
                  <ListItemAvatar key={index}>
                    <Avatar className={Styles.comment_icon}>
                      <PersonIcon sx={{ width: "15px", height: "15px" }} />
                    </Avatar>
                  </ListItemAvatar>
                ))}
              </ListItem>
            ) : (
              <Typography variant="body2" color="textDisabled">
                No comments
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEditPost(post?.id);
              }}
              sx={(theme: Theme) => ({
                backgroundColor: theme.palette.primary.dark,
              })}
              className={Styles.action_icon}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              sx={(theme: Theme) => ({
                backgroundColor: theme.palette.error.dark,
              })}
              className={Styles.action_icon}
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post?.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
