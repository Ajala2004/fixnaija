import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import statesAndLGAs from "../datas/statesAndLGAs.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProviderSignup = () => {
  const [state, setState] = useState("");
  const [lgas, setLGAs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    surname: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    lga: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  useEffect(() => {
    if (state) {
      setLGAs(statesAndLGAs[state]);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate terms and conditions agreement
    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      // Make the POST request to register the user
      const response = await axios.post("/api/signup", {
        surname: formData.surname,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        state: formData.state,
        lga: formData.lga,
        homeAddress: formData.homeAddress,
        password: formData.password,
      });

      // On success, show success message and reset form
      toast.success(response.data.message || "Registration successful");
      setFormData({
        surname: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        lga: "",
        homeAddress: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });
      setState("");
    } catch (error) {
      // Handle errors (e.g., user already exists)
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4 text-center text-primary fw-bold">
        Register as a Service Provider
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Surname, Last Name */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              className="form-control"
              onChange={handleChange}
              value={formData.surname}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={handleChange}
              value={formData.lastName}
              required
            />
          </div>
        </div>

        {/* State & LGA */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>State</label>
            <select
              name="state"
              className="form-select"
              onChange={(e) => {
                handleChange(e);
                setState(e.target.value);
              }}
              value={formData.state}
              required
            >
              <option value="">Select State</option>
              {Object.keys(statesAndLGAs).map((stateName) => (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>LGA</label>
            <select
              name="lga"
              className="form-select"
              onChange={handleChange}
              value={formData.lga}
              disabled={!lgas.length}
              required
            >
              <option value="">Select LGA</option>
              {lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Home Address */}
        <div className="mb-3">
          <label>Home Address</label>
          <input
            type="text"
            name="homeAddress"
            className="form-control"
            onChange={handleChange}
            value={formData.homeAddress}
            required
          />
        </div>

        {/* Email and Phone */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="col-md-6">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label>Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
            <span
              className="input-group-text"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{ cursor: "pointer" }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">
            I agree to all terms and conditions of the organization
          </label>
        </div>

        {/* Submit Button */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProviderSignup;