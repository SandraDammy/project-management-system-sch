import React, { useState } from "react";
import Button from "../../common/button/button";
import styles from "./createAdmin.module.css";
import { baseUrl } from "../../context/baseUrl";
import { post } from "../../context/api";
import SuccessModal from "../../modalMsg/successModal";
import closeIcon from "../../../Assets/Image/close.svg";

const CreateAdmin = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let newErrors = {};

    if (!title) newErrors.title = "Title is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    // Password strength validation
    if (password) {
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 6;

      if (
        !hasUpper ||
        !hasLower ||
        !hasNumber ||
        !hasSpecial ||
        !isLongEnough
      ) {
        newErrors.password =
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.";
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      setIsLoading(false);
      return;
    }

    const mainData = {
      Title: title,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Role: "admin",
      Password: password,
      Department: "department",
      Faculty: "faculty",
      MatricNoOrStaffId: "matricNoOrStaffId",
    };

    try {
      const response = await post(
        `${baseUrl}Authentications/CreateUser`,
        mainData
      );
      console.log("Response:", response.data);
      setShowSuccessModal(true);
      setTitle("");
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBody}>
        <div className={styles.close} onClick={onClose}>
          <img src={closeIcon} alt="Close Icon" width="32" height="32" />
        </div>
        <div className={styles.modalContainer}>
          <h2>Create Admin</h2>
          <form className={styles.body} onSubmit={handleSubmit}>
            <div className={styles.details}>
              <div className={styles.section}>
                <SelectField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  options={["Mr", "Mrs", "Miss"]}
                  error={errors.title}
                />
                <InputEmail
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
              </div>

              <div className={styles.section}>
                <InputField
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                />
                <InputPwd
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
              </div>

              <div className={styles.section}>
                <InputField
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={errors.lastName}
                />
                <InputPwd
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                />
              </div>
            </div>

            <div className={styles.btn}>
              <Button
                title={isLoading ? "Creating..." : "Create Account"}
                className="createLarge"
                disabled={isLoading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Admin created successfully"
          btnTitle="Done"
          btnOnclick={() => window.location.reload()}
        />
      )}
    </div>
  );
};

// Reusable text input field
const InputField = ({ placeholder, value, onChange, error }) => (
  <div className={styles.titleText}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Reusable password input field
const InputEmail = ({ placeholder, value, onChange, error }) => (
  <div className={styles.titleTexts}>
    <input
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

const InputPwd = ({ placeholder, value, onChange, error }) => (
  <div className={styles.titlePwd}>
    <input
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Reusable select dropdown
const SelectField = ({ label, value, onChange, options, error }) => (
  <div className={styles.titleText}>
    <select value={value} onChange={onChange}>
      <option value="">Select {label}</option>
      {options.map((opt, i) =>
        typeof opt === "string" ? (
          <option key={i} value={opt.toLowerCase()}>
            {opt}
          </option>
        ) : (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default CreateAdmin;
