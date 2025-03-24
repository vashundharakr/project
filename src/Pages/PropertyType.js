import React from "react";
import HomeIcon from "../assets/img/icon-house.png";
import PgIcon from "../assets/img/icon-apartment.png";
import GarageIcon from "../assets/img/icon-luxury.png";
import OfficeIcon from "../assets/img/icon-housing.png";
import ShopIcon from "../assets/img/icon-condominium.png";
import ApartmentIcon from "../assets/img/icon-building.png";

// Clickable Residential Properties
const mainProperties = [
  { name: "Home", img: HomeIcon },
  { name: "PG", img: PgIcon },
  { name: "Garage", img: GarageIcon },
];

// Clickable Commercial Properties
const commercialProperties = [
  { name: "Office", img: OfficeIcon },
  { name: "Shop", img: ShopIcon },
  { name: "Apartment", img: ApartmentIcon },
];

const NavigationPage = (path) => {
  window.location.href = "/Property/" + path;
};

const PropertyTypes = () => {
  return (
    <div className="container mx-auto py-10 px-4 my-5">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-3">Property Types</h1>
        <p className="text-gray-600">Explore different property types available for sale and rent.</p>
      </div>

      {/* Residential Properties - Clickable Cards */}
      <div className="d-flex flex-wrap justify-content-center mb-5">
        {mainProperties.map((property) => (
          <div
            key={property.name}
            onClick={() => NavigationPage(property.name)}
            className="bg-gray-100 text-center rounded-xl p-5 me-4 mb-3 mx-auto shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <div className="rounded-lg p-4">
              <div className="mb-3">
                <img className="mx-auto h-16" src={property.img} alt={property.name} />
              </div>
              <h6 className="text-lg font-semibold">{property.name}</h6>
              <span className="text-gray-500">123 Properties</span>
            </div>
          </div>
        ))}
      </div>

      {/* Commercial Properties Heading */}
      <div className="text-center max-w-xl mx-auto mb-3">
        <h2 className="text-xl font-semibold text-gray-600">Commercial Properties</h2>
      </div>

      {/* Commercial Properties - Clickable Cards */}
      <div className="d-flex flex-wrap justify-content-center">
        {commercialProperties.map((property) => (
          <div
            key={property.name}
            onClick={() => NavigationPage(property.name)}
            className="bg-gray-100 text-center rounded-xl p-5 me-4 mb-3 mx-auto shadow-lg hover:shadow-xl transition cursor-pointer"
          >
            <div className="rounded-lg p-4">
              <div className="mb-3">
                <img className="mx-auto h-16" src={property.img} alt={property.name} />
              </div>
              <h6 className="text-lg font-semibold">{property.name}</h6>
              <span className="text-gray-500">Available Now</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypes;
