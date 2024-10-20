import React from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";


function MusicCard({image,auther,id}) {

  return (
    
        <div className='music-card'>
        <img src={image} alt="" />
        <Link to={`/${id}`} className='link'>
        <label htmlFor={auther}>{auther}</label>
        </Link>
        <CiHeart className='icon' size={'1.5rem'}/>
    </div>
    
  )
}

export default MusicCard