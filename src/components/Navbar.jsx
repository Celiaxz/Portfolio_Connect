import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logging out");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/create-project">Create Project</NavLink>
      <NavLink to="/projects">All projects</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
