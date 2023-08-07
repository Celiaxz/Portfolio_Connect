import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function Navbar() {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <NavLink to="/">Home</NavLink>
            {isLoggedIn ?
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <NavLink to="/create-project">Create Project</NavLink>
                </>
                :
                <>
                    <NavLink to="/signup">Signup</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>
            }
            <NavLink to="/projects">Search for a projet</NavLink>

        </div>
    );
}

export default Navbar;
