import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar} from 'react-bootstrap'
import {useAuth } from "../contexts/AuthContext"

function NavMenu() {

  const { currentUser, logout } = useAuth()

  // Navigation links
  const navBtn = {
    'Login': '/',
    'My List': '/shoppinglist',
    'My Profile': '/profile',
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
          {
            Object.entries(navBtn).map(([name, path], index) => {
              // If the user is logged in, skip the 'Login' link
              if (currentUser && name === 'Login') {
                return null
              }

              // If the user is NOT logged in, skip all links except 'Login'
              if (!currentUser && name !== 'Login') {
                return null
              }

              return (
                <Nav.Link as={Link} to={path} key={index}>
                  {name}
                </Nav.Link>
              )
            })
          }
        </Nav>
      </Navbar.Collapse>
      {currentUser ? (
        <button className='btn btn-danger' onClick={logout}>Logout</button>
        ) : (null)}

    </Container>
  </Navbar>
);
}

export default NavMenu
