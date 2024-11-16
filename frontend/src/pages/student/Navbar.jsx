import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle profile menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className="flex justify-between">
        {/* Left: Logo */}
        <Box className="flex items-center">
          <Typography
            variant="h6"
            className="font-bold text-black mr-4 cursor-pointer"
          >
            quizr
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600">
            SNS College - Groups
          </Typography>
        </Box>

        {/* Center: Search Icon */}
        <Box>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Right: Profile Menu */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{ bgcolor: "#064E3B" }}
              alt="Profile"
              className="cursor-pointer"
            >
              {/* Use the user's initials */}
              P
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <SettingsIcon fontSize="small" className="mr-2" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" className="mr-2" />
              <Typography color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
