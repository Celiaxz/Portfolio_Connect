import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Container, Button } from "@mantine/core";
import "./Navbar.css"

function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <Container size="lg">
      <div className="navbar-container">
        <h2 className="app-name">//PortfolioConnect //</h2>
        <div className="nav-link">
          {isLoggedIn ? (
            <>
              <NavLink to="/create-project" className="nav-link">
                Create Project
              </NavLink>
              <NavLink to={`/user/${user._id}`} className="nav-link">
                Profile{" "}
              </NavLink>
              {/* <NavLink to={`/github/${user._id}`} className="nav-link">
                my Github Projects
              </NavLink> */}
              <NavLink to={`/otherUsers/${user._id}`} className="nav-link">
                Others Github
              </NavLink>
              <NavLink to="/search-projects" className="nav-link">
                All projects
              </NavLink>
              <Button onClick={handleLogout} className="nav-link">
                Logout
              </Button>
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
    </Container>
  );
}

export default Navbar;
