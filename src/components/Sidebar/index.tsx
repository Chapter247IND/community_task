"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


const Sidebar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
      <Toolbar>
        <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
          Chapter247
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Sidebar;
