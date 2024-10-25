import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import {
  Home,
  People,
  BarChart,
  Settings,
  Logout,
  Group,
  AssignmentTurnedIn,
  Notifications,
  Message,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const Layout = () => {
  const [openNotifications, setOpenNotifications] = useState(false);

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Employees", icon: <People />, path: "/employees" },
    { text: "Attendance", icon: <AssignmentTurnedIn />, path: "/attendance" },
    { text: "Reports", icon: <BarChart />, path: "/reports" },
    { text: "Users", icon: <Group />, path: "/users" },
    {
      text: "Notifications",
      icon: <Notifications />,
      subMenu: [
        { text: "Message Templates", icon: <Message />, path: "/notifications/templates" },
      ],
    },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleLogout = () => {
    // Handle logout
  };

  const handleNotificationsClick = () => {
    setOpenNotifications(!openNotifications);
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
                <React.Fragment key={index}>
                  <ListItem button component="a" href={item.path} onClick={item.subMenu ? handleNotificationsClick : null}>
                    {item.icon}
                    <ListItemText primary={item.text} sx={{ ml: 2 }} />
                    {item.subMenu && (openNotifications ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>

                  {/* If there is a submenu, render it conditionally */}
                  {item.subMenu && (
                      <Collapse in={openNotifications} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem, subIndex) => (
                              <ListItem
                                  key={subIndex}
                                  button
                                  component="a"
                                  href={subItem.path}
                                  sx={{ pl: 4 }}
                              >
                                {subItem.icon}
                                <ListItemText primary={subItem.text} sx={{ ml: 2 }} />
                              </ListItem>
                          ))}
                        </List>
                      </Collapse>
                  )}
                </React.Fragment>
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