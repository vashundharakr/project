import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5074/api/ShopProperties";

const ShopDescriptionPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch shop details");
        }
        const data = await response.json();
        setShop(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!shop) return <div className="text-muted">Shop not found</div>;

  // Construct WhatsApp link
  const sellerPhone = shop.sellerPhone || "+911234567890"; // Default placeholder number
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the shop at ${shop.address}. Can we discuss further?`
  );
  const whatsappLink = `https://wa.me/${sellerPhone}?text=${whatsappMessage}`;

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-start mx-auto mb-4">
          <h1 className="mb-3">Shop Details</h1>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <img
              className="img-fluid rounded"
              src={shop.propertyImage && shop.propertyImage.trim() ? shop.propertyImage : "https://via.placeholder.com/600"}
              alt={shop.address}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-6">
            <h2 className="text-primary">{shop.address}</h2>
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
            <p>
              <i className="fa fa-money-bill-wave text-primary me-2"></i>
              Price: ₹{shop.price?.toLocaleString()}
            </p>
            <p>{shop.description}</p>

            {/* Buttons Section */}
            <div className="d-flex gap-3 mt-3">
              <Link to="/shops" className="btn btn-secondary">
                Back to Listings
              </Link>

              {/* Contact via WhatsApp Button */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                <i className="fa fa-whatsapp me-2"></i> Contact via WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDescriptionPage;
