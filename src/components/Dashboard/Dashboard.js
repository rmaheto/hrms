import React, { useState } from "react"; // Add useState to the import statement
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { Home, People, BarChart, Settings, Logout } from "@mui/icons-material";
import authService from "../../services/AuthService";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Decode the user information from the token
  const user = authService.getUserFromToken;

  const handleLogout = () => {
    authService.removeToken(); // Clear the token
    setIsLoggedOut(true); // Mark as logged out to trigger redirect
  };

  // If the user is logged out, redirect to the login page
  if (isLoggedOut) {
    window.location.href = "/";
  }

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const menuItems = [
    { text: "Home", icon: <Home /> },
    { text: "Employees", icon: <People /> },
    { text: "Reports", icon: <BarChart /> },
    { text: "Settings", icon: <Settings /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Box display="flex" alignItems="center">
            <Avatar
              alt={getInitials(user.username)}
              src={user.profilePicture}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              {" "}
              {/* Correctly pass `button` as a boolean */}
              {item.icon}
              <ListItemText primary={item.text} sx={{ ml: 2 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4">
          Welcome to HRMS Dashboard, {user?.username || "Guest"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
