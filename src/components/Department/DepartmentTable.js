import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { Eye, Edit } from "lucide-react";

const DepartmentTable = ({
  departments,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onViewDepartment,
  onEditDepartment,
  onDeleteDepartment,
}) => {
  const handleViewClick = (event, department) => {
    event.stopPropagation();
    onViewDepartment(department);
  };

  const handleEditClick = (event, department) => {
    event.stopPropagation();
    onEditDepartment(department);
  };

  const handleDeleteClick = (event, department) => {
    event.stopPropagation();
    onDeleteDepartment(department);
  };

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.length > 0 ? (
                departments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>{department.id}</TableCell>
                      <TableCell>{department.departmentName}</TableCell>
                      <TableCell>{department.departmentDescription}</TableCell>
                      <TableCell>{department.departmentCode}</TableCell>
                      <TableCell>{department.location}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleViewClick(e, department)}
                          >
                            <Eye size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleEditClick(e, department)}
                          >
                            <Edit size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={(e) => handleDeleteClick(e, department)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No departments found.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
            component="div"
            count={departments.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
  );
};

export default DepartmentTable;