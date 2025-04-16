import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sendemail", formData); 

      if (response.data.success) { 
        toast.success(response.data.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <ToastContainer />
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted">
            Have questions? Reach out to us, and we'll respond as soon as possible!
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Subject */}
              <div className="mb-3">
                <label htmlFor="subject" className="form-label fw-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-control"
                  placeholder="Enter the subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label htmlFor="message" className="form-label fw-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;