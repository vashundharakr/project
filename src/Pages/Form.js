import { useState } from "react";
import AdditionalProperty from "./SubForm";

const AddProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [homeType, setHomeType] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({ vehicleType: [], chargePerHour: {}, image: "image demo upload" });

  const propertyFields = {
    Home: ["HomeType"],
    Pg: ["Address", "Rent", "Location", "PgFor", "RoomSharing", "PricePerSharing", "ElectricityCharges", "Description"],
    Garage: ["Address", "Location", "ChargePerHour", "VehicleType"]
  };

  const homeFields = {
    Rent: ["Address", "Rent", "Location", "Rooms", "ParkingLot", "Description"],
    Sell: ["Address", "SellingPrice", "Location", "Rooms", "ParkingLot", "Description"]
  };

  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => {
      if (name === "VehicleType") {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        return { 
          ...prev, 
          vehicleType: [...new Set([...prev.vehicleType, ...selectedOptions])] // Merge new selections
        };
      }
      return { ...prev, [name]: value };
    });
  };
  //   const updatedCharges = { ...formData.chargePerHour };
  //   delete updatedCharges[type];
  //   setFormData({ ...formData, vehicleType: updatedVehicleTypes, chargePerHour: updatedCharges });
  // };

  // const handleChargeChange = (e, type) => {
  //   setFormData({
  //     ...formData,
  //     chargePerHour: { ...formData.chargePerHour, [type]: e.target.value },
  //   });
  // };

  // const handleMultiSelectChange = (e) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setFormData((prev) => ({
  //     ...prev,
  //     vehicleType: selectedOptions,
  //     chargePerHour: selectedOptions.reduce((acc, type) => {
  //       acc[type] = prev.chargePerHour[type] || ""; // Preserve existing charges
  //       return acc;
  //     }, {}),
  //   }));
  //   console.log("11---",formData)
  // };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  
    setFormData((prev) => {
      const updatedVehicleTypes = Array.from(new Set([...prev.vehicleType, ...selectedOptions]));
      console.log("Updated Vehicle Types:", updatedVehicleTypes); // ✅ This will show correct values
      return {
        ...prev,
        vehicleType: updatedVehicleTypes,
        chargePerHour: updatedVehicleTypes.reduce((acc, type) => {
          acc[type] = prev.chargePerHour[type] || "";
          return acc;
        }, {}),
      };    });
  };
  
  

  const handleChargeChange = (e, type) => {
    setFormData((prev) => ({
      ...prev,
      chargePerHour: {
        ...prev.chargePerHour,
        [type]: e.target.value,
      },
    }));
  };

  const handleRemoveVehicleType = (type) => {
    setFormData((prev) => {
      const updatedVehicleTypes = prev.vehicleType.filter((vehicle) => vehicle !== type);
      const updatedCharges = { ...prev.chargePerHour };
      delete updatedCharges[type];
      return { ...prev, vehicleType: updatedVehicleTypes, chargePerHour: updatedCharges };
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result; // Base64 string
        setImage(imageData);
        setFormData((prev) => ({ ...prev, image: imageData })); // Update formData
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const getApiEndpoint = () => {
    switch (propertyType) {
      case "Home":
        return homeType === "Rent"
          ? "http://localhost:5074/api/Home"
          : "http://localhost:5074/api/Home";
      case "Pg":
        return "http://localhost:5074/api/Pg";
      case "Garage":
        return "http://localhost:5074/api/Garage";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!propertyType) {
      alert("Please select a property type");
      return;
    }
  
    const apiEndpoint = getApiEndpoint();
    if (!apiEndpoint) {
      alert("Invalid property type");
      return;
    }
  
    // Define required fields dynamically based on property type
    let requiredFields = propertyFields[propertyType] || [];
    if (propertyType === "Home") {
      requiredFields = homeFields[homeType] || [];
    }
  
    // Check for missing fields
    for (const field of requiredFields) {
      if (field === "VehicleType") {
        if (!formData.vehicleType || formData.vehicleType.length === 0) {
          alert("Please select at least one vehicle type");
          return;
        }
      } else if (!formData[field] || formData[field].length === 0) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }
  
    // Ensure image is included
    if (!formData.image || formData.image === "image demo upload") {
      alert("Please upload an image.");
      return;
    }
  
    let jsonData = {}; // Declare jsonData outside the condition
  
    if (propertyType === "Garage") {
      jsonData = {
        address: formData.Address,
        location: formData.Location,
        vehicleType: formData.vehicleType,
        chargePerHour: Object.fromEntries(
          Object.entries(formData.chargePerHour).map(([key, value]) => [key, parseFloat(value)])
        ),
        image: formData.image,
      };
    } else {
      jsonData = { propertyType, ...formData };
    }
  
    console.log("Submitting Data:", jsonData);
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData),
      });
  
      if (response.ok) {
        alert("Property added successfully!");
        setPropertyType("");
        setHomeType("");
        setImage(null);
        setFormData({ vehicleType: [], chargePerHour: {}, image: "image demo upload" });
      } else {
        const errorData = await response.json();
        console.error("Error saving property:", errorData);
        alert("Error adding property.");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("Failed to submit property.");
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
            <option value="Home">Home</option>
            <option value="Pg">PG</option>
            <option value="Garage">Garage</option>
          </select>
        </div>

        {propertyType === "Home" && (
          <div className="mb-3">
            <label className="form-label">Is it for Rent or Sell?</label>
            <select className="form-select" value={homeType} onChange={(e) => setHomeType(e.target.value)}>
              <option value="">Choose...</option>
              <option value="Rent">For Rent</option>
              <option value="Sell">For Sell</option>
            </select>
          </div>
        )}

        {propertyType && (propertyType !== "Home" || homeType) && (
          <form onSubmit={handleSubmit}>
            {(propertyType === "Home" ? homeFields[homeType] : propertyFields[propertyType]).map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
                {field === "PgFor" || field === "ElectricityCharges" || field === "ParkingLot" ? (
                  <select className="form-select" name={field} onChange={handleChange}>
                    <option value="">Select...</option>
                    {field === "PgFor" && (
                      <>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                      </>
                    )}
                    {field === "ElectricityCharges" && (
                      <>
                        <option value="included">Included</option>
                        <option value="separate">Separate</option>
                      </>
                    )}
                    {field == "ParkingLot" && (
                      <>
                        <option value="available">Available</option>
                        <option value="not available">Not Available</option>
                      </>
                    )}
                  </select>
                ) : field === "VehicleType" ? (
                  <>
                    <div className="mb-3">
                      {/* <label className="form-label">Vehicle Type</label> */}
                      <select className="form-select" multiple name="VehicleType" onChange={handleMultiSelectChange}>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="cycle">Cycle</option>
                        <option value="lorry">Lorry</option>
                        <option value="van">Van</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="mt-2">
                      {formData.vehicleType.map((type) => (
                        <div key={type} className="d-flex align-items-center mb-2">
                          <span className="badge bg-secondary me-2">{type}</span>
                          <input
                            type="number"
                            className="form-control w-25 me-2"
                            placeholder={`Charge per hour for ${type}`}
                            value={formData.chargePerHour[type] || ""}
                            onChange={(e) => handleChargeChange(e, type)}
                          />
                          <button type="button" className="btn-close" onClick={() => handleRemoveVehicleType(type)}></button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <input type="text" className="form-control" name={field} placeholder={`Enter ${field}`} onChange={handleChange} />
                )}
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Upload Property Image</label>
              {/* <input type="file" className="form-control" onChange={handleImageChange} /> */}
              <input
                type="file"
                className="form-control"
                id="Image"
                accept="image/*"
                onChange={handleImageChange}
              // required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Property</button>
          </form>
        )}
      </div>
            {/* Include AdditionalProperty form below */}
            <div className="mt-5">
        <h3 className="text-center text-secondary">Add Commercial Property</h3>
        <AdditionalProperty />
      </div>
    </div>
  );
};

export default AddProperty;
