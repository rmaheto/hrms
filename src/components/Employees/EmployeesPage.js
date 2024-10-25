import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";
import ViewEmployeeModal from "./ViewEmployeeModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import employeeService from "../../services/EmployeeService";
import departmentService from "../../services/DepartmentService";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [modalStates, setModalStates] = useState({
    employeeModal: false,
    viewModal: false,
    deleteModal: false
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
        departmentService.fetchDepartments()
      ]);
      setEmployees(employeesData);
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleModalClose = (modalType) => {
    console.log('Closing modal:', modalType); // Add logging
    setModalStates(prev => ({
      ...prev,
      [modalType]: false
    }));
    if (modalType === 'employeeModal') {
      setSelectedEmployee(null);
      setIsEditing(false);
    }
  };

  const handleModalOpen = (modalType, employee = null, isEdit = false) => {
    setModalStates({
      employeeModal: false,
      viewModal: false,
      deleteModal: false,
      [modalType]: true})
    setModalStates(prev => ({ ...prev, [modalType]: true }));
    setSelectedEmployee(employee);
    setIsEditing(isEdit);
  };

  const handleAddEmployee = () => {
    console.log('Opening Add Employee Modal'); // Add logging
    setModalStates({
      employeeModal: true,
      viewModal: false,
      deleteModal: false
    });
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const handleEditEmployee = (employee) => {
    console.log('Opening Edit Employee Modal', employee); // Add logging
    setModalStates({
      employeeModal: true,
      viewModal: false,
      deleteModal: false
    });
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleViewEmployee = (employee) => {
    console.log('Opening View Employee Modal', employee); // Add logging
    setModalStates({
      employeeModal: false,
      viewModal: true,
      deleteModal: false
    });
    setSelectedEmployee(employee);
  };

  const handleDeleteClick = (employee) => {
    setModalStates({
      employeeModal: false,
      viewModal: false,
      deleteModal: true
    });
    setSelectedEmployee(employee);
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (isEditing) {
        const updatedEmployee = await employeeService.updateEmployee(employeeData);
        setEmployees(prevEmployees =>
          prevEmployees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
      } else {
        const newEmployee = await employeeService.addEmployee(employeeData);
        setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      }
      handleModalClose('employeeModal');
    } catch (error) {
      console.error("Error saving employee:", error);
      // Here you might want to show an error message to the user
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      if (selectedEmployee) {
        await employeeService.deleteEmployee(selectedEmployee.id);
        setEmployees(prevEmployees =>
          prevEmployees.filter(emp => emp.id !== selectedEmployee.id)
        );
        handleModalClose('deleteModal');
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      // Here you might want to show an error message to the user
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
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2, float: "right" }}
          onClick={handleAddEmployee}
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
          onViewEmployee={handleViewEmployee}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteClick}
        />

       {/* Employee Modal for Add/Edit */}
       <EmployeeModal
          open={modalStates.employeeModal}
          onClose={() => handleModalClose('employeeModal')}
          employee={selectedEmployee}
          onSaveEmployee={handleSaveEmployee}
          isEditing={isEditing}
          departments={departments}
        />

        <ViewEmployeeModal
          open={modalStates.viewModal}
          onClose={() => handleModalClose('viewModal')}
          employee={selectedEmployee}
        />

        <DeleteConfirmationModal
          open={modalStates.deleteModal}
          onClose={() => handleModalClose('deleteModal')}
          onConfirm={handleDeleteEmployee}
          employee={selectedEmployee}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeesPage;
