import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./findservice.css";

const FindService = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // Subscription state

  const states = [
    "Borno",
    "Abuja",
    "Lagos",
    "Kano",
    "Rivers",
    "Oyo",
    "Kaduna",
    "Enugu",
    "Plateau",
  ];

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const response = await axios.get("/api/approved-users");
        if (response.data.success) {
          setProviders(response.data.data);
          setFilteredProviders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching approved users:", error.message);
        toast.error("Failed to load service providers.");
      }
    };

    fetchApprovedUsers();
  }, []);

  const handleSearch = () => {
    const filtered = providers.filter(
      (provider) =>
        provider.skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedState === "" || provider.state.toLowerCase() === selectedState.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  const handleRateMe = (provider) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  const handleSubmitRating = async () => {
    if (!email || !rating) {
      setError("Please enter your email and select a rating.");
      return;
    }

    try {
      const response = await axios.post("/api/rate", {
        providerId: selectedProvider._id,
        email,
        rating,
      });

      if (response.data.success) {
        toast.success("Thank you for your rating!");
        setShowModal(false);
        setEmail("");
        setRating(0);
        setError("");

        const updatedProviders = providers.map((provider) =>
          provider._id === selectedProvider._id
            ? { ...provider, rating: response.data.updatedRating }
            : provider
        );
        setProviders(updatedProviders);
        setFilteredProviders(updatedProviders);
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Unable to submit your rating. Try again later."
      );
      toast.error("Failed to submit your rating.");
    }
  };

  const handleSubscribe = () => {
    // Implement your subscription logic here (e.g., redirect to a payment gateway)
    setIsSubscribed(true); // For demo purposes, assume the user is subscribed
    toast.success("You are now subscribed!");
  };

  return (
    <div className="find-service-container container mt-5 pt-5">
      <ToastContainer />

      <div className="row mb-4 align-items-center">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a service (e.g., plumber, electrician)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Filter by State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div key={provider._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 provider-card">
                <img
                  src={provider.profilePictureUrl}
                  alt={`${provider.lastName} ${provider.surname}`}
                  className="card-img-top"
                  style={{
                    objectFit: "cover",
                    height: "200px",
                    objectPosition: "center",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title stylish-text">{provider.skill}</h5>
                  <p className="card-text">
                    <strong>Rating:</strong>{" "}
                    {provider.rating || "Not rated yet"}{" "}
                    <FaStar color="#FFD700" />
                  </p>
                  {isSubscribed ? (
                    <Link
                      to={`/provider/${provider._id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      See More
                    </Link>
                  ) : (
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={handleSubscribe}
                    >
                      Subscribe to View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No service providers found.</p>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rate {selectedProvider?.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label>Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((rate) => (
                <FaStar
                  key={rate}
                  size={24}
                  className={`star ${rating === rate ? "selected" : ""}`}
                  onClick={() => setRating(rate)}
                  color={rating >= rate ? "#FFD700" : "#CCCCCC"}
                />
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitRating}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FindService;