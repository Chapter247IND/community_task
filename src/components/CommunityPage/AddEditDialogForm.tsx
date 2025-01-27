import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PostType } from "@/types";
import CommonDialog from "@/components/Common/Dialog";
import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploader from "../Common/FileUploader";
import { CATEGORY_TOPICS } from "@/constants";

interface AddEditFormProps {
  open: boolean;
  onClose: () => void;
  postId?: number | null;
  posts: PostType[];
  addPost: (newPost: PostType) => void;
  editPost: (postId: number, updatedPost: Partial<PostType>) => void;
}

const AddEditForm: React.FC<AddEditFormProps> = ({
  open,
  onClose,
  postId,
  posts,
  addPost,
  editPost,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    featuredImage: "",
    topic: "",
  });

  const [errors, setErrors] = useState({
    topic: false,
    title: false,
    content: false,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const post = postId !== null ? posts.find((p) => p.id === postId) : null;
    setFormData(
      post || { title: "", content: "", featuredImage: "", topic: "" }
    );
    setPreviewImage(post?.featuredImage || null);
  }, [postId, posts]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (value) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          featuredImage: reader.result as string,
        }));
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      setFormData((prev) => ({ ...prev, featuredImage: "" }));
    }
  };

  const handleSave = () => {
    const newErrors = {
      topic: !formData.topic,
      title: !formData.title,
      content: !formData.content,
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return; // Stop submission if there are errors
    }

    if (postId !== null) {
      editPost(Number(postId), formData);
    } else {
      addPost(formData as PostType);
    }
    onClose();
  };

  const handleDialogClose = () => {
    onClose();
    setFormData({
      title: "",
      content: "",
      featuredImage: "",
      topic: "",
    });
    setErrors({
      topic: false,
      title: false,
      content: false,
    });
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      featuredImage: "",
    }));
  };

  return (
    <CommonDialog
      open={open}
      onClose={handleDialogClose}
      title={postId !== null ? "Edit Post" : "Add New Post"}
      onSubmit={handleSave}
      submitLabel={postId !== null ? "Save Changes" : "Add Post"}
    >
      <FormControl fullWidth>
        <InputLabel id="post-topic">Post Topic</InputLabel>
        <Select
          labelId="post-topic"
          id="post-topic"
          value={formData.topic}
          label="Post Topic"
          error={errors.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        >
          {CATEGORY_TOPICS.slice(1).map((item, index) => {
            return (
              <MenuItem key={`${index}-${item}`} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {errors.topic && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}

      <TextField
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        label="Post Title"
        fullWidth
        margin="normal"
        required
        error={errors.title}
      />
      {errors.title && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}

      <TextField
        value={formData.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
        label="Post Content"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        required
        error={errors.content}
      />
      {errors.content && (
        <FormHelperText error>This field is required.</FormHelperText>
      )}

      <Box className="featured-image-upload" sx={{ marginTop: "1rem" }}>
        {previewImage == null ? (
          <FileUploader
            handleImageChange={handleImageChange}
            caption="Upload Featured Image"
          />
        ) : (
          <Box
            sx={{
              position: "relative",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Image src={previewImage} alt="preview" width={437} height={200} />
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveImage}
              size="small"
            >
              Remove
            </Button>
          </Box>
        )}
      </Box>
    </CommonDialog>
  );
};

export default AddEditForm;
