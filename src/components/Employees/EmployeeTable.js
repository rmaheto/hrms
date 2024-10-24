import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon import
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Upload icon import

const EmployeeTable = ({
  employees = [], // Default to empty array
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditEmployee, // Callback for edit
  onUploadDocument, // Callback for document upload
}) => {
  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
                employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate data
                .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department.departmentName}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        {/* Edit IconButton */}
                        <IconButton
                            onClick={() => onEditEmployee(employee)} // Trigger edit
                            color="primary"
                        >
                          <EditIcon />
                        </IconButton>

                        {/* Upload IconButton */}
                        <IconButton
                            onClick={() => onUploadDocument(employee)} // Trigger document upload
                            color="secondary"
                        >
                          <UploadFileIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No employees found.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
            component="div"
            count={employees.length} // Total number of employees
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
  );
};

export default EmployeeTable;