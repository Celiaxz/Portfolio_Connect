// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/Auth.context";
// import { Container, Text, Button } from "@mantine/core";

// function Navbar() {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
//   const navLinkStyle = {
//     textDecoration: "none",
//     color: "#0066b2",
//     margin: "0 10px",
//     fontWeight: 500,
//     fontSize: "20px",
//   };

//   return (
//     <Container size="lg">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingTop: "10px",
//           paddingBottom: "20px",
//           paddingRight: "-80px",
//         }}
//       >
//         <h2 className="app-name">//PortfolioConnect //</h2>
//         {isLoggedIn ? (
//           <>
//             <NavLink to="/create-project" style={navLinkStyle}>
//               Create Project
//             </NavLink>
//             <NavLink to={`/user/${user._id}`} style={navLinkStyle}>
//               Profile
//             </NavLink>
//             <NavLink to={`/github/${user._id}`} style={navLinkStyle}>
//               Github Projects
//             </NavLink>
//             <NavLink to={`/otherUsers/${user._id}`} style={navLinkStyle}>
//               Other Users
//             </NavLink>
//             <Button onClick={handleLogout}>Logout</Button>
//           </>
//         ) : (
//           <>
//             <NavLink exact to="/" style={navLinkStyle} className="nav-link">
//               Home
//             </NavLink>
//             <NavLink to="/signup" style={navLinkStyle}>
//               Signup
//             </NavLink>
//             <NavLink to="/login" style={navLinkStyle}>
//               Login
//             </NavLink>
//             <NavLink to="/search-projects" style={navLinkStyle}>
//               All projects
//             </NavLink>
//           </>
//         )}
//       </div>
//     </Container>
//   );
// }

// export default Navbar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/Auth.context";
// import { Container, Text, Button } from "@mantine/core";

// function Navbar() {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
//   const navLinkStyle = {
//     textDecoration: "none",
//     color: "#0066b2",
//     fontWeight: 500,
//     fontSize: "20px",
//   };

//   return (
//     <Container size="lg">
//       <div className="navbar-container">
//         <h2 className="app-name">//PortfolioConnect//</h2>
//         <div className="nav-links">
//           {isLoggedIn ? (
//             <>
//               <NavLink to="/create-project" style={navLinkStyle}>
//                 Create Project
//               </NavLink>
//               <NavLink to={`/user/${user._id}`} style={navLinkStyle}>
//                 Profile
//               </NavLink>
//               <NavLink to={`/github/${user._id}`} style={navLinkStyle}>
//                 Github Projects
//               </NavLink>
//               <NavLink to={`/otherUsers/${user._id}`} style={navLinkStyle}>
//                 Other Users
//               </NavLink>
//               <Button onClick={handleLogout}>Logout</Button>
//             </>
//           ) : (
//             <>
//               <NavLink exact to="/" style={navLinkStyle}>
//                 Home
//               </NavLink>
//               <NavLink to="/signup" style={navLinkStyle}>
//                 Signup
//               </NavLink>
//               <NavLink to="/login" style={navLinkStyle}>
//                 Login
//               </NavLink>
//               <NavLink to="/search-projects" style={navLinkStyle}>
//                 All projects
//               </NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Container, Button } from "@mantine/core";

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
              <NavLink to={`/github/${user._id}`} className="nav-link">
                Github Projects
              </NavLink>
              <NavLink to={`/otherUsers/${user._id}`} className="nav-link">
                Other Users
              </NavLink>
              <Button onClick={handleLogout} className="nav-link">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink exact to="/" className="nav-link">
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
