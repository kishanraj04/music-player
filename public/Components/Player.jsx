import React from 'react'
import { useParams } from 'react-router-dom'

function Player() {

  const {player} = useParams()
  const playlist = JSON.parse(localStorage.getItem('playlist'))
  
  const song = playlist.find((single)=> single.artists[0].id==player)
  const images = song.album.images[0].url

  return (
    <div className='player-container'>
       <img src={images} alt="" />
      <audio src={song.preview_url} controls></audio>
    </div>
  )
}

export default Player