import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../../src/index.css'

function SideBarLinks({icon,title,to}) {

  const location = useLocation().pathname
  const isActive = location===to ? 'exist activeClass' : 'exist'
  console.log(isActive);
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