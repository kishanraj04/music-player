import React from 'react'
import { useParams } from 'react-router-dom'
import '../../css/music-beat.css'
import SongPattern from './SongPattern'

function Player() {

  
  const {player} = useParams()
  const playlist = JSON.parse(localStorage.getItem('playlist'))
  const song = playlist.find((single)=> single.artists[0].id==player)
  const images = song.album.images[0].url

  return (
    <div className='main-player-container'>
      <div className='player-container'>
       <img src={images} alt="" />
      <audio src={song.preview_url} controls></audio>
    </div>

    <SongPattern li_num={17}/>

    </div>
  )
}

export default Player