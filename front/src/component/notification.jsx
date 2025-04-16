import React from "react";
import { FaBell } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Notifications = () => {
  // Dummy notification data
  const notifications = [
    {
      id: 1,
      title: "New Request",
      message: "You have received a new service request from John Doe.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Verification Approved",
      message: "Your profile verification has been successfully approved.",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "You have received a payment for your service.",
      time: "3 days ago",
    },
    {
      id: 4,
      title: "Reminder",
      message: "Complete your pending profile information to attract more clients.",
      time: "5 days ago",
    },
  ];

  return (
    <div className="container mt-5 pt-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Notifications</h3>
        <FaBell size={30} color="blue" />
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="list-group">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="list-group-item list-group-item-action mb-2 shadow-sm rounded"
            >
              <h5 className="mb-1 fw-semibold">{notification.title}</h5>
              <p className="mb-1 text-muted">{notification.message}</p>
              <small className="text-secondary">{notification.time}</small>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">No new notifications yet!</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;