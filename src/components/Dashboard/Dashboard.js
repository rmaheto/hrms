import React, { useState } from "react";
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
import {
  Home,
  People,
  BarChart,
  Settings,
  Logout,
  Group,
  AssignmentTurnedIn,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/AuthService";

const Dashboard = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const user = authService.getUserFromToken();

  const handleLogout = () => {
    authService.removeToken();
    setIsLoggedOut(true);
  };

  if (isLoggedOut) {
    window.location.href = "/";
  }

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Employees", icon: <People />, path: "/employees" },
    { text: "Attendance", icon: <AssignmentTurnedIn />, path: "/attendance" },
    { text: "Reports", icon: <BarChart />, path: "/reports" },
    { text: "Users", icon: <Group />, path: "/users" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Box display="flex" alignItems="center">
            <Avatar
              alt={getInitials(user?.username)}
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
            <ListItem
              button // Explicitly passing `button` as a boolean prop
              component={Link}
              to={item.path}
              key={index}
              onClick={() => handleMenuClick(item.path)}
            >
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
