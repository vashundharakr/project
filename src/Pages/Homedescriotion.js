import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Home";

const HomeDescriptionPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [homeImage, setHomeImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
        setHomeImage(data.image || "https://via.placeholder.com/600");
      })
      .catch((error) => console.error("Error fetching property details:", error));
  }, [id]);

  if (!property) return <p className="text-center mt-5">Loading...</p>;

  // Static details for now
  const homeDetails = {
    hasGarden: true,
    hasGarage: property.parkingLot > 0,
    hasSecurity: true,
    totalFloors: property.floors || 2,
    furnishing: "Fully Furnished",
    description:
      "A beautiful home in a peaceful neighborhood. Comes with modern facilities and spacious rooms.",
    price: property.rent ? `₹${property.rent}/month` : `₹${property.sellingPrice}`,
    size: `${property.size} sqft`,
    transactionType: property.rent ? "Rent" : "Sell",
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="mb-4 text-center text-primary fw-bold">Home Description</h1>

        {/* Image Section */}
        <div className="text-center mb-4">
          <img
            className="img-fluid rounded shadow"
            src={homeImage}
            alt="Home Image"
            style={{ width: "75%", height: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Details Section */}
        <div className="text-center">
          <h3 className="text-success fw-bold">{homeDetails.price}</h3>
          <p>
            <i className="fa fa-expand text-primary me-2"></i>
            <strong>Size:</strong> {homeDetails.size}
          </p>
          <p>
            <i className="fa fa-exchange-alt text-warning me-2"></i>
            <strong>Transaction Type:</strong> {homeDetails.transactionType}
          </p>
          <p>
            <i className="fa fa-couch text-info me-2"></i>
            <strong>Furnishing:</strong> {homeDetails.furnishing}
          </p>
          <p className="lead text-muted">
            <strong>Description:</strong> {homeDetails.description}
          </p>
        </div>

        {/* Facilities Section */}
        <div className="mt-4">
          <h4 className="fw-bold text-primary">Facilities & Amenities</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <i className="fa fa-tree text-success me-2"></i> Garden: {homeDetails.hasGarden ? "✅ Available" : "❌ Not Available"}
            </li>
            <li className="list-group-item">
              <i className="fa fa-car text-warning me-2"></i> Garage: {homeDetails.hasGarage ? "✅ Available" : "❌ Not Available"}
            </li>
            <li className="list-group-item">
              <i className="fa fa-shield-alt text-danger me-2"></i> Security: {homeDetails.hasSecurity ? "✅ Available" : "❌ Not Available"}
            </li>
            <li className="list-group-item">
              <i className="fa fa-building text-info me-2"></i> Total Floors: {homeDetails.totalFloors}
            </li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="text-center">
          <Link to="/Property/Home" className="btn btn-secondary btn-lg me-3">
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

export default HomeDescriptionPage;
