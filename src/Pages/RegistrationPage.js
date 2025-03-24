import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aadhar: "",
    pan: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "fullName":
        newErrors.fullName = value.trim() ? "" : "Full name is required";
        break;
      case "email":
        newErrors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) ? "" : "Invalid email format";
        break;
      case "phone":
        newErrors.phone = /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits";
        break;
      case "aadhar":
        newErrors.aadhar = /^\d{12}$/.test(value) ? "" : "Aadhar number must be 12 digits";
        break;
      case "pan":
        newErrors.pan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? "" : "Invalid PAN format (e.g., ABCDE1234F)";
        break;
      case "password":
        newErrors.password = value.length >= 6 ? "" : "Password must be at least 6 characters long";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (Object.values(errors).every((error) => error === "") && Object.values(formData).every((value) => value !== "")) {
      try {
        const response = await fetch("http://localhost:5074/api/User/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Registration successful! Redirecting...");
          localStorage.setItem("username", formData.email);
          setTimeout(() => (window.location.href = "/Login"), 2000);
        } else {
          setErrorMessage(data.message || "Registration failed. Try again.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
      }
    } else {
      setErrorMessage("Please fill all fields correctly.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Register</h2>
        
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div className="mb-3" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                className="form-control"
                name={key}
                placeholder={`Enter your ${key}`}
                value={value}
                onChange={handleChange}
              />
              {errors[key] && <small className="text-danger">{errors[key]}</small>}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        
        <p className="text-center mt-3">
          Already have an account? <a href="/Login" className="text-primary">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
