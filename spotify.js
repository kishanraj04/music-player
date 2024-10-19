import axios from 'axios'

const authEndpoint = 'http://accounts.spotify.com/authorize';
const clientId = 'eebed9394a82489a86d9d3ab7dffa637';
const redirectUri = 'http://localhost:5173/';
const scope = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope.join(" "))}&response_type=token&show_dialog=true`;


export  const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
  });


const setClientToken = (token)=>
{
    spotifyApi.interceptors.request.use(async (config) => {
        const token = localStorage.getItem('token'); // or wherever you store the token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
}

export default setClientToken