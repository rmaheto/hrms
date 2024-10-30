import React from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
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

const ViewEmployeeModal = ({ open, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Employee Details
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                First Name
              </Typography>
              <Typography variant="body1">{employee.firstName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Name
              </Typography>
              <Typography variant="body1">{employee.lastName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{employee.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">{employee.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1">
                {employee.department.departmentName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Position
              </Typography>
              <Typography variant="body1">{employee.position}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Date of Birth
              </Typography>
              <Typography variant="body1">{employee.dateOfBirth}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Place of Birth
              </Typography>
              <Typography variant="body1">{employee.placeOfBirth}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Hire Date
              </Typography>
              <Typography variant="body1">{employee.hireDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Salary
              </Typography>
              <Typography variant="body1">${employee.salary}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewEmployeeModal;