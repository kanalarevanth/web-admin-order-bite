import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../utils/login";

const Login: React.FC = () => {
  const { user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [userData, seetUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(userData);
      if (res.status === 404) {
        setError("User Not Found. Please Check Credentials and Try Again");
      } else if (res.status === 401) {
        setError("Pasword Incorrect");
      } else if (res) {
        setUser(res.user);
        setToken(res.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.length) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="container login-container-card">
      <div className="p-4 shadow-lg signIn-card">
        <h2 className="text-center mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={userData.email}
              onChange={(e) =>
                seetUserData({ ...userData, email: e.target.value })
              }
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={userData.password}
              onChange={(e) =>
                seetUserData({ ...userData, password: e.target.value })
              }
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3 login-btn"
            disabled={!userData.email || !userData.password}
          >
            Login
          </button>
        </form>
        {error && <div className="text-danger mt-3 text-center">{error}</div>}
        <p className="mt-3 text-center">
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
