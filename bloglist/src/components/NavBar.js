import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ user, logout }) => {

  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#" as="span">
          <Link to='/blogs'>Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to='/users'>Users</Link>
        </Nav.Link>
        <Navbar.Collapse>
          <Navbar.Text>
            {user.name} logged in <button onClick={logout}>logout</button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  /* return <div style={styles.container}>
    <div style={styles.div}><Link to='/blogs'>Blogs</Link></div>
    <div style={styles.div}><Link to='/users'>Users</Link></div>
    <div style={styles.div}>{user.name} logged in <button onClick={logout}>logout</button></div>
  </div> */
};

export default NavBar;