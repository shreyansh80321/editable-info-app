import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyFormData = { ...form };
    copyFormData[name] = value;
    setForm(copyFormData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let { name, email, password } = form;
    if (!name || !email || !password) {
      return handleError("All fields are required")
    }
   
    
    try {
      const url = "https://editable-info-app-backend.vercel.app/api/user/register";
      const response = await axios.post(url, form);
      console.log(response.data);

      const { success, message } = response.data;
      
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      console.log(response.data);
      
    } catch (error) {
      if (
    error.response &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.details &&
    error.response.data.error.details[0]
  ) {
    // Get the Joi validation message
    const validationMsg = error.response.data.error.details[0].message;
    handleError(validationMsg);
  } else if (error.response && error.response.data.message) {
    handleError(error.response.data.message);
  } else {
    handleError("Something went wrong");
  }
}
  }
  console.log(form);
  
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center mb-4 fw-semibold text-primary">
                  Create your account
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Full Name
                    </label>
                    <input
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email address
                    </label>
                    <input
                      value={form.email}
                      name="email"
                      onChange={handleChange}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <input
                      value={form.password}
                      name="password"
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Confirm Password */}
                  {/* <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-medium"
                    >
                      Confirm Password
                    </label>
                    <input
                      value={form.confirmpassword}
                      name="confirmpassword"
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="••••••••"
                    />
                  </div> */}

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Sign up
                  </button>
                </form>
                <ToastContainer />

                {/* Footer */}
                <p className="text-center mt-4 mb-0 text-muted small">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link text-primary text-decoration-none fw-medium"
                    onClick={() => {
                      console.log("Navigate to login");
                      navigate("/login");
                    }}
                  >
                    Log in
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

export default Signup;
