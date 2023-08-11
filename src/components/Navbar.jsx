import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="navbar-container">
        {" "}
        <NavLink to="/">
          <img className="logo" src={logo} alt="image" />
        </NavLink>
        <div className="nav-link">
          {isLoggedIn ? (
            <>
              <NavLink
                exact="true"
                to="/"
                className="nav-link"
                activeClassName="active-nav-link"
              >
                Home
              </NavLink>
              <NavLink to="/create-project" className="nav-link">
                Create Project
              </NavLink>
              <NavLink to={`/user/${user._id}`} className="nav-link">
                Profile{" "}
              </NavLink>

              <NavLink to={`/otherUsers/${user._id}`} className="nav-link">
                Others Github
              </NavLink>
              <NavLink to="/search-projects" className="nav-link">
                All projects
              </NavLink>
            </>
          ) : (
            <>
              <NavLink exact="true" to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                Signup
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/search-projects" className="nav-link">
                All projects
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
