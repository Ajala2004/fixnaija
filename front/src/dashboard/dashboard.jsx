import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../component/sidebar";
import Profile from "../component/profile";
import Notifications from "../component/Dnotification";
import Chat from "../component/chat";
import "./dashboard.css";
import AllUsers from "../component/alluser";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      setTimeout(() => navigate("/signin"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  // Dynamically render the active section
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      case "chat":
        return <Chat />;
      case "alluser":
        return <AllUsers />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {renderSection()}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;