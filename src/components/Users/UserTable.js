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
import { LockReset as KeyIcon } from "@mui/icons-material";
import { Edit as EditIcon } from "lucide-react";

const UserTable = ({
  users = [],
  onEditUser,
  onUpdatePassword,
  loggedInUser,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const canUpdatePassword = (user) =>
      loggedInUser?.roles.includes("ROLE_ADMIN") ||
      loggedInUser?.username === user?.username;

  return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Roles</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
                users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.roles ? user.roles.join(", ") : "No roles"}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit User">
                          <IconButton
                              color="primary"
                              onClick={() => onEditUser(user)}
                          >
                            <EditIcon size={20} />
                          </IconButton>
                        </Tooltip>
                        {canUpdatePassword(user) && (
                            <Tooltip title="Change Password">
                              <IconButton
                                  color="primary"
                                  onClick={() => onUpdatePassword(user)}
                              >
                                <KeyIcon />
                              </IconButton>
                            </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Component */}
        <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
  );
};

export default UserTable;