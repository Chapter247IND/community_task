"use client";

import React from "react";
import Image from 'next/image';
import Link from 'next/link'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import logo from '../../app/chapter-logo.png';
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  handlSideBarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  handlSideBarToggle, 
  }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none"
      }}>
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          edge="start"
          onClick={handlSideBarToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/" style={{ textDecoration: 'none' }}>
        <Stack direction='row' spacing={2}>
          <Image
            src={logo}
            alt="Company Logo"
            width={95} 
          />
          <Typography variant="h6" color="black" sx={{ flexGrow: 1 }}>
            Community
          </Typography>
        </Stack>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
