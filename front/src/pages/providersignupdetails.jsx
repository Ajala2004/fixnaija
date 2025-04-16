import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [cacRegistrationName, setCacRegistrationName] = useState("");
  const [cacRegistrationNumber, setCacRegistrationNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [aboutMe, setAboutMe] = useState(""); // Added state for 'aboutMe'
  const [skill, setskill] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !cacRegistrationName ||
      !cacRegistrationNumber ||
      !profilePicture ||
      !drivingLicense ||
      !aboutMe|| // Check if 'aboutMe' is filled
      !skill
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      // Prepare form-data
      const formData = new FormData();
      formData.append("cacName", cacRegistrationName);
      formData.append("cacNumber", cacRegistrationNumber);
      formData.append("profilePicture", profilePicture);
      formData.append("drivingLicense", drivingLicense);
      formData.append("aboutMe", aboutMe); // Append 'aboutMe' to form data
      formData.append("skill", skill);
      // Send POST request to backend
      const response = await axios.post(
        "/api/completeProfile", // Adjust endpoint based on your setup
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );

      // Show success message and redirect
      toast.success(response.data.message || "Profile completed successfully.");
      navigate("/dashboard"); // Redirect to the dashboard or another page
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to complete profile. Try again later."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cacRegistrationName" className="form-label">
            CAC Registration Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cacRegistrationName"
            value={cacRegistrationName}
            onChange={(e) => setCacRegistrationName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cacRegistrationNumber" className="form-label">
            CAC Registration Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cacRegistrationNumber"
            value={cacRegistrationNumber}
            onChange={(e) => setCacRegistrationNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cacRegistrationName" className="form-label">
            Skill
          </label>
          <input
            type="text"
            className="form-control"
            id="skill"
            value={skill}
            onChange={(e) => setskill(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="aboutMe" className="form-label">
            About Me
          </label>
          <textarea
            className="form-control"
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)} // Update 'aboutMe' value
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="drivingLicense" className="form-label">
            Driving License
          </label>
          <input
            type="file"
            className="form-control"
            id="drivingLicense"
            onChange={(e) => setDrivingLicense(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;