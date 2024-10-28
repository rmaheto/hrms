import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import userService from "../../services/UserService";

const RoleFilter = ({ roleFilters, onRoleFilterChange }) => {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await userService.fetchRoles();
        const roleNames = roles.map((role) => role.name);
        setAvailableRoles(roleNames);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);
  
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedRoles(value);

    onRoleFilterChange(value);
  };

  return (
    <Card sx={{ marginBottom: 2, width: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "8px 16px",
        }}
      >
        <FormControl sx={{ minWidth: 240, marginRight: 2 }} variant="outlined">
          <InputLabel>Filter by Role</InputLabel>
          <Select
            multiple
            value={selectedRoles}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(", ")}
            label="Filter by Role"
            sx={{ width: 250, height: 36 }}
          >
            {availableRoles.map((role) => (
              <MenuItem key={role} value={role}>
                <Checkbox checked={selectedRoles.includes(role)} />
                <ListItemText primary={role} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default RoleFilter;
