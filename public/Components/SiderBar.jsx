import React, { useEffect } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import SideBarLinks from './SideBarLinks';
import { spotifyApi } from '../../spotify';


function SiderBar() {

    useEffect(()=>{
        spotifyApi.get("me").then((res)=>console.log(res))
    },[])

  return (
    <div className='sidebar-container'>
        <img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-cute-chibi-boy-singing-song-png-image_12833142.png" alt="profile" />

        <div className='links-container'>
             <SideBarLinks icon={<MdFavoriteBorder size={"1.5rem"} color='red' />} title={"Favorites"} to="/favorites"/>
             <SideBarLinks icon={<FaFire size={"1.5rem"} color='red'/>} title={"Trending"} to="/trending"/>
             <SideBarLinks icon={<IoLibraryOutline size={"1.5rem"} color='red'/>} title={"Liberary"} to="/liberary"/>
             <SideBarLinks icon={<FaRegPlayCircle size={"1.5rem"} color='red'/>} title={"Play"} to='/player'/>
        </div>

        <SideBarLinks icon={<FaSignOutAlt size={"1.5rem"} color='red'/>} title={"Signout"} to="/signout"/>
    </div>
  )
}

export default SiderBar