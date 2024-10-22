import React from 'react'
import { useSelector } from 'react-redux'
import MusicCard from './MusicCard'
import '../../css/music-beat.css'

function Favorites() {

  const favoritesArray = useSelector((state)=>state.favorite.favoritesArray)
  console.log(favoritesArray);

  return (
    <div className="favorite">
      <div className="content">
        <center>
        <h1>Play Your Favorite Song</h1>
        </center>
      </div>
      <center>
      <div className="items">
        {
          favoritesArray.length>0 ? favoritesArray.map((items,idx)=>{

            console.log(items.songname
            );
            return <MusicCard
            image={items.image} 
            key={idx}
            songname={items.songname}
            id={items.id}
            status={true}
            />

          }) : <h1 className='add-your-fav'>Please Add Your Favorite</h1>
        }
      </div>
      </center>
    </div>
  )
}

export default Favorites