import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/Apartments";

const ApartmentDescriptionPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setApartment(data);
      })
      .catch((error) => console.error("Error fetching apartment details:", error));
  }, [id]);

  if (!apartment) {
    return <div className="container text-center py-5">Loading apartment details...</div>;
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the apartment at ${apartment.address} for ${apartment.transactionType}. \n\n✅ Price: ₹${apartment.price.toLocaleString()} \n✅ Bedrooms: ${apartment.bedrooms} \n✅ Bathrooms: ${apartment.bathrooms} \n✅ Floor: ${apartment.floor} \n✅ Location: ${apartment.location} \n✅ Description: ${apartment.description}`
  );

  const whatsappLink = `https://wa.me/+911234567890?text=${whatsappMessage}`;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="mb-4 text-center text-primary fw-bold">Apartment Description</h1>

        {/* Image Section */}
        <div className="text-center mb-4">
          <img
            className="img-fluid rounded shadow"
            src={apartment.propertyImage || "https://via.placeholder.com/600"}
            alt="Apartment"
            style={{ width: "75%", height: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Details Section */}
        <div className="text-center">
          <h3 className="text-success fw-bold">₹{apartment.price.toLocaleString()}</h3>
          <p>
            <i className="fa fa-map-marker-alt text-primary me-2"></i>
            <strong>Location:</strong> {apartment.location}
          </p>
          <p>
            <i className="fa fa-bed text-warning me-2"></i>
            <strong>Bedrooms:</strong> {apartment.bedrooms}
          </p>
          <p>
            <i className="fa fa-bath text-info me-2"></i>
            <strong>Bathrooms:</strong> {apartment.bathrooms}
          </p>
          <p>
            <i className="fa fa-building text-secondary me-2"></i>
            <strong>Floor:</strong> {apartment.floor}
          </p>
          <p>
            <i className="fa fa-exchange-alt text-warning me-2"></i>
            <strong>Transaction Type:</strong> {apartment.transactionType}
          </p>
          <p className="lead text-muted">
            <strong>Description:</strong> {apartment.description}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="text-center mt-4">
          <Link to="/Property/Apartments" className="btn btn-secondary btn-lg me-3">
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

export default ApartmentDescriptionPage;
