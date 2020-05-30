const clientId = 'bc96bd5bc20d425c84cfebd5c80f67b0';
const redirectURI = "http://localhost:3000/";
let accessToken = {};
let expiresIn = {};
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

const Spotify = {
  getAccessToken(){
    if(accessToken){
        return accessToken;
    }
    else if(window.location.href.match(/access_token=([^&]*)/ && /expires_in=([^&]*)/)){
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(()=>accessToken = '', expiresIn * 1000);
      window.history.pushState('Acess Token', null, '/');
    }
    else{
      return window.location.spotifyURL;
    }
  },
  search(term){
   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {headers:{Authorization:`Bearer ${accessToken}`}})
    .then((response)=>{
            return response.json();
        })
    .then((jsonResponse)=>{
        if (!jsonResponse.tracks){
            return [];
        }
        else{
          return jsonResponse.tracks.items.map(track=>
            {
            return {
            id:track.id,
            name:track.name,
            artist:track.artists[0].name,
            album:track.album.name,
            uri:track.uri
          }
        })
        }
    });
  }
}


export default Spotify;