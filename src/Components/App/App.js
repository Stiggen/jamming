import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                      searchResults:[],
                      playlistName: 'New Playlist',
                      playlistTracks: []
                  };     
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    }
    //functionality to add a track to the Playlist
    addTrack(track){
      let tracks = this.state.playlistTracks;
      if(tracks.find(savedTrack=>savedTrack.id=== track.id)){
        return; 
      } 
      else{
        tracks.push(track);
        this.setState({playlistTracks:tracks})
      /*More complicated method using callback function in setState and concat() on playlistTracks
        if(!this.state.playlistTracks.find(savedTrack=> savedTrack.id === track.id)){
        this.setState((prevState)=>{return {playlistTracks:prevState.playlistTracks.concat(track)}});
      */
      }
    }
    //functionality to remove a track to the Playlist. Was previously removing all tracks
    // but selected track so I did the not (!) equal to to fix.
    removeTrack(track){
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(savedTrack=>savedTrack.id !==track.id);
      this.setState({playlistTracks:tracks});
      /* More compllicated method using a callback function in setState
        this.setState((prevState)=>{return{playlistTracks:prevState.playlistTracks.filter(savedTrack=> 
            savedTrack.id !==track.id)}}); */
        }
    
    updatePlaylistName(name){
      this.setState({playlistName:name});
    }

    //Create an array of URI numbers from playlistTracks to be 
    //sent to Spotify and saved under the input name.  
    savePlaylist(){
      let trackURIs = this.state.playlistTracks.map(track=>track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(()=>{
      this.setState({playlistName:'New Playlist',  playlistTracks:[]})
      });
    }

    search(term){
        Spotify.search(term)
        .then(searchResults=> this.setState({searchResults:searchResults}));
    }

    //Pass Search Results (currently hardcoded) and onAdd method to SearchResults component
    //and pass playlist Name, Tracks and onRemove method to Playlist component
    render() {
        return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar
              onSearch={this.search}
              />
              <div className="App-playlist">
                <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack} 
                
                />
                <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange= {this.updatePlaylistName}
                onSave= {this.savePlaylist}
                />
              </div>
            </div>
          </div>
        );
    }
}
export default App;