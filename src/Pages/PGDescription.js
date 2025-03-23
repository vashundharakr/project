import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Pg";

const PGDescriptionPage = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [pgImage, setPgImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPg(data);
        setPgImage(data.image || "https://via.placeholder.com/600");
      })
      .catch((error) => console.error("Error fetching PG details:", error));
  }, [id]);

  if (!pg) return <p className="text-center mt-5">Loading...</p>;

  // Construct WhatsApp link
  const ownerPhone = pg.ownerPhone || "+911234567890"; // Default placeholder number
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the PG at ${pg.location}. Can we discuss further?`
  );
  const whatsappLink = `https://wa.me/${ownerPhone}?text=${whatsappMessage}`;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="mb-4 text-center text-primary fw-bold">PG Description</h1>

        {/* Image Section */}
        <div className="text-center mb-4">
          <img
            className="img-fluid rounded shadow"
            src={pgImage}
            alt="PG Image"
            style={{ width: "75%", height: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Details Section */}
        <div className="text-center">
          <h3 className="text-success fw-bold">₹{pg.rent}/month</h3>
          <p>
            <i className="fa fa-map-marker-alt text-primary me-2"></i>
            <strong>Location:</strong> {pg.location}
          </p>
          <p>
            <i className="fa fa-users text-info me-2"></i>
            <strong>PG For:</strong> {pg.pgFor}
          </p>
          <p>
            <i className="fa fa-bed text-warning me-2"></i>
            <strong>Room Sharing:</strong> {pg.roomSharing}-Sharing
          </p>
          <p>
            <i className="fa fa-bolt text-danger me-2"></i>
            <strong>Electricity Charges:</strong> {pg.electricityCharges}
          </p>
          <p className="lead text-muted">
            <strong>Description:</strong> {pg.description || "A comfortable PG with essential amenities."}
          </p>
        </div>

        {/* Facilities Section */}
        <div className="mt-4">
          <h4 className="fw-bold text-primary">Facilities & Amenities</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <i className="fa fa-wifi text-success me-2"></i> WiFi: {pg.hasWiFi ? "❌ Not Available":"✅ Available"}
            </li>
            <li className="list-group-item">
              <i className="fa fa-utensils text-warning me-2"></i> Food Included: {pg.foodIncluded ? "❌ No":"✅ Yes" }
            </li>
            <li className="list-group-item">
              <i className="fa fa-shield-alt text-danger me-2"></i> Security: {pg.hasSecurity ?  "❌ Not Available":"✅ Available" }
            </li>
            <li className="list-group-item">
              <i className="fa fa-bath text-info me-2"></i> Attached Bathroom: {pg.attachedBathroom ?  "❌ No":"✅ Yes"}
            </li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="text-center">
          <Link to="/Property/PG" className="btn btn-secondary btn-lg me-3">
            <i className="fa fa-arrow-left me-2"></i> Back to Listings
          </Link>

          {/* WhatsApp Contact Button */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg">
            <i className="fa fa-whatsapp me-2"></i> Contact via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default PGDescriptionPage;
