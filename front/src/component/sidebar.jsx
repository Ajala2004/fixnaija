import React from "react";
import { FaUser, FaBell, FaComments } from "react-icons/fa";
 // Optional: You can keep Sidebar-specific styles here

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => setActiveSection("profile")}>
          <FaUser className="icon" />
          <span>Profile</span>
        </li>
        {/* <li
          className="sidebar-item"
          onClick={() => setActiveSection("notifications")}
        >
          <FaBell className="icon" />
          <span>Notifications</span>
        </li> */}
        {/* <li className="sidebar-item" onClick={() => setActiveSection("chat")}>
          <FaComments className="icon" />
          <span>Chat</span>
        </li> */}
        <li className="sidebar-item" onClick={() => setActiveSection("alluser")}>
          <FaUser className="icon" />
          <span>alluser</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;