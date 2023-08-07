import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logging out");
        localStorage.removeItem("authToken");
        setIsLoggedIn(false)
        navigate("/login");
    };

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
