import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertiesData from "../assets/data/properties.json";
import property1 from "../assets/img/property-1.jpg";
import property2 from "../assets/img/property-2.jpg";
import property3 from "../assets/img/property-3.jpg";
import property4 from "../assets/img/property-4.jpg";

// Map image names to imported images
const imageMap = {
  "property-1": property1,
  "property-2": property2,
  "property-3": property3,
  "property-4": property4,
};

const PropertiesPage = () => {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();

  // Handle "Browse More Property" button click
  const handleBrowseMore = () => {
    if (userName) {
      navigate("/properties-type"); // ✅ Redirect if logged in
    } else {
      alert("Kindly login to continue!"); // ✅ Show alert if not logged in
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-0 gx-5 align-items-end">
          <div className="col-lg-6">
            <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
              <h1 className="mb-3">Property Listing</h1>
              <p>Eirmod sed ipsum dolor sit rebum labore magna erat.</p>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {propertiesData.tabs.map((tab, index) => (
            <div id={tab.id} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} key={tab.id}>
              <div className="row g-4">
                {tab.properties.map((property) => (
                  <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={property.id}>
                    <div className="property-item rounded overflow-hidden">
                      <div className="position-relative overflow-hidden">
                        <a href="#">
                          <img
                            className="img-fluid"
                            src={imageMap[property.image] || "https://via.placeholder.com/300"}
                            alt={property.title}
                          />
                        </a>
                        <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                          {property.type}
                        </div>
                        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                          {property.category}
                        </div>
                      </div>
                      <div className="p-4 pb-0">
                        <h5 className="text-primary mb-3">{property.price}</h5>
                        <a className="d-block h5 mb-2" href="#">{property.title}</a>
                        <p>
                          <i className="fa fa-map-marker-alt text-primary me-2"></i>
                          {property.location}
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-ruler-combined text-primary me-2"></i>
                          {property.size}
                        </small>
                        <small className="flex-fill text-center border-end py-2">
                          <i className="fa fa-bed text-primary me-2"></i>
                          {property.bedrooms} Bed
                        </small>
                        <small className="flex-fill text-center py-2">
                          <i className="fa fa-bath text-primary me-2"></i>
                          {property.bathrooms} Bath
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
                {/* ✅ "Browse More Property" Button */}
                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                  <button className="btn btn-primary py-3 px-5" onClick={handleBrowseMore}>
                    Browse More Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
