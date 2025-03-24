import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Garage";

const GarageDescriptionPage = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [garageImage, setGarageImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setGarage(data);
        setGarageImage(data.image || "https://via.placeholder.com/600");
      })
      .catch((error) => console.error("Error fetching garage details:", error));
  }, [id]);

  if (!garage) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="mb-4 text-center text-primary fw-bold">Garage Description</h1>

        {/* Image Section */}
        <div className="text-center mb-4">
          <img
            className="img-fluid rounded shadow"
            src={garageImage}
            alt="Garage Image"
            style={{ width: "75%", height: "400px", objectFit: "cover" }}
          />
        </div>

        {/* Details Section */}
        <div className="text-center">
          <h3 className="text-success fw-bold">{garage.address}</h3>
          <p>
            <i className="fa fa-map-marker-alt text-primary me-2"></i>
            <strong>Location:</strong> {garage.location}
          </p>
          <p>
            <i className="fa fa-car text-info me-2"></i>
            <strong>Vehicle Types:</strong> {garage.vehicleType?.join(", ") || "N/A"}
          </p>
          <p>
            <i className="fa fa-user text-warning me-2"></i>
            <strong>Preferred Gender:</strong> {garage.gender || "N/A"}
          </p>
          <p className="lead text-muted">
            <strong>Description:</strong> {garage.description || "A secure garage with all necessary facilities."}
          </p>
        </div>

        {/* Pricing Section */}
        <div className="mt-4">
          <h4 className="fw-bold text-primary">Pricing (Per Hour)</h4>
          <ul className="list-group mb-4">
            {garage.chargePerHour &&
              Object.entries(garage.chargePerHour).map(([vehicle, charge]) => (
                <li className="list-group-item" key={vehicle}>
                  <i className="fa fa-money-bill-wave text-success me-2"></i> {vehicle}: ₹{charge}/hour
                </li>
              ))}
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="text-center">
          <Link to="/Property/Garage" className="btn btn-secondary btn-lg me-3">
            <i className="fa fa-arrow-left me-2"></i> Back to Listings
          </Link>
          <button className="btn btn-primary btn-lg">
            <i className="fa fa-phone-alt me-2"></i> Contact Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GarageDescriptionPage;
