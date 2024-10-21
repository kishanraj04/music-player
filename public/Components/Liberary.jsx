import React, { useEffect, useRef, useState } from 'react';
import MusicCard from './MusicCard';
import '../../src/index.css'


function Library() {
  const [playlists, setPlaylists] = useState([]);
  const song_name = useRef('')
  const [query,setQuery] = useState('')

  const playlist = JSON.parse(localStorage.getItem('playlist'))
  // console.log(playlist[0]);
  if(playlists==null)
  {
    return 
  }


  function handleSubmit(e)
  {
    e.preventDefault()
    const song = song_name.current.value  
    setQuery(song)

  
    const fetchData = async () => {
      try {
        
          const res = await fetch(`https://v1.nocodeapi.com/kishanraj/spotify/LtVhOKDMyrAUDrWp/search?q=${query}&type=track`)
          const playlist = (await res.json()).tracks.items
          setQuery()
          localStorage.setItem('playlist',JSON.stringify(playlist))
          
    
      } catch (error) {
        console.error('Error fetching playlists:', error.response ? error.response.data : error);
      }
    };

    fetchData();

  }
 console.log(playlist);
  return (
    <>
      
      <div className="form-container">
      <form action="" className='form' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search The Song' ref={song_name} required/>
        <button>Search</button>
      </form>
     
      <div className="music-container">
      {
        playlist.map((items,idx)=>
        {
          return <MusicCard
          image={items.album.images[0].url} 
          key={idx}
          auther={items.album.artists[0].name}
          id={items.artists[0].id}
          />
        })
      }
      </div>
      </div>
    </>
  );
}

export default Library;
