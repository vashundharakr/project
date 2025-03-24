import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccessMessage("");

    if (isAdmin && email === "admin@gmail.com" && password === "Admin@123") {
      localStorage.setItem("userName", "Admin");
      localStorage.setItem("IsLoggedIn", "true");
      window.dispatchEvent(new Event("storage"));
      setSuccessMessage("Admin login successful!");
      setTimeout(() => navigate("/Admin"), 1000);
      setLoading(false);
      return;
    }

    const loginData = {
      Email: email,
      password: password,
    };

    const loginEndpoint = "http://localhost:5074/api/Login";

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userName", data.userName || email);

        // ✅ Fetch user approval status separately
        const userEndpoint = `http://localhost:5074/api/User/email/${email}`;
        const userResponse = await fetch(userEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          if (userData.approval === 1) {
            localStorage.setItem("IsLoggedIn", "true");
            window.dispatchEvent(new Event("storage"));
            setSuccessMessage("Login successful!");
            setTimeout(() => navigate("/properties-type"), 1000);
          } else {
            setError("Waiting for Admin Approval. Please try later.");
          }
        } else {
          setError("Error fetching approval status.");
        }
      } else {
        setError(data?.message || "Invalid username or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container w-50 border p-4 mt-5">
      <h3 className="text-center">{isAdmin ? "Admin Login" : "User Login"}</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email" className="fw-bold my-2">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="fw-bold my-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="text-danger my-2">{error}</div>}
        {successMessage && <div className="text-success my-2">{successMessage}</div>}

        <button type="submit" className="btn btn-primary w-100 my-3" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center">
        <button className="btn btn-secondary mt-3" onClick={() => setIsAdmin((prev) => !prev)}>
          Switch to {isAdmin ? "User Login" : "Admin Login"}
        </button>
      </div>

      {!isAdmin && (
        <div className="text-center mt-3">
          <button className="btn btn-link" onClick={() => navigate("/Register")}>
            Don't have an account? Register here
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
