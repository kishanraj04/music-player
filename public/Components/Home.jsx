import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SiderBar from "./SiderBar";
import "../../src/index.css";

function Home() {
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(localStorage.getItem('playlist')==null)
        {
          
          const res = await fetch('https://v1.nocodeapi.com/kishanraj/spotify/LtVhOKDMyrAUDrWp/search?q=daku&type=track')
          const playlist = (await res.json()).tracks.items
          console.log(playlist);
          localStorage.setItem('playlist',JSON.stringify(playlist))
          
        }
      } catch (error) {
        console.error('Error fetching playlists:', error.response ? error.response.data : error);
      }
    };

    fetchData();
  }, []);

  return (
 
      <div className="main-body">
        <SiderBar />
        <div className="routing">
          <Outlet /> {/* Use Outlet as a component */}
        </div>
      </div>

  );
}  

export default Home;
