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
} from "@mui/material";
import { Edit as EditIcon, VpnKey as KeyIcon } from "@mui/icons-material";

const UserTable = ({
  users = [],
  onEditUser,
  onUpdatePassword,
  loggedInUser,
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
            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.roles ? user.roles.join(", ") : "No roles"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  {/* Password Update Icon */}
                  {canUpdatePassword(user) && (
                    <IconButton onClick={() => onUpdatePassword(user)}>
                      <KeyIcon />
                    </IconButton>
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
    </TableContainer>
  );
};

export default UserTable;
