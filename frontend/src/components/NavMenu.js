import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar} from 'react-bootstrap'

function NavMenu() {

  // Navigation links
  const navBtn = {
    'Dashboard': '/',
    'My List': '/shoppinglist',
    'My Profile': '/profile'
  }

  return (
    <Navbar expand="lg" bg='primary' data-bs-theme="dark">
    <Container>
      {/* Hamburger menu icon */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        {/* Navigation links */}
        <Nav className="me-auto">
          {/* Custom Navigation Buttons */}
          {Object.entries(navBtn).map(([name, path], index) => (
            <Nav.Link as={Link} to={path} key={index}>
              {name}
            </Nav.Link>
          ))}

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default NavMenu
