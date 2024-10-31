import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, TextField, Box } from "@mui/material";
import BenefitPlanTable from "./BenefitPlanTable";
import BenefitPlanModal from "./BenefitPlanModal";
import DeleteConfirmationModal from "../GlobalComponents/DeleteConfirmationModal";
import BenefitPlanViewModal from "./BenefitPlanViewModal"; // Import the View Modal
import benefitPlanService from "../../services/BenefitPlanService";

const BenefitPlanPage = () => {
  const [benefitPlans, setBenefitPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalStates, setModalStates] = useState({
    benefitPlanModal: false,
    deleteModal: false,
    viewModal: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchBenefitPlans();
  }, []);

  const fetchBenefitPlans = async () => {
    try {
      const response = await benefitPlanService.fetchAllBenefitPlans();
      setBenefitPlans(response.data);
      setFilteredPlans(response.data);
    } catch (error) {
      console.error("Error fetching benefit plans:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = benefitPlans.filter((plan) =>
        plan.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPlans(filtered);
  };

  const handleSaveBenefit = async (benefitPlan) => {
    try {
      if (isEditing) {
        const updatedBenefit = await benefitPlanService.updateBenefitPlan(benefitPlan);
        setBenefitPlans((prevBenefitPlan) =>
            prevBenefitPlan.map((plan) => (plan.id === updatedBenefit.id ? updatedBenefit : plan))
        );
      } else {
        const newBenefitPlan = await benefitPlanService.createBenefitPlan(benefitPlan);
        setBenefitPlans((prevBenefitPlan) => [...prevBenefitPlan, newBenefitPlan]);
      }
      handleModalClose("benefitPlanModal");
      fetchBenefitPlans();
    } catch (error) {
      console.error("Error saving benefit plan:", error);
    }
  };

  const handleAddBenefitPlan = () => {
    setIsEditing(false);
    setSelectedPlan(null);
    setModalStates({ benefitPlanModal: true, deleteModal: false, viewModal: false });
  };

  const handleEditBenefitPlan = (plan) => {
    setIsEditing(true);
    setSelectedPlan(plan);
    setModalStates({ benefitPlanModal: true, deleteModal: false, viewModal: false });
  };

  const handleViewBenefitPlan = (plan) => {
    setSelectedPlan(plan);
    setModalStates({ benefitPlanModal: false, deleteModal: false, viewModal: true });
  };

  const handleDeleteClick = (plan) => {
    setSelectedPlan(plan);
    setModalStates({ benefitPlanModal: false, deleteModal: true, viewModal: false });
  };

  const handleDeleteBenefitPlan = async () => {
    try {
      if (selectedPlan) {
        await benefitPlanService.deleteBenefitPlan(selectedPlan.id);
        setBenefitPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== selectedPlan.id));
        handleModalClose("deleteModal");
      }
    } catch (error) {
      console.error("Error deleting benefit plan:", error);
    }
  };

  const handleModalClose = (modalType) => {
    setModalStates((prev) => ({ ...prev, [modalType]: false }));
    if (modalType === "benefitPlanModal") {
      setSelectedPlan(null);
      setIsEditing(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <Card sx={{ margin: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Benefit Plans
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <TextField
                label="Search benefit plans..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ width: "20%" }}
            />
            <Button variant="contained" color="primary" size="small" onClick={handleAddBenefitPlan}>
              Add Benefit Plan
            </Button>
          </Box>

          <BenefitPlanTable
              benefitPlans={filteredPlans}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onViewBenefitPlan={handleViewBenefitPlan} // Pass view handler
              onEditBenefitPlan={handleEditBenefitPlan}
              onDeleteBenefitPlan={handleDeleteClick}
          />

          <BenefitPlanModal
              open={modalStates.benefitPlanModal}
              onClose={() => handleModalClose("benefitPlanModal")}
              benefitPlan={selectedPlan}
              onSaveBenefitPlan={handleSaveBenefit}
              isEditing={isEditing}
          />

          <DeleteConfirmationModal
              open={modalStates.deleteModal}
              onClose={() => handleModalClose("deleteModal")}
              onConfirm={handleDeleteBenefitPlan}
              entity={selectedPlan}
              entityName="benefit plan"
              getDisplayText={(plan) => plan.name}
          />

          <BenefitPlanViewModal
              open={modalStates.viewModal}
              onClose={() => handleModalClose("viewModal")}
              benefitPlan={selectedPlan}
          />
        </CardContent>
      </Card>
  );
};

export default BenefitPlanPage;