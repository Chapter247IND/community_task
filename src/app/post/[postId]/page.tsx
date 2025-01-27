import React from "react";
import dynamic from "next/dynamic";
const Post = dynamic(() => import("../../../components/PostPage"), {
  loading: () => <p>Loading...</p>,
});

const CommunityPage: React.FC = () => {
  return <Post />;
};

export default CommunityPage;
