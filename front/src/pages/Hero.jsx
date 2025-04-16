import React from 'react';
import { BrowserRouter, Routes, Route,Link} from 'react-router-dom'

const Hero = () => {
  return (
    <>
      

      {/* Hero Section */}
      <section
        className="d-flex align-items-center text-center"
        style={{
          backgroundColor: '#f8f9fa',
          minHeight: '90vh',
          padding: '2rem 0',
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#0d6efd' }}>
            Welcome to FixNaija
          </h1>
          <p className="lead mb-4" style={{ color: '#555' }}>
            Connecting you with trusted and verified professionals for all your
            service needs. Find reliable plumbers, electricians, tutors, and
            more in just a few clicks.
          </p>
          <div>
            <Link
              to={"/signup"}
              className="btn btn-primary btn-lg me-3"
              style={{ borderRadius: '5px' }}
            >
              Register as a Service Provider
            </Link>
            <Link
               to={"/findservice"}
              className="btn btn-outline-primary btn-lg"
              style={{ borderRadius: '5px' }}
            >
              Find a Service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;