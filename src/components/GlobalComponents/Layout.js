import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  Home,
  People,
  BarChart,
  Settings,
  Group,
  AssignmentTurnedIn,
  Message,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { HelpOutline, Notifications, Search, BusinessCenter } from "@mui/icons-material";
import { useNavigate, Outlet } from "react-router-dom";
import authService from "../../services/AuthService";
import ProfileMenu from "./ProfileMenu";

const Layout = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [openSettingsSubmenu, setOpenSettingsSubmenu] = useState(false);
  const navigate = useNavigate();
  const user = authService.getUserFromToken();

  useEffect(() => {
    // Redirect to login if no user is logged in
    if (!authService.isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleProfileClick = () => {
    setProfileMenuOpen(true);
  };

  const toggleSettingsSubmenu = () => {
    setOpenSettingsSubmenu(!openSettingsSubmenu);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/dashboard" },
    { text: "Employees", icon: <People />, path: "/employees" },
    { text: "Attendance", icon: <AssignmentTurnedIn />, path: "/attendance" },
    { text: "Reports", icon: <BarChart />, path: "/reports" },
    {
      text: "Setup",
      icon: <Settings />,
      subMenu: [
        { text: "Departments", icon: <BusinessCenter />, path: "/departments" },
        { text: "Message Templates", icon: <Message />, path: "/notifications/templates" },
        { text: "Users", icon: <Group />, path: "/users" }
      ],
    },
  ];

  return (
      <Box sx={{ display: "flex" }}>
        {/* AppBar at the top */}
        <AppBar position="fixed" sx={{ zIndex: 1200 }}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Tooltip title="Help">
              <IconButton color="inherit">
                <HelpOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search">
              <IconButton color="inherit">
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton color="inherit" onClick={handleProfileClick}>
                <Avatar alt={user?.username} src={user?.profilePicture}>
                  {getInitial(user?.username)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* Drawer positioned below the AppBar */}
        <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", top: 64, zIndex: 1100 },
            }}
        >
          <Toolbar />
          <List>
            {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem button="true" onClick={() => item.subMenu ? toggleSettingsSubmenu() : handleMenuClick(item.path)}>
                    {item.icon}
                    <ListItemText primary={item.text} sx={{ ml: 2 }} />
                    {item.subMenu && (openSettingsSubmenu ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>
                  {item.subMenu && (
                      <Collapse in={openSettingsSubmenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem, subIndex) => (
                              <ListItem
                                  button="true"
                                  key={subIndex}
                                  sx={{ pl: 4 }}
                                  onClick={() => handleMenuClick(subItem.path)}
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

        {/* Main content area */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>

        {/* Profile Menu Overlay */}
        <ProfileMenu open={profileMenuOpen} onClose={() => setProfileMenuOpen(false)} user={user} />
      </Box>
  );
};

export default Layout;