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
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

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
    DepartmentService.fetchDepartments().then(setDepartments);

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

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? formatPhoneNumber(value) : value,
    });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone || !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (xxx-xxx-xxxx)";
    }

    if (Object.keys(newErrors).length === 0) {
      onSaveEmployee({ ...formData, id: isEditing ? employee.id : undefined });
    } else {
      setErrors(newErrors);
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
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
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
                  sx={compactFieldStyle}
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                  label="Position"
                  name="position"
                  fullWidth
                  value={formData.position}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
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

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isEditing ? "Save Changes" : "Add Employee"}
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default EmployeeModal;