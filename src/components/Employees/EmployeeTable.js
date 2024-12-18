import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Tooltip } from "@mui/material";
import { Eye, Edit, Trash2 } from "lucide-react";
import { LocalOffer } from "@mui/icons-material";

const EmployeeTable = ({
  employees = [],
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  onAssignBenefits,
}) => {
  const handleAssignClick = (event, employee) => {
    event.stopPropagation();
    onAssignBenefits(employee);
  };

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
              <TableCell>Position</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
                employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.department?.departmentName}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View">
                          <IconButton
                              color="primary"
                              onClick={(e) => onViewEmployee(employee)}
                          >
                            <Eye size={20} />
                          </IconButton>
                          <Tooltip title="Assign Benefits">
                            <IconButton
                                color="secondary"
                                onClick={(e) => handleAssignClick(e, employee)}
                            >
                              <LocalOffer size={20} />
                            </IconButton>
                          </Tooltip>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                              color="primary"
                              onClick={(e) => onEditEmployee(employee)}
                          >
                            <Edit size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                              color="error"
                              onClick={(e) => onDeleteEmployee(employee)}
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        </Tooltip>
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
            count={employees.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
  );
};

export default EmployeeTable;