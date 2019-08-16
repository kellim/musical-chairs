import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NavBar.css'

function NavBar(props) {

  return (
    <nav className="NavBar">
      <div className="NavBar-title-container">
        <Link to="/">
          <h1 className="NavBar-title">Musical Chairs:</h1>
          <h2 className="NavBar-subtitle">Automated</h2>
        </Link>
      </div>
      <div className="NavBar-link-list">
        <ul>
          <li><Link to="/instructions">Instructions</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar