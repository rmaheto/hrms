import axios from "axios"; // Import Axios
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode JWT tokens

class AuthService {
  constructor() {
    this.tokenKey = "token"; // Key to store the token in localStorage
    this.apiUrl = "http://localhost:8090/api"; // Base API URL
  }

  // Login method to authenticate the user
  login = async (username, password) => {
    try {
      const response = await axios.post(
        `${this.apiUrl}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure credentials are included (cookies, tokens)
        }
      );

      const data = response.data;
      this.setToken(data.jwt); // Store the JWT token in localStorage
      return this.getUserFromToken(); // Return the user information from the token
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  // Store the JWT token in localStorage
  setToken = (token) => {
    localStorage.setItem(this.tokenKey, token);
  };

  // Retrieve the JWT token from localStorage
  getToken = () => {
    return localStorage.getItem(this.tokenKey);
  };

  // Remove the JWT token from localStorage (logout)
  removeToken = () => {
    localStorage.removeItem(this.tokenKey);
  };

  // Decode the JWT token and extract user information
  getUserFromToken = () => {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      return {
        username: decodedToken.sub, // Extract username from token
        permissions: decodedToken["com.ehi.abac-perm.app1.com"], // Example: Extract permissions
        profilePicture: "/path/to/profile.jpg", // Placeholder for profile picture (you can change this)
      };
    }
    return null;
  };

  // Check if the user is logged in (based on the presence of a valid token)
  isLoggedIn = () => {
    const token = this.getToken();
    return !!token; // Return true if the token exists
  };
}

const authService = new AuthService();
export default authService;
