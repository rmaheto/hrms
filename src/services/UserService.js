import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/users";

// Helper to get the authorization headers
const getHeaders = () => {
  const token = authService.getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all users
const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // Read the response body only once
    const data = await response.json();

    // Check if 'data' is an array of users, not an object
    if (!Array.isArray(data)) {
      throw new Error("Expected an array of users");
    }

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ensure you re-throw the error after logging it
  }
};

// Fetch a user by ID
const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${userId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Create a new user
const createUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUserPassword = async (userId, passwordData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/update-password`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      throw new Error("Failed to update password");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch available roles
const fetchRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export default {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUserPassword,
  fetchRoles,
};
