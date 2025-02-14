import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../utils/login";
import "../../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { user, setUser, setToken, isAuthenticated } = useAuth();

  const logOut = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        setUser({});
        setToken("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {user.restaurant.name}
        </NavLink>
        {isAuthenticated && (
          <div className="right-container">
            <h6 className="user-name">{user.firstName}</h6>
            <button
              className="btn logout-btn"
              onClick={logOut}
              aria-label="Logout"
            >
              <i className="material-icons-round logout-icon">logout</i>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
