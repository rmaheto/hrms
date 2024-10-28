import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import DepartmentTable from "./DepartmentTable";
import DepartmentModal from "./DepartmentModal";
import DeleteConfirmationModal from "../GlobalComponents/DeleteConfirmationModal";
import departmentService from "../../services/DepartmentService";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalStates, setModalStates] = useState({
    addOrEditDepartmentModal: false,
    viewDepartmentModal: false,
    deleteDepartmentModal: false,
  });
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.fetchDepartments();
      setDepartments(response);
      setFilteredDepartments(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const filtered = departments.filter(dept =>
        dept.departmentName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };

  const handleAddDepartment = () => {
    setIsEditing(false);
    setSelectedDepartment(null);
    setModalStates({ addOrEditDepartmentModal: true });
  };

  const handleEditDepartment = (department) => {
    setIsEditing(true);
    setSelectedDepartment(department);
    setModalStates({ addOrEditDepartmentModal: true });
  };

  const handleViewDepartment = (department) => {
    setSelectedDepartment(department);
    setModalStates({ viewDepartmentModal: true });
  };

  const handleDeleteDepartment = (department) => {
    setSelectedDepartment(department);
    setModalStates({ deleteDepartmentModal: true });
  };

  const handleModalClose = () => {
    setModalStates({ addOrEditDepartmentModal: false, viewDepartmentModal: false, deleteDepartmentModal: false });
    setSelectedDepartment(null);
    setIsEditing(false);
  };

  const handleSaveDepartment = async (departmentData) => {
    try {
      if (isEditing) {
        await departmentService.updateDepartment(departmentData.id, departmentData);
      } else {
        await departmentService.createDepartment(departmentData);
      }
      fetchDepartments();
      handleModalClose();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  return (
      <Card sx={{ margin: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Departments
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <TextField
                size="small"
                label="Search departments..."
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{ width: "40%" }}
            />
            <Button variant="contained" color="primary" onClick={handleAddDepartment}>
              Add Department
            </Button>
          </div>

          <DepartmentTable
              departments={filteredDepartments}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onViewDepartment={handleViewDepartment}
              onEditDepartment={handleEditDepartment}
              onDeleteDepartment={handleDeleteDepartment}
          />
        </CardContent>

        <DepartmentModal
            open={modalStates.addOrEditDepartmentModal}
            onClose={handleModalClose}
            onSave={handleSaveDepartment}
            isEditing={isEditing}
            department={selectedDepartment}
        />

        <DeleteConfirmationModal
            open={modalStates.deleteDepartmentModal}
            onClose={handleModalClose}
            onConfirm={() => departmentService.deleteDepartment(selectedDepartment.id).then(fetchDepartments)}
            entity={selectedDepartment}
            entityName="department"
            getDisplayText={(department) => `${department.departmentName} (${department.departmentCode})`}
        />
      </Card>
  );
};

export default DepartmentPage;