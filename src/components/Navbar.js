import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/icon-deal.png";

const Navbar = () => {
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const navigate = useNavigate(); // Used for navigation after logout

    useEffect(() => {
        // Listen for storage changes (when another tab logs in/out)
        const handleStorageChange = () => {
            setUserName(localStorage.getItem("userName") || "");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName"); // Clear login data
        setUserName(""); // Reset state
        navigate("/"); // Redirect to home after logout
    };

    const handleRestrictedClick = (event) => {
        if (!userName) {
            event.preventDefault(); // Stop navigation
            alert("Kindly login to explore!");
        }
    };

    return (
        <nav>
            <div className="container-fluid nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                    <Link to="/" className="navbar-brand d-flex align-items-center text-center">
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src={logo} alt="Icon" style={{ width: "30px", height: "30px" }} />
                        </div>
                        <h1 className="m-0 text-primary">HomyGo</h1>
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <Link to="/" className="nav-item nav-link active">Home</Link>
                            <Link to="/about" className="nav-item nav-link">About</Link>

                            {/* Property Dropdown */}
                            <div className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Property</Link>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/properties" className="dropdown-item">Property List</Link>

                                    {/* ✅ Show alert if not logged in */}
                                    
                                    <Link to="/properties-type" className="dropdown-item">Property Type</Link>

                                    <Link to="/properties-agent" className="dropdown-item">Property Agent</Link>
                                </div>
                            </div>

                            {/* Pages Dropdown */}
                            <div className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                                </div>
                            </div>

                            <Link to="/contact" className="nav-item nav-link">Contact</Link>
                        </div>

                        {/* Right-side buttons */}
                        <div className="d-flex align-items-center">
                            {/* ✅ Only show "Add Property" if the user is logged in */}
                            {userName && (
                                <Link to="/form" className="btn btn-primary px-3 d-none d-lg-flex">
                                    Add Property
                                </Link>
                            )}

                            {userName ? (
                                <div className="nav-item dropdown ms-3">
                                    <button className="nav-link dropdown-toggle btn btn-outline-primary" data-bs-toggle="dropdown">
                                        {userName} {/* Show user's name */}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* ✅ Only show Dashboard if user is Admin */}
                                        {userName === "Admin" && (
                                            <Link to="/Admin" className="dropdown-item">Dashboard</Link>
                                        )}
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="btn btn-success ms-3">Login</Link>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
