export type CommentType = {
  id: number;
  text: string;
  replies?: { id: number; text: string }[];
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  featuredImage: string;
  topic: string;
  comments?: CommentType[];
};

export type BlogCardType = {
  post:PostType;
  handlePostClick:(id: number) => void;
  handleEditPost:(id: number) => void;
  deletePost:(id: number) => void;
}

export type FileUploadType ={
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  caption: string
}