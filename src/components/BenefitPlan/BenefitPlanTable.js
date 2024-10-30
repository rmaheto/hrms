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
  Tooltip,
} from "@mui/material";
import { Eye, Edit, Trash2 } from "lucide-react";

const BenefitPlanTable = ({
  benefitPlans = [],
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onViewBenefitPlan,
  onEditBenefitPlan,
  onDeleteBenefitPlan,
}) => {
  const handleEditClick = (event, benefitPlan) => {
    event.stopPropagation();
    onEditBenefitPlan(benefitPlan);
  };

  const handleViewClick = (event, benefitPlan) => {
    event.stopPropagation();
    onViewBenefitPlan(benefitPlan);
  };

  const handleDeleteClick = (event, benefitPlan) => {
    event.stopPropagation();
    onDeleteBenefitPlan(benefitPlan);
  };

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Coverage Type</TableCell>
              <TableCell>Plan Level</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {benefitPlans.length > 0 ? (
                benefitPlans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.id}</TableCell>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.description}</TableCell>
                      <TableCell>{plan.coverageType || "-"}</TableCell>
                      <TableCell>{plan.planLevel || "-"}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="View">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleViewClick(e, plan)}
                          >
                            <Eye size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                              color="primary"
                              onClick={(e) => handleEditClick(e, plan)}
                          >
                            <Edit size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                              color="error"
                              onClick={(e) => handleDeleteClick(e, plan)}
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No benefit plans found.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
            component="div"
            count={benefitPlans.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
  );
};

export default BenefitPlanTable;