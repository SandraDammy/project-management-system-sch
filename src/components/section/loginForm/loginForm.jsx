import React, { useState } from "react";
import styles from "./loginForm.module.css";
import Button from "../../common/button/button";
import ErrorMsg from "../../common/errorMsg/errorMsg";
import { post } from "../../context/api";
import { baseUrl } from "../../context/baseUrl";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../registerModal/registerModal";

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    try {
      const response = await post(`${baseUrl}Authentications/UserLogin`, {
        email,
        password,
        role, // pass role if backend needs it
      });

      const userData = response.user || response;

      // Save necessary data
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token || "");
      localStorage.setItem("role", userData.roles || role);

      // Redirect based on role
      const routeMap = {
        admin: "/admin",
        student: "/student",
        lecturer: "/lecturer",
      };

      const target = routeMap[userData.roles || role] || "/login";
      navigate(target);
    } catch (err) {
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
        <h1>Welcome back, Yash</h1>
        <p>Welcome back! Please enter your details.</p>
      </div>

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

            {/* user with the role of admin should not see the register link */}
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
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
};

export default LoginForm;
