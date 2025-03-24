import { useState } from "react";

const HomeForm = ({ homeType, setHomeType, formData, setFormData }) => {
  const homeFields = {
    Rent: ["Address", "Rent", "Location", "Rooms", "ParkingLot", "Description"],
    Sell: ["Address", "SellingPrice", "Location", "Rooms", "ParkingLot", "Description"]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Is it for Rent or Sell?</label>
        <select className="form-select" value={homeType} onChange={(e) => setHomeType(e.target.value)}>
          <option value="">Choose...</option>
          <option value="Rent">For Rent</option>
          <option value="Sell">For Sell</option>
        </select>
      </div>

      {homeType && (
        <form>
          {homeFields[homeType].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.replace(/([A-Z])/g, " $1").trim()}:</label>
              <input type="text" className="form-control" name={field} onChange={handleChange} />
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      )}
    </>
  );
};

export default HomeForm;
