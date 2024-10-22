import authService from "./AuthService";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/attendance/report";

// Function to retrieve headers with authorization token
const getHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Function to fetch attendance data
const fetchAttendance = async (employeeId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${employeeId}`, {
      params: {
        startDate,
        endDate,
      },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return [];
  }
};

export default {
  fetchAttendance,
};
