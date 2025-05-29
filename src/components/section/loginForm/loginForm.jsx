import React, { useState } from "react";
import styles from "./loginForm.module.css";
import Button from "../../common/button/button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    console.log("Login submitted", { email, password });
    // Perform login logic here
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
