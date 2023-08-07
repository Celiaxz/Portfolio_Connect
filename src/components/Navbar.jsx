import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);

  return isLoggedIn ? (
    <div className="navbar">
      <NavLink to="/create-project">Create Project</NavLink>
      <NavLink to={`/user/${user._id}`}>Profile</NavLink>

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
