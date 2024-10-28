import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Brightness4, Brightness7, Close, Logout, ExpandMore } from "@mui/icons-material";
import authService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ open, onClose, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDarkMode = theme.palette.mode === "dark";

  const handleLogout = () => {
    authService.logout();
    onClose();
    navigate("/login");
  };

  return (
      <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              position: "absolute",
              top: 0,
              right: 0,
              height: "100vh",
              width: 300,
              boxShadow: 3,
              zIndex: 1500, // Higher than AppBar
            },
          }}
      >
        {/* Header */}
        <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
        >
          <Typography variant="h6">Account Menu</Typography>
          <IconButton onClick={onClose} sx={{ color: "primary.contrastText" }}>
            <Close />
          </IconButton>
        </Box>

        <Box
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >
          <Avatar alt={user?.username} src={user?.profilePicture} sx={{ width: 80, height: 80, mb: 2 }}>
            {!user?.profilePicture && authService.getInitial(user?.username)}
          </Avatar>
          <Typography variant="h6">{user?.username}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email}</Typography>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* Profile Actions */}
          <Button fullWidth variant="text" sx={{ py: 1, color: "primary.main", textTransform: "none" }}>Manage Preferences</Button>
          <Button fullWidth variant="text" sx={{ py: 1, color: "primary.main", textTransform: "none" }}>View Profile</Button>
          <Button fullWidth variant="text" sx={{ py: 1, color: "primary.main", textTransform: "none" }}>Tutorial</Button>

          <Divider sx={{ my: 2, width: "100%" }} />

          {/* Theme Toggle */}
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
            <IconButton onClick={() => { /* Toggle Dark Mode */ }}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* Collapsible Sections */}
          <Accordion sx={{ width: "100%", boxShadow: "none" }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>My Calendar</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Your calendar details here.</Typography>
            </AccordionDetails>
          </Accordion>

          {/* Log Out Button at Bottom */}
          <Box sx={{ mt: "auto", width: "100%" }}>
            <Button
                variant="contained"
                fullWidth
                color="primary"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ mt: 2 }}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Drawer>
  );
};

export default ProfileMenu;