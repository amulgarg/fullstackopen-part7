import React from 'react';
import { Link } from 'react-router-dom'

const styles = {
  container: {
    display: 'flex',
    background: '#ccc',
    padding: '5px',
    boxSizing: 'border-box'
  },
  div: {
    marginRight: '5px'
  }
};

const NavBar = ({ user, logout }) => {
  return <div style={styles.container}>
    <div style={styles.div}><Link to='/blogs'>Blogs</Link></div>
    <div style={styles.div}><Link to='/users'>Users</Link></div>
    <div style={styles.div}>{user.name} logged in <button onClick={logout}>logout</button></div>
  </div>
};

export default NavBar;