import React from "react";
import { List, ListItem } from "@mui/material";
import Comment from "./Comment";
import { CommentType } from "@/types";

interface CommentListProps {
  comments: CommentType[];
  onReply: (text: string, parentId: number) => void;
  onDelete: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  onDelete,
}) => {
  return (
    <List>
      {comments.map((comment) => (
        <ListItem 
          key={comment.id} 
          sx={{
            width: '100%', 
            display:'block', 
            paddingRight:'0'
          }}>
          <Comment
            comment={comment}
            onReply={onReply}
            onDelete={onDelete}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
