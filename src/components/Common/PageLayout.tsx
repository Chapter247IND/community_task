"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Grid2 as Grid,
} from "@mui/material";
import { SideBar, SideBarWrapper } from "./style";
import { CATEGORY_TOPICS } from "@/constants";
import Header from "../Header";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sideBarToogle, setSideBarToggle] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic");

  const postTopics = [...CATEGORY_TOPICS];

  const handleFilterList = (topic: string) => {
    if (topic === "All") {
      router.push("/");
      return;
    }
    router.push(`/?topic=${topic}`);
  };

  const handlSideBarToggle = () => {
    setSideBarToggle(!sideBarToogle);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: "grow", md: "grow" }}>
          <SideBarWrapper>
            <Header handlSideBarToggle={handlSideBarToggle} />
            <SideBar
              sx={{
                display: { xs: !sideBarToogle ? "none" : "flex", sm: "flex" },
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  padding: "0 20px",
                }}
              >
                Topics
              </Typography>
              <Divider />
              <List>
                {postTopics.map((topic, index) => (
                  <ListItem key={`${index}-${topic}`} dense>
                    <ListItemButton
                      onClick={() => handleFilterList(topic)}
                      selected={currentTopic === topic}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        },
                      }}
                    >
                      <ListItemText primary={topic} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </SideBar>
          </SideBarWrapper>
        </Grid>
        <Grid size={{ xs: 12, sm: 10, md: 10 }}>
          <Box
            sx={{
              width: "100%",
              paddingTop: "80px",
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageLayout;
