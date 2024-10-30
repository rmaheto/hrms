import React from "react";
import {Modal, Box, Typography, Grid, Paper, Button} from "@mui/material";

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

const BenefitPlanViewModal = ({open, onClose, benefitPlan}) => {
  if (!benefitPlan) {
    return null;
  }

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Benefit Plan Details
          </Typography>
          <Paper sx={{p: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{benefitPlan.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography
                    variant="body1">{benefitPlan.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Coverage Type
                </Typography>
                <Typography variant="body1">{benefitPlan.coverageType
                    || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Plan Level
                </Typography>
                <Typography variant="body1">{benefitPlan.planLevel
                    || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Employment Type
                </Typography>
                <Typography variant="body1">{benefitPlan.employmentType
                    || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Employer Contribution
                </Typography>
                <Typography variant="body1">{benefitPlan.employerContribution
                    ? `${benefitPlan.employerContribution}%`
                    : "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Employee Contribution
                </Typography>
                <Typography variant="body1">{benefitPlan.employeeContribution
                    ? `${benefitPlan.employeeContribution}%`
                    : "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Minimum Service Years
                </Typography>
                <Typography variant="body1">{benefitPlan.minServiceYears
                    || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Minimum Age
                </Typography>
                <Typography variant="body1">{benefitPlan.minAge
                    || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="body1">{benefitPlan.isActive ? "Yes"
                    : "No"}</Typography>
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

export default BenefitPlanViewModal;