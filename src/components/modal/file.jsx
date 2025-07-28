import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../Assets/Image/close.svg";
import Button from "../common/button/button";
import { useNavigate } from "react-router-dom";
import { post } from "../context/api";
import { baseUrl } from "../context/baseUrl";
import SuccessModal from "../modalMsg/successModal";
import ErrorMsg from "../modalMsg/errorMsg";

const SubmitModal = ({ closeModal, projectId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    links: [""],
    presentationFile: null,
    document: null,
    codeFile: null,
  });
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1]; // Extract base64 string
        setFormData((prev) => ({
          ...prev,
          [name]: base64,
        }));
      };
      if (file) reader.readAsDataURL(file);
    } else if (name === "links") {
      setFormData((prev) => ({
        ...prev,
        links: [value], // store single link as array
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      projectId, // Ensure projectId is included
    };

    try {
      await post(`${baseUrl}/submit`, payload);
      setSuccessModal(true);
      setLoading(false);
    } catch (err) {
      console.error("Submission failed", err);
      setErrorModal(true);
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          src={closeIcon}
          alt="close"
          className={styles.closeIcon}
          onClick={closeModal}
        />
        <h2 className={styles.heading}>Submit Files</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Project Link</label>
          <input
            type="text"
            name="links"
            placeholder="https://example.com"
            value={formData.links[0] || ""}
            onChange={handleChange}
            className={styles.input}
          />

          <label>Presentation File (PDF)</label>
          <input
            type="file"
            name="presentationFile"
            accept=".pdf"
            onChange={handleChange}
            className={styles.input}
          />

          <label>Document (PDF)</label>
          <input
            type="file"
            name="document"
            accept=".pdf"
            onChange={handleChange}
            className={styles.input}
          />

          <label>Code File (ZIP, RAR, etc)</label>
          <input
            type="file"
            name="codeFile"
            onChange={handleChange}
            className={styles.input}
          />

          <Button
            title={loading ? "Submitting..." : "Submit"}
            type="submit"
            disabled={loading}
          />
        </form>
      </div>

      {successModal && <SuccessModal message="Submission Successful!" onClose={() => { setSuccessModal(false); closeModal(); }} />}
      {errorModal && <ErrorMsg message="Submission Failed. Try again." onClose={() => setErrorModal(false)} />}
    </div>
  );
};

export default SubmitModal;
