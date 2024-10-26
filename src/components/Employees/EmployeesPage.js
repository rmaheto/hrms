import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Box } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import DeleteConfirmationModal from "../GlobalComponents/DeleteConfirmationModal";
import employeeService from "../../services/EmployeeService";
import departmentService from "../../services/DepartmentService";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [modalStates, setModalStates] = useState({
    employeeModal: false,
    viewModal: false,
    deleteModal: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [employeesData, departmentsData] = await Promise.all([
        employeeService.fetchEmployees(),
        departmentService.fetchDepartments(),
      ]);
      setEmployees(employeesData);
      setFilteredEmployees(employeesData);
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    const lowercasedFilter = filterText.toLowerCase();
    const filteredData = employees.filter(
        (employee) =>
            employee.firstName.toLowerCase().includes(lowercasedFilter) ||
            employee.lastName.toLowerCase().includes(lowercasedFilter) ||
            employee.email.toLowerCase().includes(lowercasedFilter) ||
            employee.position.toLowerCase().includes(lowercasedFilter) ||
            employee.department?.departmentName.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredEmployees(filteredData);
  }, [filterText, employees]);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleModalClose = (modalType) => {
    setModalStates((prev) => ({
      ...prev,
      [modalType]: false,
    }));
    if (modalType === "employeeModal") {
      setSelectedEmployee(null);
      setIsEditing(false);
    }
  };

  const handleAddEmployee = () => {
    setModalStates({
      employeeModal: true,
      viewModal: false,
      deleteModal: false,
    });
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const handleEditEmployee = (employee) => {
    setModalStates({
      employeeModal: true,
      viewModal: false,
      deleteModal: false,
    });
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleViewEmployee = (employee) => {
    setModalStates({
      employeeModal: false,
      viewModal: true,
      deleteModal: false,
    });
    setSelectedEmployee(employee);
  };

  const handleDeleteClick = (employee) => {
    setModalStates({
      employeeModal: false,
      viewModal: false,
      deleteModal: true,
    });
    setSelectedEmployee(employee);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (isEditing) {
        const updatedEmployee = await employeeService.updateEmployee(employeeData);
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
        );
      } else {
        const newEmployee = await employeeService.addEmployee(employeeData);
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      }
      handleModalClose("employeeModal");
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      if (selectedEmployee) {
        await employeeService.deleteEmployee(selectedEmployee.id);
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== selectedEmployee.id));
        handleModalClose("deleteModal");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
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
            Employees
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            {/* Left-aligned Search Field */}
            <TextField
                label="Search employees..."
                variant="outlined"
                size="small" // Compact size
                value={filterText}
                onChange={handleFilterChange}
                sx={{
                  width: "20%",
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
            />

            {/* Right-aligned Add Employee Button */}
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleAddEmployee}
                sx={{
                  width: "15%",
                  padding: "6px 12px",
                  height: 40,
                }}
            >
              Add Employee
            </Button>
          </Box>

          <EmployeeTable
              employees={filteredEmployees}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onViewEmployee={handleViewEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteClick}
          />

          {/* Modals */}
          <EmployeeModal
              open={modalStates.employeeModal}
              onClose={() => handleModalClose("employeeModal")}
              employee={selectedEmployee}
              onSaveEmployee={handleSaveEmployee}
              isEditing={isEditing}
              departments={departments}
          />

          <ViewEmployeeModal
              open={modalStates.viewModal}
              onClose={() => handleModalClose("viewModal")}
              employee={selectedEmployee}
          />

          <DeleteConfirmationModal
              open={modalStates.deleteModal}
              onClose={() => handleModalClose("deleteModal")}
              onConfirm={handleDeleteEmployee}
              entity={selectedEmployee}
              entityName="employee"
              getDisplayText={(employee) => `${employee.firstName} ${employee.lastName}, `}
          />
        </CardContent>
      </Card>
  );
};

export default EmployeesPage;