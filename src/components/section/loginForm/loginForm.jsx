"use client";
import React, { useState, useEffect } from "react";
import styles from "./loginForm.module.css";
import Button from "../../common/button/button";
import ErrorMsg from "../../common/errorMsg/errorMsg";
import { post } from "../../context/api";
import { baseUrl } from "../../context/baseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterModal from "../registerModal/registerModal";
import ProjectDetailsModal from "../../modal/projectDetailsModal";

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // only used for manual login
  const [errorMsg, setErrorMsg] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(true);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract project details from query string
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectData = {
      email: params.get("email"),
      // uid: params.get("uid"),
      role: params.get("role"),
      firstName: params.get("first_name"),
      lastName: params.get("last_name"),
      gender: params.get("gender"),
    };

    if (projectData.email && projectData.role) {
      setProject(projectData);
      setEmail(projectData.email);

      // Auto-login if project link contains credentials
      handleAutoLogin(projectData);
    }
  }, [location.search]);

  // Auto-login function
  const handleAutoLogin = async (projectData) => {
    try {
      setLoading(true);

      const response = await post(`${baseUrl}Authentications/ProjectLogin`, {
        email: projectData.email,
        role: projectData.role,
      });

      const userData = response.user || response;

      // Save data
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token || "");
      localStorage.setItem("role", userData.roles || projectData.role);

      if (projectData) {
        localStorage.setItem("selectedProject", JSON.stringify(projectData));
      }

      // Redirect
      const routeMap = {
        admin: "/admin",
        student: "/student",
        lecturer: "/lecturer",
      };
      const target = routeMap[userData.roles || projectData.role] || "/login";
      navigate(target, { state: { project: projectData } });
    } catch (err) {
      setLoading(false);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Auto login failed. Please try manual login.";
      setErrorMsg(message);
    }
  };

  // Manual login (fallback)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await post(`${baseUrl}Authentications/UserLogin`, {
        email,
        password,
        role,
      });

      const userData = response.user || response;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token || "");
      localStorage.setItem("role", userData.roles || role);

      if (project) {
        localStorage.setItem("selectedProject", JSON.stringify(project));
      }

      const routeMap = {
        admin: "/admin",
        student: "/student",
        lecturer: "/lecturer",
      };

      const target = routeMap[userData.roles || role] || "/login";
      navigate(target, { state: { project } });
    } catch (err) {
      setLoading(false);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setErrorMsg(message);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginBanner}>
        <h1>Welcome back</h1>
        <p>Please enter your details or wait for auto-login...</p>
      </div>

      {loading ? (
        <p>Loading... Signing you in automatically...</p>
      ) : (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formLabel}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formLabel}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.termPwd}>
              <span className={styles.forgotPwd}>Forgot Password?</span>
            </div>

            <div className={styles.btn}>
              <Button title="Sign in" className="btnLarge" type="submit" />
              <div className={styles.divider}>
                <span className={styles.line}></span>
                <span className={styles.dividerText}>or</span>
                <span className={styles.line}></span>
              </div>
              {errorMsg && <ErrorMsg message={errorMsg} />}
              <Button
                title="Continue with Google"
                className="btnPrimary"
                type="button"
              />
              <Button
                title="Continue with SAML SSO"
                className="btnPrimary"
                type="button"
              />

              {role !== "admin" && (
                <div className={styles.registerLink}>
                  <p onClick={() => setShowRegisterModal(true)}>
                    New User? Register Now
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          initialRole={role}
        />
      )}

      {showProjectModal && project && (
        <ProjectDetailsModal
          project={project}
          onClose={() => setShowProjectModal(false)}
        />
      )}
    </div>
  );
};

export default LoginForm;
