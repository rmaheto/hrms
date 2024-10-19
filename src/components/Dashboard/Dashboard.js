import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
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

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decoding token to get user info

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const menuItems = [
    { text: "Home", icon: <Home /> }, // Notice that icon is a component here
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
            {user?.profilePicture ? (
              <Avatar alt="Profile" src={user.profilePicture} />
            ) : (
              <Avatar>{getInitials(user?.username)}</Avatar>
            )}
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
              {item.icon} {/* Render the icon directly */}
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
          Welcome to HRMS Dashboard, {user?.username}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
