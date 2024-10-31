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
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

// Compact field styling similar to EmployeeModal
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

const BenefitPlanModal = ({ open, onClose, benefitPlan, onSaveBenefitPlan, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverageType: "",
    planLevel: "",
    employmentType: "",
    employerContribution: "",
    employeeContribution: "",
  });

  useEffect(() => {
    if (isEditing && benefitPlan) {
      setFormData({ ...benefitPlan });
    } else {
      setFormData({
        name: "",
        description: "",
        coverageType: "",
        planLevel: "",
        employmentType: "",
        employerContribution: "",
        employeeContribution: "",
      });
    }
  }, [isEditing, benefitPlan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    await onSaveBenefitPlan(formData);
    onClose();
  };

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? "Edit Benefit Plan" : "Add Benefit Plan"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  value={formData.description}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Coverage Type"
                  name="coverageType"
                  fullWidth
                  value={formData.coverageType}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Plan Level"
                  name="planLevel"
                  fullWidth
                  value={formData.planLevel}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Employment Type"
                  name="employmentType"
                  fullWidth
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Employer Contribution"
                  name="employerContribution"
                  fullWidth
                  type="number"
                  value={formData.employerContribution}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Employee Contribution"
                  name="fixedEmployeeContribution"
                  fullWidth
                  type="number"
                  value={formData.fixedEmployeeContribution}
                  onChange={handleInputChange}
                  sx={compactFieldStyle}
              />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isEditing ? "Save Changes" : "Add Benefit Plan"}
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default BenefitPlanModal;