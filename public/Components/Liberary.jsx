
//Interface - 2
import React, { useEffect, useState } from "react";

const token = "<Use Your Token>";

async function fetchWebApi(endpoint, method = "GET", body) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error.message);
  }

  return await res.json();
}

function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPlaylistId, setCurrentPlaylistId] = useState(
    "<Use You Playlist ID>"
  ); // Example playlist ID

  useEffect(() => {
    const fetchPlaylistsAndTracks = async () => {
      try {
        const response = await fetchWebApi("me/playlists");
        setPlaylists(response.items);

        const tracksPromises = response.items.map(async (playlist) => {
          const tracksResponse = await fetchWebApi(
            `playlists/${playlist.id}/tracks`
          );
          return { playlistId: playlist.id, tracks: tracksResponse.items };
        });

        const allTracks = await Promise.all(tracksPromises);

        const tracksMap = {};
        allTracks.forEach((trackData) => {
          tracksMap[trackData.playlistId] = trackData.tracks;
        });
        setPlaylistTracks(tracksMap);
      } catch (error) {
        console.error("Error fetching playlists or tracks:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchPlaylistsAndTracks();
  }, []);

  return (
    <>
      <div className="library-container">
        {/* Header Section */}
        <div className="library-header">
          <h1>Your Playlists</h1>

          <iframe
            title="Spotify Embed: Recommendation Playlist "
            src={`https://open.spotify.com/embed/playlist/<Use You Playlist ID>?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: "530px" }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default Library;












