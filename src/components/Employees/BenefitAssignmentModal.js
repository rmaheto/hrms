import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  Paper,
  TablePagination,
} from "@mui/material";
import EmployeeBenefitService from "../../services/EmployeeBenefitService";
import benefitPlanService from "../../services/BenefitPlanService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 800,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const BenefitAssignmentModal = ({ open, onClose, employeeId, employeeName }) => {
  const [benefitPlans, setBenefitPlans] = useState([]);
  const [assignedBenefits, setAssignedBenefits] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (employeeId) {
      setFilterText("");
      fetchBenefits();
    }
  }, [employeeId]);

  const fetchBenefits = async () => {
    try {
      const [allBenefitsResponse, employeeBenefitsResponse] = await Promise.all([
        benefitPlanService.fetchAllBenefitPlans(),
        EmployeeBenefitService.getEmployeeBenefits(employeeId),
      ]);

      setBenefitPlans(allBenefitsResponse.data);
      const assignedIds = employeeBenefitsResponse.data.map((benefit) => benefit.benefitPlan.id);
      setAssignedBenefits(assignedIds);
      setSelectedBenefits(assignedIds);
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  const handleSelectBenefit = (benefitId) => {
    setSelectedBenefits((prevSelected) =>
        prevSelected.includes(benefitId)
            ? prevSelected.filter((id) => id !== benefitId)
            : [...prevSelected, benefitId]
    );
  };

  const handleSave = async () => {
    try {
      await EmployeeBenefitService.assignBenefits(employeeId, selectedBenefits);
      onClose();
    } catch (error) {
      console.error("Error assigning benefits:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBenefitPlans = benefitPlans
  .filter((plan) => {
    const searchText = filterText.toLowerCase();
    return (
        plan.name.toLowerCase().includes(searchText) ||
        plan.description.toLowerCase().includes(searchText) ||
        (plan.coverageType && plan.coverageType.toLowerCase().includes(searchText)) ||
        (plan.planLevel && plan.planLevel.toLowerCase().includes(searchText))
    );
  })
  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Assign Benefits - {employeeName}
          </Typography>
          <TextField
              label="Search benefit plans..."
              variant="outlined"
              size="small"
              fullWidth
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ mb: 2, width: "33%" }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Benefit Plan Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Coverage</TableCell>
                  <TableCell>Plan Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBenefitPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <Checkbox
                            checked={selectedBenefits.includes(plan.id)}
                            onChange={() => handleSelectBenefit(plan.id)}
                        />
                      </TableCell>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.description}</TableCell>
                      <TableCell>{plan.coverageType}</TableCell>
                      <TableCell>{plan.planLevel}</TableCell>
                    </TableRow>
                ))}
                {filteredBenefitPlans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No benefit plans found.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              component="div"
              count={benefitPlans.filter((plan) =>
                  plan.name.toLowerCase().includes(filterText.toLowerCase())
              ).length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
          />
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default BenefitAssignmentModal;