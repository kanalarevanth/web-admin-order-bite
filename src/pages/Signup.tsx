import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { addUser } from "../utils/signup";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    logo: null as File | null,
    address: {
      country: "",
      state: "",
      city: "",
      area: "",
      pinCode: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;

    if (!passwordRegex.test(userData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    } else if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }

    if (!/^\d{6}$/.test(restaurantData.address.pinCode)) {
      setError("Please enter a valid 6-digit pin code.");
      return;
    }

    if (restaurantData.logo && restaurantData.logo.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    } else {
      setError("");
    }

    setLoading(true);
    try {
      setError("");
      const res = await addUser({ userData, restaurantData });
      if (res && res?.status === 409) {
        setError("User Account already exists. Please Login");
      } else if (res) {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container signup-container-card">
      <div className="p-4 shadow-lg signup-card">
        <h2 className="main-heading text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-row">
            <div className="form-column user-details">
              <h4 className="form-heading">User Details</h4>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    className="form-control"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <span className="material-icons-round">visibility</span>
                    ) : (
                      <span className="material-icons-round">
                        visibility_off
                      </span>
                    )}
                  </span>
                </div>
                {passwordError && (
                  <div className="text-danger mt-2">{passwordError}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Re-enter Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    className="form-control"
                    value={userData.confirmPassword}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? (
                      <span className="material-icons-round">visibility</span>
                    ) : (
                      <span className="material-icons-round">
                        visibility_off
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="form-column restaurant-details">
              <h4 className="form-heading">Restaurant Details</h4>
              <div className="form-group">
                <label htmlFor="restaurantName">Restaurant Name</label>
                <input
                  type="text"
                  id="restaurantName"
                  className="form-control"
                  value={restaurantData.name}
                  onChange={(e) =>
                    setRestaurantData({
                      ...restaurantData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-row input-group-row">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    className="form-control"
                    value={restaurantData.address.country}
                    onChange={(e) =>
                      setRestaurantData({
                        ...restaurantData,
                        address: {
                          ...restaurantData.address,
                          country: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    value={restaurantData.address.state}
                    onChange={(e) =>
                      setRestaurantData({
                        ...restaurantData,
                        address: {
                          ...restaurantData.address,
                          state: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  className="form-control"
                  value={restaurantData.address.city}
                  onChange={(e) =>
                    setRestaurantData({
                      ...restaurantData,
                      address: {
                        ...restaurantData.address,
                        city: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={restaurantData.address.area}
                  onChange={(e) =>
                    setRestaurantData({
                      ...restaurantData,
                      address: {
                        ...restaurantData.address,
                        area: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div className="form-row input-group-row">
                <div className="form-group">
                  <label htmlFor="pinCode">Pin Code</label>
                  <input
                    type="text"
                    id="pinCode"
                    className="form-control"
                    value={restaurantData.address.pinCode}
                    onChange={(e) =>
                      setRestaurantData({
                        ...restaurantData,
                        address: {
                          ...restaurantData.address,
                          pinCode: e.target.value,
                        },
                      })
                    }
                    required
                    maxLength={6}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Restaurant Image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    onChange={(e) =>
                      setRestaurantData({
                        ...restaurantData,
                        logo: e.target.files?.[0],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mt-3 sign-up-btn"
            disabled={
              !userData.firstName ||
              !userData.email ||
              !userData.password ||
              !userData.confirmPassword ||
              !restaurantData.name ||
              !restaurantData.address.country ||
              !restaurantData.address.state ||
              !restaurantData.address.city ||
              !restaurantData.address.area ||
              !restaurantData.address.pinCode ||
              loading
            }
          >
            Sign Up
          </button>
        </form>
        {error && <div className="text-danger mt-3 text-center">{error}</div>}
        <p className="mt-3 text-center">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default Signup;
