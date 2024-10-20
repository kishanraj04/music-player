import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../../src/index.css'

function SideBarLinks({icon,title,to}) {

  function containsNumber(str) {
    return str.match(/\d/) !== null;
  }

  const location = useLocation().pathname
  // console.log(location , location.length);
  const isActive = location===to ? 'exist activeClass' : 'exist'

  return (
    <NavLink to={to} className="nav-link">
        <div className={isActive}>
        <button >{icon}</button>
        
    </div>
    <label htmlFor={title}>{title}</label>
    </NavLink>
  )
}

export default SideBarLinks