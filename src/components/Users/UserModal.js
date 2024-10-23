import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const UserModal = ({
  open,
  onClose,
  user,
  onFormChange,
  onRoleChange,
  onSaveUser,
  isEditing,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit User" : "Add New User"}
        </Typography>

        {/* Hidden dummy fields to prevent browser autofill */}
        <input type="text" name="hiddenUsername" style={{ display: "none" }} />
        <input
          type="password"
          name="hiddenPassword"
          style={{ display: "none" }}
        />

        <TextField
          label="Username"
          name="username"
          fullWidth
          value={user.username}
          onChange={onFormChange}
          sx={{ marginBottom: 2 }}
          autoComplete="off" // Prevent autofill for username
        />

        {!isEditing && (
          <TextField
            label="Password"
            name="password"
            fullWidth
            type="password"
            value={user.password}
            onChange={onFormChange}
            sx={{ marginBottom: 2 }}
            autoComplete="new-password" // Prevent autofill for password
          />
        )}

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={user.roles.includes("ROLE_USER")}
                onChange={onRoleChange}
                name="ROLE_USER"
              />
            }
            label="ROLE_USER"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={user.roles.includes("ROLE_ADMIN")}
                onChange={onRoleChange}
                name="ROLE_ADMIN"
              />
            }
            label="ROLE_ADMIN"
          />
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          onClick={onSaveUser}
          sx={{ marginTop: 2 }}
        >
          {isEditing ? "Save Changes" : "Add User"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UserModal;
