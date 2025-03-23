import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const API_URL = "http://localhost:5074/api/Garage";

const GarageListings = () => {
  const [garages, setGarages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setGarages(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGarages();
  }, []);

  // Extract unique locations for filtering
  const allLocations = [...new Set(garages.map((g) => g.location || ""))];

  // Extract unique vehicle types for filtering
  const allVehicleTypes = [...new Set(garages.flatMap((g) => g.vehicleType || []))];

  // Filter garages based on selected location and vehicle type
  const filteredGarages = garages.filter((garage) => {
    const matchesLocation = selectedLocation ? garage.location === selectedLocation : true;
    const matchesVehicle = selectedVehicle ? garage.vehicleType?.includes(selectedVehicle) : true;
    return matchesLocation && matchesVehicle;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">Garage Listings</h1>
          <p>Find secure and convenient garages for rent.</p>
        </div>

        {/* Filters Section (Location & Vehicle Type) */}
        <div className="row mb-4 bg-light p-3 rounded">
          {/* Location Filter */}
          <div className="col-md-6">
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

          {/* Vehicle Type Filter */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Vehicle Type</label>
            <select className="form-select" value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
              <option value="">All Vehicles</option>
              {allVehicleTypes.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings Section */}
        <div className="tab-content">
          <div id="garage-listings" className="tab-pane fade show active">
            <div className="row g-4">
              {filteredGarages.map((garage) => (
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={garage.id}>
                  <div className="property-item rounded overflow-hidden d-flex flex-column h-100">
                    {/* Image Section */}
                    <div className="position-relative overflow-hidden">
                      <a href="#">
                        <img
                          className="img-fluid w-100"
                          style={{ height: "200px", objectFit: "cover" }}
                          src={garage.image || "https://via.placeholder.com/300"}
                          alt={garage.location}
                        />
                      </a>
                      <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                        {garage.vehicleType?.join(", ") || "N/A"}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <h5 className="text-primary mb-3">{garage.address}</h5>
                      <p>
                        <i className="fa fa-map-marker-alt text-primary me-2"></i>
                        {garage.location}
                      </p>
                      <div className="mx-auto my-2">
                    {/* Description Button */}
                    <Link to={`/PG/description/${garage.id}`} className="btn btn-success mx auto">
                        View Description
                      </Link>
                      </div>
                    </div>

                    {/* Price Section (Fixed at Bottom) */}
                    <div className="d-flex border-top">
                      {garage.chargePerHour &&
                        Object.entries(garage.chargePerHour).map(([vehicle, charge]) => (
                          <small className="flex-fill text-center border-end py-2" key={vehicle}>
                            <i className="fa fa-money-bill-wave text-primary me-2"></i>
                            {vehicle}: ₹{charge}/hour
                          </small>
                        ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Browse More Button */}
              <div className="col-12 text-center">
                <a className="btn btn-primary py-3 px-5" href="#">
                  Browse More Garages
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageListings;
