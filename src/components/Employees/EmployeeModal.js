import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import DepartmentService from "../../services/DepartmentService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Adjusted width for a two-column layout
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const compactFieldStyle = {
  marginBottom: 1, // Reduced margin for compact look
  "& .MuiInputBase-root": {
    height: 40, // Reduce the input field height
  },
  "& .MuiInputLabel-root": {
    fontSize: 14, // Smaller label font size
  },
  "& .MuiInputBase-input": {
    fontSize: 14, // Smaller input font size
    padding: "8px", // Compact padding
  },
};

const EmployeeModal = ({
  open,
  onClose,
  employee,
  onSaveEmployee,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    departmentId: "",
    dateOfBirth: "",
    placeOfBirth: "",
    salary: "",
    hireDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch departments for the dropdown
    DepartmentService.fetchDepartments().then(setDepartments);

    // Pre-fill form when editing
    if (isEditing && employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        departmentId: employee.department.id,
        dateOfBirth: employee.dateOfBirth,
        placeOfBirth: employee.placeOfBirth,
        salary: employee.salary,
        hireDate: employee.hireDate,
      });
    } else {
      // Reset form when adding a new employee
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        departmentId: "",
        dateOfBirth: "",
        placeOfBirth: "",
        salary: "",
        hireDate: "",
      });
    }
  }, [isEditing, employee]);

  // Function to format phone number as xxx-xxx-xxxx
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value); // Apply formatting for phone number
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSave = () => {
    // Perform validation before saving
    const newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone || !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (xxx-xxx-xxxx)";
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors, call onSaveEmployee
      onSaveEmployee({ ...formData, id: isEditing ? employee.id : undefined });
    } else {
      setErrors(newErrors); // Set validation errors
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              value={formData.firstName}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              value={formData.lastName}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={compactFieldStyle} // Apply compact style
              placeholder="xxx-xxx-xxxx"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              fullWidth
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Place of Birth"
              name="placeOfBirth"
              fullWidth
              value={formData.placeOfBirth}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Salary"
              name="salary"
              type="number"
              fullWidth
              value={formData.salary}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hire Date"
              name="hireDate"
              fullWidth
              type="date"
              value={formData.hireDate}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Position and Department in the same row */}
          <Grid item xs={6}>
            <TextField
              label="Position"
              name="position"
              fullWidth
              value={formData.position}
              onChange={handleInputChange}
              sx={compactFieldStyle} // Apply compact style
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={compactFieldStyle}>
              <InputLabel>Department</InputLabel>
              <Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleInputChange}
              >
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2 }}
        >
          {isEditing ? "Save Changes" : "Add Employee"}
        </Button>
      </Box>
    </Modal>
  );
};

export default EmployeeModal;
