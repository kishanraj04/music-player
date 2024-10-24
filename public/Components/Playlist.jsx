import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import "../../css/music-beat.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SongPattern from "./SongPattern";

export default function Playlist() {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
  const [isPlaying, setIsPlaying] = useState(true);
  const [index_of_current_play_song, setIndex_Of_Current_Song] = useState(null);
  const [songImg, setSongImg] = useState({});
  const audioRef = useRef();

  const handlePreviousPlay = () => {

    if(index_of_current_play_song<0) return
    const prev_song_obj = playlist[index_of_current_play_song];
    console.log(prev_song_obj);
    const runningplayname = prev_song_obj.name; // Assuming you want to use the artist ID
    const song = prev_song_obj.preview_url;
    const images = prev_song_obj.album.images[0].url;
    setSongImg({ song, images, runningplayname });
    setIsPlaying(true);
    setIndex_Of_Current_Song((prev=>prev-1))

  };

  function nextSong() {
    if (songImg.runningplayname) {
      const index_of_next_song =
        playlist.findIndex((item) => item.name == songImg.runningplayname) + 1;
      const next_song_obj = playlist[index_of_next_song];
      if (index_of_next_song > playlist.length) return;
      const runningplayname = next_song_obj.name; // Assuming you want to use the artist ID
      const song = next_song_obj.preview_url;
      const images = next_song_obj.album.images[0].url;
      let index_of_current_song = index_of_next_song - 1;
      setSongImg({ song, images, runningplayname });
      setIndex_Of_Current_Song(index_of_current_song);
      setIsPlaying(true);
    }
  }

  function handleSongClick(e) {
    setIsPlaying(true);
    const songObj = playlist.find(
      (single) => single.artists[0].id === e.target.alt
    );
    const index_of_current_song = playlist.findIndex(
      (single) => single.artists[0].id === e.target.alt
    );
    console.log(index_of_current_song);
    const runningplayname = songObj.name; // Assuming you want to use the artist ID
    const song = songObj.preview_url;
    const images = songObj.album.images[0].url;
    setSongImg({ song, images, runningplayname });
    setIndex_Of_Current_Song(index_of_current_song-1);
    // Load and play the new song
    if (audioRef.current.src !== song) {
      audioRef.current.src = song;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  }

  function playPause() {
    if (audioRef.current) { // Ensure audioRef.current is defined
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    } else {
      console.error("Audio reference is not defined");
    }
  }


  function handleSongEnded()
  {
    const index = playlist.findIndex((item)=>item.name==songImg.runningplayname)+1
    if(index>=playlist.length) return

    const next_song_obj = playlist[index]
    const runningplayname = next_song_obj.name; // Assuming you want to use the artist ID
    const song = next_song_obj.preview_url;
    const images = next_song_obj.album.images[0].url;
    setSongImg({ song, images, runningplayname });
    setIndex_Of_Current_Song(index);
    setIsPlaying(true)

  }

  return (
    <>
      <div className="playlist-containers">
        <div className="music-player">
          {
            !songImg.images ? <h1>Play Your Song</h1> : <img src={songImg.images} alt="" onClick={playPause} />
          }
          <audio
            ref={audioRef}
            src={songImg.song}
            onEnded={() => {
              setIsPlaying(false);
              handleSongEnded()
            }}
            autoPlay
          ></audio>

          <div className="icons">
            <GrCaretPrevious
              className="same"
              size={"2rem"}
              color="yellow"
              onClick={() => {
                handlePreviousPlay();
              }}
            />
            {isPlaying ? (
              <FaPause size={"2rem"} onClick={playPause} color="yellow" />
            ) : (
              <FaPlay size={"2rem"} onClick={playPause} color="brown" />
            )}
            <GrCaretNext
              className="same"
              size={"2rem"}
              color="yellow"
              onClick={() => {
                nextSong();
              }}
            />
          </div>

          <div className="songpattern">
            <SongPattern
              li_num={14}
              height={"40px"}
              width={"10px"}
              zidx={"0"}
            />
          </div>
        </div>

        <div className="music-name-list">
          <h1>Song List</h1>
          <ul>
            {playlist.map((item) => (
              <li
                key={item.id}
                className={
                  item.name === songImg.runningplayname
                    ? "li-class playing"
                    : ""
                }
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
