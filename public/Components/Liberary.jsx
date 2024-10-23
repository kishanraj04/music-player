import React, { useEffect, useRef, useState } from 'react';
import MusicCard from './MusicCard';
import '../../src/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../store/favoritesSlice';


function Library() {
  const [playlists, setPlaylists] = useState([]);
  const song_name = useRef('')
  const [query,setQuery] = useState('')
  const favoritesArray = useSelector((state) => state.favorite.favoritesArray);
  const playlist = JSON.parse(localStorage.getItem('playlist'))
  

  
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
  
 const dispatch = useDispatch()
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
          
          const findItem = favoritesArray.find((value)=>value.songname==items.name)
         
          if(findItem)
          {
            return <MusicCard
            image={items.album.images[0].url} 
            key={idx}
            auther={items.album.artists[0].name}
            id={items.artists[0].id}
            status={true}
            songname={items.name}
            />
          }
          else
          {
            return <MusicCard
            image={items.album.images[0].url} 
            key={idx}
            auther={items.album.artists[0].name}
            id={items.artists[0].id}
            status={false}
            songname={items.name}
            />
          }
     
        })
      }
      </div>
      </div>
    </>
  );
}

export default Library;
