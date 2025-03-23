import React, { useState } from "react";
import img from "../assets/img/about.jpg";
import TestimonialSection from "./TestimonialSection";


const AboutPage = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="about-img position-relative overflow-hidden p-5 pe-0">
              <img className="img-fluid w-100" src={img} alt="About Project" />
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">#1 Place To Find The Perfect Property</h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum
              et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
            <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
            <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
            
            {/* Read More Button */}
            <button 
              className="btn btn-primary py-3 px-5 mt-3" 
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Read More"}
            </button>

            {/* Additional Details */}
            {showMore && (
              <div className="mt-4">
                <h3 className="text-primary">About Our Project</h3>
                <p>
                  Our real estate platform is designed to help you find the perfect property with ease. We offer a wide 
                  range of listings, including apartments, villas, and commercial spaces, tailored to your needs. With a 
                  user-friendly interface and a team of experienced professionals, we ensure a seamless property search 
                  experience.
                </p>
                <p>
                  Whether you're looking to buy, rent, or invest, our platform provides the latest market insights, 
                  verified listings, and expert guidance to make informed decisions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
