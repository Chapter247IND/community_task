import React, { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { CommentType } from "@/types";
import CommentList from "./CommentList";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import Styles from "@/components/PostPage/postPage.module.scss";

interface CommentProps {
  comment: CommentType;
  onReply: (text: string, parentId: number) => void;
  onDelete: (commentId: number) => void;
}

// Separate components for better organization
const CommentHeader: React.FC<{
  commentId: number;
  onDelete: (id: number) => void;
}> = ({ commentId, onDelete }) => (
  <Stack direction="row">
    <Typography
      variant="body2"
      color="textSecondary"
      gutterBottom
      sx={{ fontWeight: "bold" }}
    >
      John Make
    </Typography>
    <Box sx={{ position: "relative", top: "-3px", marginLeft: "10px" }}>
      <DeleteIcon
        color="action"
        sx={{ width: "15px", cursor: "pointer" }}
        onClick={() => onDelete(commentId)}
      />
    </Box>
  </Stack>
);

const ReplyButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    onClick={onClick}
    endIcon={<SendIcon sx={{ width: "12px", height: "12px" }} />}
    size="small"
    sx={{
      padding: "2px 5px",
      textTransform: "capitalize",
      fontSize: "12px",
    }}
  >
    Reply
  </Button>
);

const ReplyForm: React.FC<{
  replyText: string;
  setReplyText: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}> = ({ replyText, setReplyText, onSubmit, onClose }) => (
  <Stack
    direction="row"
    spacing={3}
    sx={{ paddingLeft: "40px", paddingTop: "15px", alignItems: "center" }}
  >
    <TextField
      label="Reply"
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={onSubmit}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{ backgroundColor: "#fff" }}
    />
    <IconButton onClick={onClose}>
      <ClearIcon sx={{ color: "red" }} />
    </IconButton>
  </Stack>
);

const Comment: React.FC<CommentProps> = ({ comment, onReply, onDelete }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);

  const handleReplySubmit = () => {
    const trimmedReply = replyText.trim();
    if (trimmedReply) {
      onReply(trimmedReply, comment.id);
      setReplyText("");
      setShowReplyBox(false);
      setIsRepliesVisible(true);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div
      className={`${Styles.comment_block} ${!hasReplies ? Styles.remove_line : ""}`}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack direction="row" sx={{ alignItems: "start" }}>
          <Avatar className={Styles.comment_icon}>
            <PersonIcon sx={{ width: "15px", height: "15px" }} />
          </Avatar>
          <Box>
            <CommentHeader commentId={comment.id} onDelete={onDelete} />
            <Typography variant="body2">{comment.text}</Typography>
          </Box>
        </Stack>
      </Stack>

      {!showReplyBox && (
        <Box sx={{ paddingLeft: "40px", paddingTop: "15px" }}>
          <ReplyButton onClick={() => setShowReplyBox(true)} />
        </Box>
      )}

      {showReplyBox && (
        <ReplyForm
          replyText={replyText}
          setReplyText={setReplyText}
          onSubmit={handleReplySubmit}
          onClose={() => setShowReplyBox(false)}
        />
      )}

      {hasReplies && (
        <>
          <Box
            component="span"
            onClick={() => setIsRepliesVisible(!isRepliesVisible)}
            className={Styles.comment_view_btn}
          >
            {isRepliesVisible ? (
              <RemoveCircleOutlineIcon sx={{ fill: "#bdbdbd" }} />
            ) : (
              <AddCircleOutlineIcon sx={{ fill: "#bdbdbd" }} />
            )}
          </Box>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                height: isRepliesVisible ? "100%" : "0px",
                overflow: "hidden",
              }}
            >
              <CommentList
                comments={comment.replies ?? []}
                onReply={onReply}
                onDelete={onDelete}
              />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Comment;
