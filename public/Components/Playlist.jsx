import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import '../../css/music-beat.css'
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SongPattern from "./SongPattern";

export default function Playlist() {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  const [isPlaying, setIsPlaying] = useState(false);
  const [songImg, setSongImg] = useState({});
  const audioRef = useRef();

  function handleSongClick(e) {
    const songObj = playlist.find(single => single.artists[0].id === e.target.alt);
    const runningplayname = songObj.name; // Assuming you want to use the artist ID
    const song = songObj.preview_url;
    const images = songObj.album.images[0].url;
    setSongImg({ song, images, runningplayname });

    // Load and play the new song
    if (audioRef.current.src !== song) {
      audioRef.current.src = song;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  }

  function playPause() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  }

  return (
    <>
      <div className="playlist-containers">
        <div className="music-player">
          <img src={songImg.images} alt="" onClick={playPause} />
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)}></audio>

          <div className="icons">
            <GrCaretPrevious className="same" size={"2rem"} color="yellow"/>
            {isPlaying ? (
              <FaPause size={"2rem"} onClick={playPause} color="yellow" />
            ) : (
              <FaPlay size={"2rem"} onClick={playPause} color="brown" />
            )}
            <GrCaretNext className="same" size={"2rem"} color="yellow"/>
          </div>

          <div className="songpattern">
          <SongPattern li_num={14} height={'40px'} width={'10px'} zidx={'0'}/>
          </div>
        </div>

        <div className="music-name-list">
          <h1>Song List</h1>
          <ul>
            {playlist.map((item) => (
              <li
                key={item.id}
                className={item.name === songImg.runningplayname ? 'li-class playing' : ''}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {playlist.map((item) => (
          <SwiperSlide key={item.id} onClick={handleSongClick}>
            <img src={item.album.images[0].url} alt={item.artists[0].id} />
          </SwiperSlide>
        ))}
      </Swiper>

      
    </>
  );
}
