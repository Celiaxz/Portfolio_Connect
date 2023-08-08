import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";
import { Container, Text, Button } from "@mantine/core";
function Navbar() {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const navLinkStyle = {
    textDecoration: "none",
    color: "#0066b2",
    margin: "0 10px",
    fontWeight: 500,
    fontSize: "20px",
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
        <Text size="xl" weight={900}>
          // PortfolioConnect //{" "}
        </Text>

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
