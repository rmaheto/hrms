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

const NotificationTemplateTable = ({
  templates,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onViewTemplate,
  onEditTemplate,
  onDeleteTemplate,
}) => {

  const handleViewClick = (event, template) => {
    event.stopPropagation();
    onViewTemplate(template);
  };
  const handleEditClick = (event, template) => {
    event.stopPropagation();
    onEditTemplate(template);
  };
  const handleDeleteClick = (event, template) => {
    event.stopPropagation();
    onDeleteTemplate(template);
  };
  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Message Type</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.length > 0 ? (
                templates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the templates
                .map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.type}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleViewClick(e, template)}
                          >
                            <Eye size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleEditClick(e, template)}
                          >
                            <Edit size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={(e) => handleDeleteClick(e, template)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No templates found.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        {/* TablePagination component */}
        <TablePagination
            component="div"
            count={templates.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
  );
};

export default NotificationTemplateTable;