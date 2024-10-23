import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";
import employeeService from "../../services/EmployeeService";
import departmentService from "../../services/DepartmentService";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Pagination states
  const [page, setPage] = useState(0); // Set initial page to 0
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page

  useEffect(() => {
    // Fetch employees and departments on component mount
    employeeService.fetchEmployees().then(setEmployees);
    departmentService.fetchDepartments().then(setDepartments);
  }, []);

  // Handle saving employee (create or update)
  const handleSaveEmployee = (employeeData) => {
    if (isEditing) {
      // Update existing employee
      employeeService.updateEmployee(employeeData).then((updatedEmployee) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
      });
    } else {
      // Create new employee
      employeeService.addEmployee(employeeData).then((newEmployee) => {
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      });
    }
    setOpenModal(false); // Close modal after saving
  };

  // Handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change for pagination
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Ensure it's an integer
    setPage(0); // Reset page when changing rows per page
  };

  // Handle opening the modal to add or edit an employee
  const handleOpenModal = (employee = null) => {
    setIsEditing(!!employee);
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card sx={{ margin: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Employees
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2, float: "right" }}
          onClick={() => handleOpenModal(null)}
        >
          Add Employee
        </Button>
        <div style={{ clear: "both" }}></div>
        <EmployeeTable
          employees={employees}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEditEmployee={handleOpenModal}
        />
        {openModal && (
          <EmployeeModal
            open={openModal}
            onClose={handleCloseModal}
            employee={selectedEmployee}
            onSaveEmployee={handleSaveEmployee}
            isEditing={isEditing}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
