import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import UserService from "../../services/UserService";
import UserTable from "./UserTable";
import RoleFilter from "./RoleFilter";
import UserModal from "./UserModal";
import PasswordUpdateModal from "./PasswordUpdateModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilters, setRoleFilters] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    password: "",
    roles: [],
  });
  const [loggedInUser, setLoggedInUser] = useState({
    username: "admin",
    roles: ["ROLE_ADMIN"],
  });

  // Pagination state
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    UserService.fetchUsers().then((response) => {
      setUsers(response);
      setFilteredUsers(response); // Initialize filtered users as all users
    });
  }, []);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Convert value to number
    setPage(0); // Reset to first page when rows per page changes
  };

  useEffect(() => {
    if (roleFilters.length > 0) {
      const filtered = users.filter((user) =>
          user.roles.some((role) => roleFilters.includes(role))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [roleFilters, users]);

  const handleRoleFilterChange = (selectedRoles) => {
    setRoleFilters(selectedRoles);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const handleRoleChange = (event) => {
    const { name, checked } = event.target;
    const updatedRoles = checked
        ? [...selectedUser.roles, name]
        : selectedUser.roles.filter((role) => role !== name);
    setSelectedUser({ ...selectedUser, roles: updatedRoles });
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setSelectedUser({ username: "", password: "", roles: [] });
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleOpenPasswordModal = (user) => {
    setSelectedUser(user);
    setOpenPasswordModal(true);
  };

  const handleSaveUser = () => {
    if (isEditing) {
      UserService.updateUser(selectedUser).then((response) => {
        const updatedUsers = users.map((user) =>
            user.id === response.id ? response : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      });
    } else {
      UserService.createUser(selectedUser).then((response) => {
        setUsers([...users, response]);
        setFilteredUsers([...users, response]);
      });
    }
    setOpenModal(false);
  };

  return (
      <Card sx={{ margin: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User List
          </Typography>
          <RoleFilter
              roleFilters={roleFilters}
              onRoleFilterChange={handleRoleFilterChange}
          />
          <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2, float: "right" }}
              onClick={handleOpenModal}
          >
            Add User
          </Button>
          <div style={{ clear: "both" }}></div>
          <UserTable
              users={filteredUsers}
              onEditUser={handleEditUser}
              onUpdatePassword={handleOpenPasswordModal}
              loggedInUser={loggedInUser}
              page={page} // Pass page state
              rowsPerPage={rowsPerPage} // Pass rows per page state
              onPageChange={handlePageChange} // Handle page change
              onRowsPerPageChange={handleRowsPerPageChange} // Handle rows per page change
          />
          <UserModal
              key={isEditing ? selectedUser.id : "add"}
              open={openModal}
              onClose={() => setOpenModal(false)}
              user={selectedUser}
              onFormChange={handleFormChange}
              onRoleChange={handleRoleChange}
              onSaveUser={handleSaveUser}
              isEditing={isEditing}
          />
          <PasswordUpdateModal
              open={openPasswordModal}
              onClose={() => setOpenPasswordModal(false)}
              user={selectedUser}
          />
        </CardContent>
      </Card>
  );
};

export default UserList;