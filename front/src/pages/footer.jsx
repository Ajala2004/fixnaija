import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About FixNaija</h5>
            <p>
              FixNaija is your go-to platform for finding verified professionals across Nigeria.
              We ensure trust, safety, and quality service delivery for all your daily needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-white text-decoration-none">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="#register" className="text-white text-decoration-none">
                  Register as Provider
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@fixnaija.com</li>
              <li>Phone: +234 704  101 3001</li>
              <li>Address: Gombe, Nigeria</li>
            </ul>
            {/* Social Media */}
            <div className="mt-3">
              <a
                href="https://facebook.com"
                className="text-white me-3 fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                className="text-white me-3 fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="text-white me-3 fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white fs-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} FixNaija. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;