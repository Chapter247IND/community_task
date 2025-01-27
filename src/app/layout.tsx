import React, { Suspense } from "react";
import type { Metadata } from "next";
import "@/styles/globals.scss";

import PageLayout from "@/components/Common/PageLayout";

export const metadata: Metadata = {
  title: "Community Page",
  description:
    "Join the community to connect, share, and grow with like-minded individuals. Explore discussions, share insights, and collaborate with others.",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <PageLayout>{children}</PageLayout>
        </Suspense>
      </body>
    </html>
  );
};

export default Layout;
