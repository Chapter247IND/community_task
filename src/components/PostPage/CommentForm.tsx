import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <TextField
      label="Add a comment"
      fullWidth
      variant="outlined"
      multiline
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={handleSubmit}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{backgroundColor:'theme.palette.common.white'}}
    />
  );
};

export default CommentForm;
