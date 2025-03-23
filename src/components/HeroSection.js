import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from "react-router-dom";

import img1 from "../assets/img/carousel-1.jpg";
import img2 from "../assets/img/carousel-2.jpg";
import img3 from "../assets/img/property-3.jpg"; // Add more images as needed

const HeroSection = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <div className="container-fluid header bg-white p-0">
            <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                <div className="col-md-6 p-5 mt-lg-5">
                    <h1 className="display-5 animated fadeIn mb-4">
                        Find A <span className="text-primary">Perfect Home</span> To Live With Your Family
                    </h1>
                    <p className="animated fadeIn mb-4 pb-2">
                        Discover a comfortable and cozy space where your family can grow, laugh, and create unforgettable memories. A place where warmth, comfort, and convenience come together to offer you the perfect home.
                    </p>
                    <p style={{color:"Green"}}> Kindly Login to Add Property...!</p>
                    <button className="btn btn-primary py-3 px-5 me-3 animated fadeIn" onClick={handleGetStarted}>
                        Get Started
                    </button>
                </div>
                <div className="col-md-6 animated fadeIn">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        interval={3000} // 3 seconds per slide
                        showThumbs={false}
                        showStatus={false}
                        className="carousel-container"
                    >
                        <div>
                            <img src={img1} alt="Home 1" id="carousel-image" />
                        </div>
                        <div>
                            <img src={img2} alt="Home 2" id="carousel-image" />
                        </div>
                        <div>
                            <img src={img3} alt="Home 3" id="carousel-image" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
