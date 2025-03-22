import React from "react";

const PropertyList = () => {
  const properties = [
    { id: 1, name: "Luxury Villa", price: "$500,000" },
    { id: 2, name: "Cozy Apartment", price: "$250,000" },
    { id: 3, name: "Beach House", price: "$750,000" }
  ];

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-item">
          <h2>{property.name}</h2>
          <p>{property.price}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
