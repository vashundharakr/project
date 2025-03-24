import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Apartments";

const ApartmentListingsPage = () => {
  const [apartments, setApartments] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setApartments(data || []);
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
        setApartments([]);
      });
  }, []);

  // Extract unique values
  const allLocations = [...new Set(apartments.map((apartment) => apartment.location || ""))];
  const allTransactions = ["Rent", "Lease", "Sell"];
  const allPrices = apartments.map((apartment) => apartment.price).filter((price) => price !== undefined);
  const minAvailablePrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxAvailablePrice = allPrices.length ? Math.max(...allPrices) : 0;

  useEffect(() => {
    setPriceRange({ min: minAvailablePrice, max: maxAvailablePrice });
  }, [minAvailablePrice, maxAvailablePrice]);

  // Filter apartments based on selections
  const filteredApartments = apartments.filter((apartment) => {
    const matchesLocation = selectedLocation ? apartment.location === selectedLocation : true;
    const matchesTransaction = selectedTransaction ? apartment.transactionType === selectedTransaction : true;
    const matchesPrice = apartment.price >= priceRange.min && apartment.price <= priceRange.max;
    return matchesLocation && matchesTransaction && matchesPrice;
  });

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">Apartment Listings</h1>
          <p>Find the perfect apartment for your needs.</p>
        </div>

        {/* Filters Section */}
        <div className="row mb-4 bg-light p-3 rounded">
          {/* Location Filter */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Location</label>
            <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Transaction Type Filter */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Transaction Type</label>
            <select className="form-select" value={selectedTransaction} onChange={(e) => setSelectedTransaction(e.target.value)}>
              <option value="">All Types</option>
              {allTransactions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Price Range: ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}</label>
            <input
              type="range"
              className="form-range"
              min={minAvailablePrice}
              max={maxAvailablePrice}
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {/* Apartment Listings */}
        <div className="row g-4">
          {filteredApartments.length > 0 ? (
            filteredApartments.map((apartment) => (
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={apartment.id}>
                <div className="property-item rounded overflow-hidden w-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src={apartment.propertyImage && apartment.propertyImage.trim() ? apartment.propertyImage : "https://via.placeholder.com/300"}
                        alt={apartment.address}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    </a>
                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                      {apartment.transactionType}
                    </div>
                  </div>
                  <div className="p-4 pb-0 flex-grow-1">
                    <h5 className="text-primary mb-3">₹{apartment.price?.toLocaleString()}</h5>
                    <a className="d-block h5 mb-2" href="#">
                      {apartment.address}
                    </a>
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {apartment.location}
                    </p>
                    <p>
                      <i className="fa fa-bed text-primary me-2"></i>
                      {apartment.bedrooms} Bedrooms
                    </p>
                    <p>
                      <i className="fa fa-bath text-primary me-2"></i>
                      {apartment.bathrooms} Bathrooms
                    </p>
                    <p>
                      <i className="fa fa-building text-primary me-2"></i>
                      Floor: {apartment.floor}
                    </p>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-align-left text-primary me-2"></i>
                      {apartment.description}
                    </small>
                    <small className="flex-fill text-center py-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/Apartment/description/${apartment.id}`)} // Navigate to the description page
                      >
                        Description
                      </button>
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No apartments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentListingsPage;
