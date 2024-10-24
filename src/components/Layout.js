import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
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

const Layout = () => {
  const menuItems = [
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Employees", icon: <People />, path: "/employees" },
    { text: "Attendance", icon: <AssignmentTurnedIn />, path: "/attendance" },
    { text: "Reports", icon: <BarChart />, path: "/reports" },
    { text: "Users", icon: <Group />, path: "/users" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Avatar alt="Profile Picture" src="/path/to/profile.jpg" />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
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
            <ListItem button key={index} component="a" href={item.path}>
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
