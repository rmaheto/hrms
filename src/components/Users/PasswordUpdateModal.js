import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";
import UserService from "../../services/UserService";

const PasswordUpdateModal = ({ open, onClose, user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    try {
      await UserService.updateUserPassword(user.id, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordError("");
      onClose();
    } catch (error) {
      setPasswordError("Failed to update password.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Password for {user.username}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          name="oldPassword"
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          name="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError && <Alert severity="error">{passwordError}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handlePasswordUpdate} color="primary">
          Update Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordUpdateModal;
