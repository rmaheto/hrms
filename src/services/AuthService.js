import axios from "axios";
import {jwtDecode} from "jwt-decode";

class AuthService {
  constructor() {
    this.tokenKey = "token";
    this.apiUrl = "http://localhost:8080/api"; // Base API URL
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
            withCredentials: true,
          }
      );

      const data = response.data;
      this.setToken(data.jwt);
      return this.getUserFromToken();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  setToken = (token) => {
    localStorage.setItem(this.tokenKey, token);
  };

  getToken = () => {
    return localStorage.getItem(this.tokenKey);
  };

  removeToken = () => {
    localStorage.removeItem(this.tokenKey);
  };

  getUserFromToken = () => {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return {
        username: decodedToken.sub,
        permissions: decodedToken["com.ehi.abac-perm.app1.com"],
        profilePicture: "/path/to/profile.jpg",
      };
    }
    return null;
  };

  logout = () => {
    localStorage.removeItem("token");
  };

  getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  }

  isLoggedIn = () => {
    const token = this.getToken();
    return !!token;
  };
}

const authService = new AuthService();
export default authService;
