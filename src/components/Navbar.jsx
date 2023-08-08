// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/Auth.context";
// function Navbar() {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
//   return isLoggedIn ? (
//     <div className="navbar">
//       <NavLink to="/create-project">Create Project</NavLink>
//       <NavLink to={`/user/${user._id}`}>Profile</NavLink>
//       <NavLink to={`/github/${user._id}`}>Github Projects</NavLink>
//       <NavLink to={`/otherUsers/${user._id}`}>Other Users</NavLink>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   ) : (
//     <div className="navbar">
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/signup">Signup</NavLink>
//       <NavLink to="/login">Login</NavLink>
//       <NavLink to="/search-projects">All projects</NavLink>
//     </div>
//   );
// }
// export default Navbar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/Auth.context";
// import { Container, Button, Paper, Text, Badge } from "@mantine/core";

// function Navbar() {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
//   return (
//     <Paper padding="lg" shadow="sm" style={{ marginBottom: "20px" }}>
//       <Container size="lg">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <Text size="xl" weight={900}>
//               Exotic Navbar
//             </Text>
//           </div>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {isLoggedIn ? (
//               <>
//                 <NavLink to="/create-project">Create Project</NavLink>
//                 <NavLink to={`/user/${user._id}`}>Profile</NavLink>
//                 <NavLink to={`/github/${user._id}`}>Github Projects</NavLink>
//                 <NavLink to={`/otherUsers/${user._id}`}>Other Users</NavLink>
//                 <Button onClick={handleLogout} variant="light">
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <NavLink exact to="/">
//                   <Badge color="blue">Home</Badge>
//                 </NavLink>
//                 <NavLink to="/signup">
//                   <Badge color="teal">Signup</Badge>
//                 </NavLink>
//                 <NavLink to="/login">
//                   <Badge color="blue">Login</Badge>
//                 </NavLink>
//                 <NavLink to="/search-projects">
//                   <Badge color="purple">All projects</Badge>
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </Container>
//     </Paper>
//   );
// }

// export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Container, Text, Button } from "@mantine/core"; // Import Mantine components

function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const navLinkStyle = {
    textDecoration: "none",
    color: "blue", // Change this color to your desired text color
    margin: "0 10px", // Adjust margins as needed
    fontWeight: 500, // Change the font weight if desired
    fontSize: "20px", // Adjust font size as needed
  };

  return (
    <Container size="lg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div>
          <Text size="xl" weight={900}>
            // PortfolioConnect //{" "}
          </Text>
        </div>
        {isLoggedIn ? (
          <>
            <NavLink to="/create-project" style={navLinkStyle}>
              Create Project
            </NavLink>
            <NavLink to={`/user/${user._id}`} style={navLinkStyle}>
              Profile
            </NavLink>
            <NavLink to={`/github/${user._id}`} style={navLinkStyle}>
              Github Projects
            </NavLink>
            <NavLink to={`/otherUsers/${user._id}`} style={navLinkStyle}>
              Other Users
            </NavLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink exact to="/" style={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/signup" style={navLinkStyle}>
              Signup
            </NavLink>
            <NavLink to="/login" style={navLinkStyle}>
              Login
            </NavLink>
            <NavLink to="/search-projects" style={navLinkStyle}>
              All projects
            </NavLink>
          </>
        )}
      </div>
    </Container>
  );
}

export default Navbar;
