import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import UserService from "../../services/UserService";
import UserTable from "./UserTable";
import RoleFilter from "./RoleFilter";
import UserModal from "./UserModal"; // Renamed modal for both add/edit
import PasswordUpdateModal from "./PasswordUpdateModal"; // Separate modal for password update

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilters, setRoleFilters] = useState([]); // roleFilters is an array of selected roles
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false); // Password modal state
  const [isEditing, setIsEditing] = useState(false); // Flag for editing mode
  const [selectedUser, setSelectedUser] = useState({
    // Holds the user being edited/added
    username: "",
    password: "",
    roles: [],
  });
  const [loggedInUser, setLoggedInUser] = useState({
    // Assume this is fetched from auth service or token
    username: "admin",
    roles: ["ROLE_ADMIN"],
  });

  useEffect(() => {
    UserService.fetchUsers().then((response) => {
      setUsers(response);
      setFilteredUsers(response); // Initialize filtered users as all users
    });
  }, []);

  // Filter users when roleFilters change
  useEffect(() => {
    if (roleFilters.length > 0) {
      const filtered = users.filter(
        (user) => user.roles.some((role) => roleFilters.includes(role)) // Match roles
      );
      setFilteredUsers(filtered);
    } else {
      // If no filters are selected, show all users
      setFilteredUsers(users);
    }
  }, [roleFilters, users]); // Re-run when roleFilters or users change

  // handleRoleFilterChange directly accepts the selected roles array
  const handleRoleFilterChange = (selectedRoles) => {
    setRoleFilters(selectedRoles); // Update roleFilters array
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
    setIsEditing(false); // Set to adding mode
    setSelectedUser({ username: "", password: "", roles: [] });
    setOpenModal(true);
  };

  const handleEditUser = (user) => {
    setIsEditing(true); // Set to editing mode
    setSelectedUser(user); // Load user data into state for editing
    setOpenModal(true);
  };

  const handleOpenPasswordModal = (user) => {
    setSelectedUser(user); // Load the selected user
    setOpenPasswordModal(true); // Open password modal
  };

  const handleSaveUser = () => {
    if (isEditing) {
      // Call update user service
      UserService.updateUser(selectedUser).then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === response.id ? response : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      });
    } else {
      // Call create user service
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
          onRoleFilterChange={handleRoleFilterChange} // Pass down handleRoleFilterChange
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
          loggedInUser={loggedInUser} // Pass down the logged-in user for permissions
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
        {/* Password Update Modal */}
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
