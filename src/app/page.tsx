import React from "react";
import dynamic from "next/dynamic";

const Community = dynamic(() => import("../components/CommunityPage"), {
  loading: () => <p>Loading...</p>,
});

const CommunityPage = () => {
  return <Community />;
};

export default CommunityPage;
