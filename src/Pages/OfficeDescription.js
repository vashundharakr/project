import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/OfficeProperty";

const OfficeDescriptionPage = () => {
  const { id } = useParams();
  const [officeImage, setOfficeImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOfficeImage(data.propertyImage || "https://via.placeholder.com/600");
      })
      .catch((error) => console.error("Error fetching office image:", error));
  }, [id]);

  // Default details (Everything is available)
  const officeDetails = {
    hasCafeteria: true,
    hasPantry: true,
    hasParkingLot: true,
    hasWiFi: true,
    hasSecurity: true,
    attachedBathroom: true,
    foodIncluded: true,
    totalFloors: 10,
    furnishing: "Fully Furnished",
    description:
      "This modern office space is designed for productivity and comfort. Equipped with state-of-the-art facilities and ample parking, it's an ideal choice for businesses looking to establish a strong presence.",
    price: "₹50,000/month",
    size: "2000 sqft",
    transactionType: "Rent",
    ownerPhone: "+911234567890", // Default placeholder number
  };

  // Construct WhatsApp link
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the office space of ${officeDetails.size} for ${officeDetails.transactionType}. 
    \n\n✅ Furnishing: ${officeDetails.furnishing} 
    \n✅ Total Floors: ${officeDetails.totalFloors} 
    \n✅ Cafeteria: Available
    \n✅ Pantry: Available
    \n✅ Parking Lot: Available
    \n✅ WiFi: Available
    \n✅ Security: Available
    \n✅ Attached Bathroom: Available
    \n✅ Food Included: Available`
  );
  const whatsappLink = `https://wa.me/${officeDetails.ownerPhone}?text=${whatsappMessage}`;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4">
        <h1 className="mb-4 text-center text-primary fw-bold">Office Description</h1>

        {/* Image Section */}
        <div className="text-center mb-4">
          <img
            className="img-fluid rounded shadow"
            src={officeImage}
            alt="Office Space"
            style={{ width: "75%", height: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Details Section */}
        <div className="text-center">
          <h3 className="text-success fw-bold">{officeDetails.price}</h3>
          <p>
            <i className="fa fa-expand text-primary me-2"></i>
            <strong>Size:</strong> {officeDetails.size}
          </p>
          <p>
            <i className="fa fa-exchange-alt text-warning me-2"></i>
            <strong>Transaction Type:</strong> {officeDetails.transactionType}
          </p>
          <p>
            <i className="fa fa-couch text-info me-2"></i>
            <strong>Furnishing:</strong> {officeDetails.furnishing}
          </p>
          <p className="lead text-muted">
            <strong>Description:</strong> {officeDetails.description}
          </p>
        </div>

        {/* Facilities Section */}
        <div className="mt-4">
          <h4 className="fw-bold text-primary">Facilities & Amenities</h4>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <i className="fa fa-coffee text-danger me-2"></i> Cafeteria: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-utensils text-warning me-2"></i> Pantry: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-car text-success me-2"></i> Parking Lot: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-wifi text-primary me-2"></i> WiFi: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-shield-alt text-dark me-2"></i> Security: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-bath text-info me-2"></i> Attached Bathroom: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-utensils text-success me-2"></i> Food Included: ✅ Available
            </li>
            <li className="list-group-item">
              <i className="fa fa-building text-info me-2"></i> Total Floors: {officeDetails.totalFloors}
            </li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="text-center">
          <Link to="/Property/Office" className="btn btn-secondary btn-lg me-3">
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

export default OfficeDescriptionPage;
