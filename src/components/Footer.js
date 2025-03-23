import React, { useState } from "react";
import property1 from '../assets/img/property-1.jpg';
import property2 from '../assets/img/property-2.jpg';
import property3 from '../assets/img/property-3.jpg';
import property4 from '../assets/img/property-4.jpg';
import property5 from '../assets/img/property-5.jpg';
import property6 from '../assets/img/property-6.jpg';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import ChatbotComponent from "../Pages/Chatbot";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Footer = () => {
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Get In Touch</h5>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="#"><FaTwitter size={25} /></a>
                            <a className="btn btn-outline-light btn-social" href="#"><FaFacebook size={25} /></a>
                            <a className="btn btn-outline-light btn-social" href="#"><FaYoutube size={25} /></a>
                            <a className="btn btn-outline-light btn-social" href="#"><FaLinkedin size={25} /></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Quick Links</h5>
                        <a className="btn btn-link text-white-50" href="#">About Us</a>
                        <a className="btn btn-link text-white-50" href="#">Contact Us</a>
                        <a className="btn btn-link text-white-50" href="#">Our Services</a>
                        <a className="btn btn-link text-white-50" href="#">Privacy Policy</a>
                        <a className="btn btn-link text-white-50" href="#">Terms & Condition</a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Photo Gallery</h5>
                        <div className="row g-2 pt-2">
                            {[property1, property2, property3, property4, property5, property6].map((image, index) => (
                                <div className="col-4" key={index}>
                                    <img className="img-fluid rounded bg-light p-1" src={image} alt={`Property ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Newsletter</h5>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    </div>
                </div>
            </div>

            <button
                className="btn btn-primary bg-secondary position-fixed bottom-0 end-0 m-4 floating-chat-btn"
                onClick={() => setShowChat(!showChat)}
            >
                {/* {showChat ? "Close Chat" : "Chat with us"} */}
                <IoChatbubbleEllipsesOutline size={30} />
            </button>

            {/* Chatbot Component */}
            <ChatbotComponent show={showChat} onClose={() => setShowChat(false)} />

            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Rights Reserved.
                            Designed By <a className="border-bottom" href="#">Your Site Name</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a href="#">Home</a>
                                <a href="#">Cookies</a>
                                <a href="#">Help</a>
                                <a href="#">FAQs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
