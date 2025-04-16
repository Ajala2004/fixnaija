import React from 'react'
import "./nav.css"
import { BrowserRouter, Routes, Route,Link} from 'react-router-dom'
function nav() {
    return (
        <div >
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">
                        FixNaija
          </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                
                                   <Link to={"/"} className="nav-link"> Home</Link>
               
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link" href="#">
                                    About
                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link" href="#">
                                    Contact
                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link" href="#">
                                    Login
                </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default nav
