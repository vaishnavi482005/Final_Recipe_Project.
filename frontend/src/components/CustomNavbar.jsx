import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import "./CustomNavbar.css"; // Ensure to add styles

const CustomNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Styled Brand Name */}
        <Navbar.Brand as={Link} to="/" className="brand-name">
          Tasty <span className="brand-highlight">Recipes</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/recipes">Explore Recipes</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="profile-link">
                  <FaUserCircle className="profile-icon" /> {user.username}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-btn">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
