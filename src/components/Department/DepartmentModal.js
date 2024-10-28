import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import departmentService from "../../services/DepartmentService";

const compactFieldStyle = {
  marginBottom: 1,
  "& .MuiInputBase-root": {
    height: 40,
  },
  "& .MuiInputLabel-root": {
    fontSize: 14,
  },
  "& .MuiInputBase-input": {
    fontSize: 14,
    padding: "8px",
  },
};

const DepartmentModal = ({ open, onClose, onSave, isEditing, department }) => {
  const [formData, setFormData] = useState({
    id: null,
    departmentName: "",
    departmentDescription: "",
    departmentCode: "",
    managerId: "",
    location: "",
  });

  useEffect(() => {
    if (isEditing && department) {
      setFormData({
        id: department.id,
        departmentName: department.departmentName,
        departmentDescription: department.departmentDescription,
        departmentCode: department.departmentCode,
        location: department.location,
      });
    } else {
      setFormData({
        id: null,
        departmentName: "",
        departmentDescription: "",
        departmentCode: "",
        location: "",
      });
    }
  }, [isEditing, department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Department" : "Add Department"}</DialogTitle>
        <DialogContent>
          <TextField
              label="Department Name"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
          <TextField
              label="Description"
              name="departmentDescription"
              value={formData.departmentDescription}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
          <TextField
              label="Department Code"
              name="departmentCode"
              value={formData.departmentCode}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
          <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={compactFieldStyle}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <Button onClick={onClose} color="secondary" variant="outlined" sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
  );
};

export default DepartmentModal;