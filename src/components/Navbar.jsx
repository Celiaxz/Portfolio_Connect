import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";

function Navbar({ isLoggedIn, setIsLoggedIn, user, setUser }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("logging out");
        localStorage.removeItem("authToken");
        setUser(null)
        setIsLoggedIn(false)
        navigate("/");
    };

  return isLoggedIn ? (
    <div className="navbar">
      <NavLink to="/create-project">Create Project</NavLink>

      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default Navbar;
