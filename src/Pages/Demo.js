import { useEffect, useState } from "react";

const API_URL = "http://localhost:5074/api/OfficeProperty";

const OfficePropertiesPage = () => {
  const [officeProperties, setOfficeProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setOfficeProperties(data || []);

        if (data.length > 0) {
          const rents = data.map((office) => office.rent);
          setRentRange({ min: Math.min(...rents), max: Math.max(...rents) });
        }
      })
      .catch((error) => {
        console.error("Error fetching office properties:", error);
        setOfficeProperties([]);
      });
  }, []);

  // Extract unique locations
  const allLocations = [...new Set(officeProperties.map((office) => office.location || ""))];

  // Extract unique transaction types
  const allTransactions = ["Rent", "Lease", "Sell"];

  // Filtered office properties based on selections
  const filteredOffices = officeProperties.filter((office) => {
    const matchesLocation = selectedLocation ? office.location === selectedLocation : true;
    const matchesTransaction = selectedTransaction ? office.transactionType === selectedTransaction : true;
    const matchesRate = office.rent >= rentRange.min && office.rent <= rentRange.max;
    return matchesLocation && matchesTransaction && matchesRate;
  });

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">Office Listings</h1>
          <p>Find the perfect office space for your business needs.</p>
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

          {/* Rent Price Range Slider */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Rent Range: ₹{rentRange.min} - ₹{rentRange.max}</label>
            <input
              type="range"
              className="form-range"
              min={Math.min(...officeProperties.map((office) => office.rent), 0)}
              max={Math.max(...officeProperties.map((office) => office.rent), 10000)}
              value={rentRange.max}
              onChange={(e) => setRentRange({ ...rentRange, max: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {/* Office Listings */}
        <div className="row g-4">
          {filteredOffices.length > 0 ? (
            filteredOffices.map((office) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={office.id}>
                <div
                  className="property-item rounded overflow-hidden"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <a href="#">
                      <img
                        className="img-fluid"
                        src={
                          office.propertyImage && office.propertyImage.trim()
                            ? office.propertyImage
                            : "https://via.placeholder.com/300"
                        }
                        alt={office.address}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                    </a>
                    <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                      {office.transactionType}
                    </div>
                  </div>
                  <div className="p-4 pb-0" style={{ flexGrow: 1 }}>
                    <h5 className="text-primary mb-3">₹{office.rent}/month</h5>
                    <a className="d-block h5 mb-2" href="#">
                      {office.address}
                    </a>
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      {office.location}
                    </p>
                  </div>
                  <div className="d-flex border-top" style={{ marginTop: "auto" }}>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-building text-primary me-2"></i>
                      Amenities: {office.amenities}
                    </small>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No office properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficePropertiesPage;
