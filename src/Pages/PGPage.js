import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Pg";

const PGPropertiesPage = () => {
  const [pgProperties, setPgProperties] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPgProperties(data || []);

        // Get min and max rent dynamically
        if (data.length > 0) {
          const rents = data.map((pg) => pg.rent);
          setRentRange({ min: Math.min(...rents), max: Math.max(...rents) });
        }
      })
      .catch((error) => {
        console.error("Error fetching PG properties:", error);
        setPgProperties([]);
      });
  }, []);

  // Extract unique locations
  const allLocations = [...new Set(pgProperties.map((pg) => pg.location || ""))];

  // Extract unique genders
  const allGenders = ["Boys", "Girls", "Both"];

  // Filtered PG properties based on selections
  const filteredPGs = pgProperties.filter((pg) => {
    const matchesGender = selectedGender ? pg.pgFor === selectedGender : true;
    const matchesLocation = selectedLocation ? pg.location === selectedLocation : true;
    const matchesRate = pg.rent >= rentRange.min && pg.rent <= rentRange.max;
    return matchesGender && matchesLocation && matchesRate;
  });

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">PG Listings</h1>
          <p>Find the perfect PG accommodation for your needs.</p>
        </div>

        {/* Filters Section */}
        <div className="row mb-4 bg-light p-3 rounded">
          {/* Gender Filter */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Gender</label>
            <select className="form-select" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="">All</option>
              {allGenders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Location</label>
            <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Rent Price Range Slider */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Rent Range: ₹0 - ₹{rentRange.max}</label>
            <input
              type="range"
              className="form-range"
              min={Math.min(...pgProperties.map((pg) => pg.rent), 0)}
              max={Math.max(...pgProperties.map((pg) => pg.rent), 10000)}
              value={rentRange.max}
              onChange={(e) => setRentRange({ ...rentRange, max: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {/* PG Listings */}
        <div className="row g-4">
          {filteredPGs.length > 0 ? (
            filteredPGs.map((property) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={property.id}>
                <div className="property-item rounded overflow-hidden">
                  <div className="position-relative overflow-hidden">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src={property.image || "https://via.placeholder.com/300"}
                        alt={property.address}
                      />
                    </a>
                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                      {property.pgFor}
                    </div>
                  </div>
                  <div className="p-4 pb-0">
                    <h5 className="text-primary mb-3">₹{property.rent}/month</h5>
                    <a className="d-block h5 mb-2" href="#">
                      {property.address}
                    </a>
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {property.location}
                    </p>
                    <div className="mx-auto my-2">
                    {/* Description Button */}
                    <Link to={`/PG/description/${property.id}`} className="btn btn-success mx auto">
                        View Description
                      </Link>
                      </div>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-users text-primary me-2"></i>
                      {property.roomSharing} Sharing
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-bolt text-primary me-2"></i>
                      Electricity: {property.electricityCharges}
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-money-bill-wave text-primary me-2"></i>
                      ₹{property.pricePerSharing}/Sharing
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No PG properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PGPropertiesPage;
