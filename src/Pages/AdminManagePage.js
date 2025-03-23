import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5074/api/User");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users.");
      console.error("Error fetching users:", error);
    }
  };

  // Approve user by setting approval to 1
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5074/api/User/approve/${id}`);

      if (response.status === 200) {
        // Update the user's approval status in state
        setUsers(users.map(user => 
          user.id === id ? { ...user, approval: 1 } : user
        ));
      } else {
        throw new Error("Approval update failed");
      }
    } catch (error) {
      setError("Failed to update approval.");
      console.error("Error updating approval:", error);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5074/api/User/${id}`);

      if (response.status == 200) {
        // Remove the user from the state
        setUsers(users.filter(user => user.id !== id));
      } else {
        throw new Error("Deletion failed");
      }
    } 
    catch (error) {
      // setError("Failed to delete user.");
      window.location.reload(); // Refresh page

      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">User Management</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {users.length > 0 ? (
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Aadhar</th>
              <th>PAN</th>
              <th>Approval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.aadhar}</td>
                <td>{user.pan}</td>
                <td>
                  {user.approval === 1 ? (
                    <span className="badge bg-success">Approved</span>
                  ) : (
                    <span className="badge bg-warning">Pending</span>
                  )}
                </td>
                <td>
                  {user.approval === 0 && (
                    <button 
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users available.</p>
      )}
    </div>
  );
};

export default AdminUserManagement;
