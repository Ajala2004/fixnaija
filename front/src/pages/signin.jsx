import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./hero.css"; // Optional custom styles if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/signin",
        { email, password },
        { withCredentials: true }
      );

      const { message, redirectTo } = response.data;

      toast.success(message);

      navigate(redirectTo || "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mb-1">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </p>
          <p>
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-primary text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;