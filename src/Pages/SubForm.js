import { useState } from "react";

const API_ENDPOINTS = {
  Apartment: "http://localhost:5074/api/Apartments",
  Office: "http://localhost:5074/api/OfficeProperty",
  Shop: "http://localhost:5074/api/ShopProperties",
};

const AdditionalProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  const propertyFields = {
    Apartment: ["Address", "Location", "Floor", "Bedrooms", "Bathrooms", "Price", "Description"],
    Office: ["Address", "Location", "Size", "Amenities", "Description"],
    Shop: ["Address", "Location", "Size", "FootTraffic", "Price", "Description"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData((prev) => ({ ...prev, PropertyImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyType || !transactionType) {
      alert("Please select property type and transaction type.");
      return;
    }

    const requiredFields = propertyFields[propertyType] || [];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }

    if (!formData.PropertyImage) {
      alert("Please upload an image.");
      return;
    }

    const apiUrl = API_ENDPOINTS[propertyType];
    if (!apiUrl) {
      alert("Invalid property type selected.");
      return;
    }

    const payload = { ...formData, TransactionType: transactionType };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      alert("Property added successfully!");
      setPropertyType("");
      setTransactionType("");
      setImage(null);
      setFormData({});
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Add Property</h2>
        <div className="mb-3">
          <label className="form-label">Select Property Type</label>
          <select className="form-select" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">Choose...</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
          </select>
        </div>

        {propertyType && (
          <div className="mb-3">
            <label className="form-label">Select Transaction Type</label>
            <select className="form-select" value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
              <option value="">Choose...</option>
              <option value="Rent">Rent</option>
              <option value="Lease">Lease</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
        )}

        {propertyType && transactionType && (
          <form onSubmit={handleSubmit}>
            {propertyFields[propertyType].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
                <input
                  type={field === "Price" ? "number" : "text"}
                  className="form-control"
                  name={field}
                  placeholder={`Enter ${field}`}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Upload Property Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Property</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdditionalProperty;
