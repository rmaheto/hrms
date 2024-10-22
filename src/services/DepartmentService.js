import authService from "./AuthService";

const API_BASE_URL = "http://localhost:8080/api/departments";

const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all departments
const fetchDepartments = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch departments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export default { fetchDepartments };
