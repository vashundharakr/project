import { useEffect, useState } from "react";

const API_URL = "http://localhost:5074/api/ShopProperties";

const ShopListingsPage = () => {
  const [shops, setShops] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFootTraffic, setSelectedFootTraffic] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setShops(data || []);
      })
      .catch((error) => {
        console.error("Error fetching shops:", error);
        setShops([]);
      });
  }, []);

  // Extract unique filter values
  const allLocations = [...new Set(shops.map((shop) => shop.location || ""))];
  const allTransactions = ["Rent", "Lease", "Sell"];
  const allPrices = shops.map((shop) => shop.price).filter((price) => price !== undefined);
  const minAvailablePrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxAvailablePrice = allPrices.length ? Math.max(...allPrices) : 0;

  useEffect(() => {
    setPriceRange({ min: minAvailablePrice, max: maxAvailablePrice });
  }, [minAvailablePrice, maxAvailablePrice]);

  // Filter shops based on selections
  const filteredShops = shops.filter((shop) => {
    const matchesLocation = selectedLocation ? shop.location === selectedLocation : true;
    const matchesTransaction = selectedTransaction ? shop.transactionType === selectedTransaction : true;
    const matchesPrice = shop.price >= priceRange.min && shop.price <= priceRange.max;

    return matchesLocation && matchesTransaction && matchesPrice;
  });

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">Shop Listings</h1>
          <p>Find the perfect shop property for your business.</p>
        </div>

        {/* Filters Section */}
        <div className="row mb-4 bg-light p-3 rounded">
          {/* Location Filter */}
          <div className="col-md-3">
            <label className="form-label fw-bold">Location</label>
            <select className="form-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Transaction Type Filter */}
          <div className="col-md-3">
            <label className="form-label fw-bold">Transaction Type</label>
            <select className="form-select" value={selectedTransaction} onChange={(e) => setSelectedTransaction(e.target.value)}>
              <option value="">All Types</option>
              {allTransactions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="col-md-6">
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

        {/* Shop Listings */}
        <div className="row g-4">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={shop.id}>
                <div className="property-item rounded overflow-hidden w-100 d-flex flex-column">
                  <div className="position-relative overflow-hidden">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src={shop.propertyImage && shop.propertyImage.trim() ? shop.propertyImage : "https://via.placeholder.com/300"}
                        alt={shop.address}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    </a>
                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                      {shop.transactionType}
                    </div>
                  </div>
                  <div className="p-4 pb-0 flex-grow-1">
                    <h5 className="text-primary mb-3">₹{shop.price?.toLocaleString()}</h5>
                    <a className="d-block h5 mb-2" href="#">
                      {shop.address}
                    </a>
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {shop.location}
                    </p>
                    <p>
                      <i className="fa fa-expand text-primary me-2"></i>
                      {shop.size} Sq Ft
                    </p>
                    <p>
                      <i className="fa fa-users text-primary me-2"></i>
                      {shop.footTraffic} Foot Traffic
                    </p>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-align-left text-primary me-2"></i>
                      {shop.description}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No shops available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopListingsPage;
