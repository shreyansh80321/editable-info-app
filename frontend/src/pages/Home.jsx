import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please login again.");
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(
        "https://editable-info-app-backend.vercel.app/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data && res.data.success) {
        setUser({ name: res.data.name || "", email: res.data.email || "" });
      } else {
        toast.error(res.data?.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      const msg = error.response?.data?.message || "Error fetching user data";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save handler: ALWAYS attempt to save when Save Changes is clicked.
  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please login again.");
      return;
    }

    // Always send name & email (backend will update/validate)
    const payload = {
      name: user.name,
      email: user.email,
    };

    // Include password fields ONLY if currentPassword is provided (per backend)
    if (passwords.currentPassword && passwords.currentPassword.trim() !== "") {
      payload.currentPassword = passwords.currentPassword;
      // include newPassword even if empty? we include it but backend will reject empty newPassword.
      payload.newPassword = passwords.newPassword;
    }

    try {
      const res = await axios.put(
        "https://editable-info-app-backend.vercel.app/api/user/update",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data && res.data.success) {
        toast.success(res.data.message || "Profile updated successfully!");
        setIsEditing(false);
        // clear password inputs after successful update
        setPasswords({ currentPassword: "", newPassword: "" });
        // refresh profile to reflect changes
        fetchProfile();
      } else {
        toast.error(res.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Error updating profile";
      toast.error(msg);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4 fw-semibold text-primary">
                  Welcome, {user.name || "User"}
                </h3>

                <form onSubmit={handleSave} autoComplete="off">
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Your email"
                    />
                  </div>

                  {/* Password Section - shown when editing */}
                  {isEditing && (
                    <>
                      <div className="mb-3">
                        <label
                          htmlFor="currentPassword"
                          className="form-label fw-medium"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwords.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password (required to change password)"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="newPassword"
                          className="form-label fw-medium"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={passwords.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                        />
                      </div>
                    </>
                  )}

                  {/* Buttons */}
                  <div className="d-flex justify-content-between">
                    {!isEditing ? (
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Info
                      </button>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className="btn btn-primary w-50 me-2"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary w-50"
                          onClick={() => {
                            setIsEditing(false);
                            setPasswords({
                              currentPassword: "",
                              newPassword: "",
                            });
                            fetchProfile();
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </form>

                <ToastContainer />

                <p className="text-center mt-4 mb-0 text-muted small">
                  <button
                    type="button"
                    className="btn btn-link text-danger text-decoration-none fw-medium"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
