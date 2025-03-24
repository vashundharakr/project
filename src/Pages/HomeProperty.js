import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeProperty = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [propertyType, setPropertyType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0); // Maximum property price
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [location, setLocation] = useState("All");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5074/api/Home");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();

        const updatedData = data.map((prop) => ({
          ...prop,
          propertyType: prop.rent !== null ? "Rent" : prop.sellingPrice !== null ? "Sell" : "Unknown",
        }));

        setProperties(updatedData);
        setFilteredProperties(updatedData);

        // Determine maximum price
        const maxPropertyPrice = Math.max(
          ...updatedData.map((prop) => prop.rent || prop.sellingPrice || 0),
          0
        );
        setMaxPrice(maxPropertyPrice);
        setSelectedPrice(maxPropertyPrice); // Default slider position
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = properties;

    if (propertyType !== "All") {
      filtered = filtered.filter((prop) => prop.propertyType === propertyType);
    }

    if (selectedPrice > 0) {
      filtered = filtered.filter((prop) => {
        const price = prop.rent || prop.sellingPrice || 0;
        return price <= selectedPrice;
      });
    }

    if (location !== "All") {
      filtered = filtered.filter((prop) => prop.location === location);
    }

    setFilteredProperties(filtered);
  }, [propertyType, selectedPrice, location, properties]);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-0 gx-5 align-items-end">
          <div className="col-lg-6">
            <div className="text-start mx-auto mb-5">
              <h1 className="mb-3">Property Listing</h1>
              <p>Find the perfect property for you.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-4">
            <select className="form-select" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="All">All Properties</option>
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          {/* Price Slider */}
          <div className="col-md-4">
            <label className="fw-bold">Price Range: ₹{selectedPrice.toLocaleString()}</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max={maxPrice}
              step="5000"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
            />
          </div>

          <div className="col-md-4">
            <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="All">All Locations</option>
              {Array.from(new Set(properties.map((prop) => prop.location))).map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading properties...</p>
        ) : (
          <div className="row g-4">
            {filteredProperties.length === 0 ? (
              <p className="text-center">No properties available</p>
            ) : (
              filteredProperties.map((property) => (
                <div className="col-lg-4 col-md-6" key={property.id}>
                  <div className="property-item rounded overflow-hidden shadow h-100 d-flex flex-column">
                    
                    {/* Image Section */}
                    <div className="position-relative overflow-hidden" style={{ height: "250px" }}>
                      <img
                        className="w-100 h-100 object-fit-cover"
                        src={property.image || "https://via.placeholder.com/300"}
                        alt={property.address}
                      />
                      <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        {property.propertyType}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 pb-0 flex-grow-1">
                      <h5 className="text-primary mb-3">
                        {property.rent !== null
                          ? `₹${property.rent}/month`
                          : property.sellingPrice !== null
                          ? `₹${property.sellingPrice}`
                          : "Price Not Available"}
                      </h5>
                      <p className="text-muted">
                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                        {property.location}
                      </p>
                      <p className="text-sm text-truncate">{property.description}</p>
                    </div>
                    <div className="mx-auto my-2">
                    {/* Description Button */}
                    <Link to={`/home/description/${property.id}`} className="btn btn-success mx auto">
                        View Description
                      </Link>
                      </div>

                    {/* Footer Section */}
                    <div className="d-flex border-top mt-auto">
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-bed text-primary me-2"></i>
                        {property.rooms} Rooms
                      </small>
                      <small className="flex-fill text-center border-end py-2">
                        <i className="fa fa-car text-primary me-2"></i>
                        {property.parkingLot}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProperty;
