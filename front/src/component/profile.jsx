import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./profile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/profile", { withCredentials: true });
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">Failed to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="welcome-banner text-center p-4 mb-4">
        <h1 className="text-light">Welcome, {userData.lastName || "User"}!</h1>
        <p className="text-light fs-5">Here's your profile overview.</p>
      </div>
      <div className="profile-card shadow-lg rounded">
        {/* <div className="profile-header text-center p-4">
          <img
            src={userData.profilePictureUrl || "/default-profile.png"}
            alt="Profile"
            className="profile-image rounded-circle"
          />
          <h2 className="mt-3">{userData.firstName} {userData.surname}</h2>
          <p className="text-muted">{userData.aboutMe || "No bio added yet."}</p>
        </div> */}
        <div className="profile-details p-4">
          <h4 className="text-teal">Personal Information</h4>
          <hr />
          <div className="row">
            <div className="col-md-6 col-12">
              <p><strong>Last Name:</strong> {userData.lastName || "N/A"}</p>
              <p><strong>Surname:</strong> {userData.surname || "N/A"}</p>
              <p><strong>Last Name:</strong> {userData.lastName || "N/A"}</p>
              <p><strong>Email:</strong> {userData.email || "N/A"}</p>
            </div>
            <div className="col-md-6 col-12">
              <p><strong>Phone Number:</strong> {userData.phoneNumber || "N/A"}</p>
              <p><strong>State:</strong> {userData.state || "N/A"}</p>
              <p><strong>LGA:</strong> {userData.lga || "N/A"}</p>
              <p><strong>Home Address:</strong> {userData.homeAddress || "N/A"}</p>
            </div>
          </div>
          <h4 className="text-teal mt-4">Documents</h4>
          <hr />
          <div className="row">
            <div className="col-md-6 col-12 text-center mb-3">
              <h5>Driving License</h5>
              {userData.drivingLicenseUrl ? (
                <img
                  src={userData.drivingLicenseUrl}
                  alt="Driving License"
                  className="document-image"
                />
              ) : (
                <p>No Driving License Uploaded</p>
              )}
            </div>
            <div className="col-md-6 col-12 text-center mb-3">
              <h5>Profile Picture</h5>
              {userData.profilePictureUrl ? (
                <img
                  src={userData.profilePictureUrl}
                  alt="Profile"
                  className="document-image"
                />
              ) : (
                <p>No Profile Picture Uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;