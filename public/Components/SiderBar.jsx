import React, { useEffect } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { IoLibraryOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import SideBarLinks from './SideBarLinks';
import { PiPlaylistLight } from "react-icons/pi";



function SiderBar() {

   

  return (
    <div className='sidebar-container'>
        <img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-cute-chibi-boy-singing-song-png-image_12833142.png" alt="profile" />

        <div className='links-container'>
             <SideBarLinks icon={<MdFavoriteBorder size={"1.5rem"} color='yellow' />} title={"Favorites"} to="/favorites"/>
             <SideBarLinks icon={<IoLibraryOutline size={"1.5rem"} color='yellow' />} title={"Liberary"} to="/liberary"/>
             <SideBarLinks icon={<PiPlaylistLight size={"1.5rem"} color='yellow'/>} title={"Playlist"} to='/playlist'/>
        </div>

        <SideBarLinks icon={<FaSignOutAlt size={"1.5rem"} color='red'/>} title={"Signout"} to="/signout"/>
    </div>
  )
}

export default SiderBar