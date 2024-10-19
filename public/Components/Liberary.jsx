import React, { useEffect, useState } from 'react';
import { spotifyApi } from '../../spotify';

function Library() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await spotifyApi.get('me/playlists');
        console.log('Response:', response); // Log the entire response
        setPlaylists(response.data.items); // Set the playlists
      } catch (error) {
        console.error('Error fetching playlists:', error.response ? error.response.data : error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Your Playlists</h1>
      {playlists.length > 0 ? (
        <ul>
          {playlists.map(playlist => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      ) : (
        <p>No playlists found.</p>
      )}
    </>
  );
}

export default Library;
