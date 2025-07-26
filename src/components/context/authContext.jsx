import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "./api";
import ErrorMsg from "../common/errorMsg/errorMsg";
import { baseUrl } from "./baseUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const handleError = (message) => {
    setError(message);
    setShowErrorModal(true);
  };

  const login = async (credentials) => {
    try {
      const result = await post(
        `${baseUrl}Authentications/UserLogin`,
        credentials
      );

      const userData = result.user;
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(userData.token));
      localStorage.setItem("id", JSON.stringify(userData.id));
      localStorage.setItem("role", JSON.stringify(userData.roles));
      localStorage.setItem("departmentId", JSON.stringify(userData.departmentId));
      localStorage.setItem("facultyId", JSON.stringify(userData.facultyId));

      const routeMap = {
        admin: "/admin",
        student: "/student",
        staff: "/staff",
      };

      navigate(routeMap[userData.roles] || "/login");
    } catch (error) {
      handleError(
        error.response?.data?.message ||
          "Login failed. Please check your internet connection and try again."
      );
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      {showErrorModal && (
        <ErrorMsg message={error} onClose={() => setShowErrorModal(false)} />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
