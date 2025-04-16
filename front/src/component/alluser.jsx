import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./alluser.css";

// Initialize React Toast
// toast.configure();

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/allusers", { withCredentials: true });
        if (response.data.sucess) {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch users.");
          toast.error("Failed to fetch users.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
        toast.error(err.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const response = await axios.post(
        `/api/approve-user/${userId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("User approved successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, approved: true } : user
          )
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error approving user.");
    }
  };

  const handleUnapprove = async (userId) => {
    try {
      const response = await axios.post(
        `/api/unapprove-user/${userId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("User unapproved successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, approved: false } : user
          )
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error unapproving user.");
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="all-users-container">
      <h1>All Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Surname</th>
              <th>Last Name</th>
              <th>State</th>
              <th>LGA</th>
              <th>Home Address</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>CAC Name</th>
              <th>CAC Number</th>
              <th>Profile Picture</th>
              <th>Driving License</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.surname || "N/A"}</td>
                <td>{user.lastName || "N/A"}</td>
                <td>{user.state || "N/A"}</td>
                <td>{user.lga || "N/A"}</td>
                <td>{user.homeAddress || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>{user.cacRegistrationName || "N/A"}</td>
                <td>{user.cacRegistrationNumber || "N/A"}</td>
                <td>
                  {user.profilePictureUrl ? (
                    <img
                      src={user.profilePictureUrl}
                      alt="Profile"
                      className="profile-pic"
                      onClick={() => openImageModal(user.profilePictureUrl)}
                    />
                  ) : (
                    "No Picture"
                  )}
                </td>
                <td>
                  {user.drivingLicenseUrl ? (
                    <img
                      src={user.drivingLicenseUrl}
                      alt="Driving License"
                      className="profile-pic"
                      onClick={() => openImageModal(user.drivingLicenseUrl)}
                    />
                  ) : (
                    "No License"
                  )}
                </td>
                <td>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(user._id)}
                    disabled={user.approved}
                  >
                    {user.approved ? "Approved" : "Approve"}
                  </button>
                  <button
                    className="unapprove-button"
                    onClick={() => handleUnapprove(user._id)}
                    disabled={!user.approved}
                  >
                    {user.approved ? "Unapprove" : "Unapproved"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content">
            <img src={selectedImage} alt="Enlarged View" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;