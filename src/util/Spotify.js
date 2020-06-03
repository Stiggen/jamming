// https://developer.spotify.com/dashboard/applications


const clientId = 'bc96bd5bc20d425c84cfebd5c80f67b0';
const redirectUri = "http://localhost:3000/";
let accessToken;
let expiresIn;
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token`;

const Spotify = {
  getAccessToken(){
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if(accessToken){
        return accessToken;
    }
    else if(urlAccessToken && urlExpiresIn){
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(()=>accessToken = '', expiresIn * 10000);
      window.history.pushState('Acess Token', null, '/');
    }
    else{
      window.location = spotifyUrl;
    }
  },
  search(term){
  const accessToken = this.getAccessToken();
   const searchUrl=`https://api.spotify.com/v1/search?type=track&q=${term}`;
   return fetch(searchUrl,{headers:{Authorization:`Bearer ${accessToken}`}})
    .then((response)=>response.json())
    .then((jsonResponse)=>{
        if (!jsonResponse.tracks)return [];
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
  },
  savePlaylist(name, uriTracks){
    if(!name && !uriTracks){
      return ;
    }
    else {
     const accessToken = this.getAccessToken();
      let headers = {Authorization: `Bearer ${accessToken}`};
      let userId ; 
      
      return fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then((response)=> response.json())
      .then((jsonResponse)=>{
        userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
      {headers:headers, method:'POST', body:JSON.stringify({name:name})})
      })
      .then((response)=>response.json())
      .then((jsonResponse)=>{
        let playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
       {headers:headers, method: 'POST', body:JSON.stringify({uris:uriTracks})})
      })
      /*.then((response)=> {return response.json();})
      .then((jsonResponse)=>{
        let playlistId = jsonResponse.snapshot_id;
        return playlistId;}); */
    }
  }
}


export default Spotify;