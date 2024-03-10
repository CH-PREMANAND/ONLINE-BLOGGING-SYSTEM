import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, HomeOutlined, UserOutlined, LogoutOutlined, InfoOutlined, PhoneOutlined, RssFeedOutlined, UploadOutlined } from '@mui/icons-material'; // Importing specific icons from MUI
import axios from 'axios';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Clear session-related data
      document.cookie = 'sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/home">
            <HomeOutlined />
            Home
          </MenuItem>
          <MenuItem component={Link} to="/blog">
            <InfoOutlined />
            Blog
          </MenuItem>
          <MenuItem component={Link} to="/feed">
            <RssFeedOutlined />
            Feed
          </MenuItem>
          <MenuItem component={Link} to="/about">
            <InfoOutlined />
            About Us
          </MenuItem>
          <MenuItem component={Link} to="/contact">
            <PhoneOutlined />
            Contact
          </MenuItem>
        </Menu>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          BlogPedia
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
