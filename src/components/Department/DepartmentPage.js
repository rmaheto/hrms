import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import departmentService from "../../services/DepartmentService";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [modalStates, setModalStates] = useState({
    departmentModal: false,
    deleteModal: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await departmentService.fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  const handleModalClose = (modalType) => {
    setModalStates((prev) => ({
      ...prev,
      [modalType]: false,
    }));
    if (modalType === "departmentModal") {
      setSelectedDepartment(null);
      setIsEditing(false);
    }
  };

  const handleAddDepartment = () => {
    setModalStates({
      departmentModal: true,
      deleteModal: false,
    });
    setSelectedDepartment(null);
    setIsEditing(false);
  };

  const handleEditDepartment = (department) => {
    setModalStates({
      departmentModal: true,
      deleteModal: false,
    });
    setSelectedDepartment(department);
    setIsEditing(true);
  };

  const handleViewDepartment = (department) => {
    // If you want to implement a view modal, you can add it here
    console.log("Viewing department:", department);
  };

  const handleDeleteClick = (department) => {
    setModalStates({
      departmentModal: false,
      deleteModal: true,
    });
    setSelectedDepartment(department);
  };

  const handleSaveDepartment = async (departmentData) => {
    try {
      if (isEditing) {
        const updatedDepartment = await departmentService.updateDepartment(
          departmentData
        );
        setDepartments((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept.id === updatedDepartment.id ? updatedDepartment : dept
          )
        );
      } else {
        const newDepartment = await departmentService.addDepartment(
          departmentData
        );
        setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
      }
      handleModalClose("departmentModal");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleDeleteDepartment = async () => {
    try {
      if (selectedDepartment) {
        await departmentService.deleteDepartment(selectedDepartment.id);
        setDepartments((prevDepartments) =>
          prevDepartments.filter((dept) => dept.id !== selectedDepartment.id)
        );
        handleModalClose("deleteModal");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
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
          Departments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2, float: "right" }}
          onClick={handleAddDepartment}
        >
          Add Department
        </Button>
        <div style={{ clear: "both" }}></div>

        <DepartmentTable
          departments={departments}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDepartment={handleViewDepartment}
          onEditDepartment={handleEditDepartment}
          onDeleteDepartment={handleDeleteClick}
        />

        {/* Department Modal for Add/Edit */}
        <DepartmentModal
          open={modalStates.departmentModal}
          onClose={() => handleModalClose("departmentModal")}
          department={selectedDepartment}
          onSaveDepartment={handleSaveDepartment}
          isEditing={isEditing}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          open={modalStates.deleteModal}
          onClose={() => handleModalClose("deleteModal")}
          onConfirm={handleDeleteDepartment}
          itemType="department"
          item={selectedDepartment}
          message={`Are you sure you want to delete department ${selectedDepartment?.departmentName}? This action cannot be undone.`}
        />
      </CardContent>
    </Card>
  );
};

export default DepartmentsPage;