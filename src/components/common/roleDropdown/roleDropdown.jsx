// RoleDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./roleDropdown.module.css";
import { useNavigate } from "react-router-dom";

const RoleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Login");
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Student", value: "student" },
    { label: "Staff", value: "staff" },
  ];

  const handleSelect = (role) => {
    setSelectedLabel(role.label);
    setIsOpen(false);
    navigate("/login", { state: { role: role.value } });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.dropdown_label}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
      </div>
      {isOpen && (
        <div className={styles.dropdown_content}>
          {roles.map((role) => (
            <div
              key={role.value}
              className={styles.dropdown_item}
              onClick={() => handleSelect(role)}
            >
              {role.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
