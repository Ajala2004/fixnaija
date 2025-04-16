import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutSection = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-4">About Us</h2>
            <p className="lead text-muted">
              At <strong>FixNaija</strong>, we believe finding reliable service providers
              shouldn’t feel like writing <em>JAMB twice</em>.
            </p>
            <p>
              Whether you need a plumber, electrician, or tutor, we’ve built a platform
              that connects you to verified, trusted professionals across Nigeria. 
              From full names and Nigerian IDs to customer ratings and feedback, we ensure 
              <strong>no hidden surprises</strong>—except how quickly your problems get solved.
            </p>
            <p>
              We’ve done the hard work so you don’t have to. Need help?{" "}
              <strong>FixNaija</strong> has your back.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/public/about.jpg" // Replace with your image path
              alt="About FixNaija"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;