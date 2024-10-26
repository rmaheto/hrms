import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const compactFieldStyle = {
  marginBottom: 2,
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

const DepartmentModal = ({
  open,
  onClose,
  department,
  onSaveDepartment,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentDescription: "",
    location: "",
    departmentCode: "",
   
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && department) {
      setFormData({
        departmentName: department.departmentName,
        departmentDescription: department.departmentDescription,
        location: department.location,
        departmentCode: department.departmentCode,
        
      });
    } else {
      setFormData({
        departmentName: "",
        departmentDescription: "",
        location: "",
        departmentCode: "",
        
      });
    }
  }, [isEditing, department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.departmentName) {
        newErrors.departmentName = "Department name is required";
      }
      if (!formData.departmentCode) {
          newErrors.departmentCode= "Code is required";
        }
      if (!formData.location) {
        newErrors.location = "Location is required";
      }
      if (!formData.departmentDescription) {
          newErrors.departmentDescription = "Description is required";
        }
  
      if (Object.keys(newErrors).length === 0) {
        onSaveDepartment({ ...formData, id: isEditing ? department.id : undefined });
      } else {
        setErrors(newErrors);
      }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit Department" : "Add New Department"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Department Name"
              name="departmentName"
              fullWidth
              value={formData.departmentName}
              onChange={handleInputChange}
              error={!!errors.departmentName}
              helperText={errors.departmentName}
              sx={compactFieldStyle}
            />
          </Grid>
          

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="departmentDescription"
              fullWidth
              multiline
              
              value={formData.departmentDescription}
              onChange={handleInputChange}
              sx={compactFieldStyle}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleInputChange}
              error={!!errors.location}
              helperText={errors.location}
              sx={compactFieldStyle}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="department Code"
              name="departmentCode"
              type="number"
              fullWidth
              value={formData.departmentCode}
              onChange={handleInputChange}
              error={!!errors.budget}
              helperText={errors.budget}
              sx={compactFieldStyle}
            />
          </Grid>

          
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Department"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DepartmentModal;