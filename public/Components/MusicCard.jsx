import React from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, removeFavorites } from '../../store/favoritesSlice';


function MusicCard({image,id,icon,status,songname}) {

  
  const dispatch = useDispatch()


  return (
    
        <div className='music-card'>
        <img src={image} alt="" />
        <Link to={`/${id}`} className='link'>
        <label htmlFor={songname}>{ songname}</label>
        </Link>
        
        {
          !status ? <CiHeart className='icon' size={'1.5rem'} onClick={()=>  dispatch(addFavorites({image,id,songname,status:true}))}/> : <FaHeart className='icon' size={'1.5rem'} onClick={()=>{dispatch(removeFavorites({id}))}}/>
        }
      
    </div>
    
  )
}

export default MusicCard