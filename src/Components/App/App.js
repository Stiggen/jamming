import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchResults:[
            {
              name:'Ramble On', 
              artist:'Led Zeppelin', 
              album: 'Led Zeppelin II', 
              id: 'Track 4',
            },
            {
              name:'Tiny Dancer',
              artist:'Elton John',
              album: 'A Sides',
              id: 'Track7'
            },
            {
              name:'Whole Lotta Love',
              artist:'Led Zeppelin',
              album:'Led Zeppelin',
              id: 'Track 2'
            }
        ],
            playlistName: 'Rock',
            playlistTracks: [{
                name: '',
                artist:'' ,
                album:'' ,
                id : ''
            }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    }
    //functionality to add a track to the Playlist
    addTrack(track){
       if(!this.state.playlistTracks.find(savedTrack=> savedTrack.id === track.id)){
        this.setState((prevState)=>{return {playlistTracks:prevState.playlistTracks.concat(track)}});
      }
    }
    //functionality to remove a track to the Playlist. Was previously removing all tracks
    // but selected track so I did the not (!) equal to to fix.
    removeTrack(track){
        this.setState((prevState)=>{return{playlistTracks:prevState.playlistTracks.filter(savedTrack=> 
            savedTrack.id !==track.id)}});
        }
    
    //Pass Search Results (currently hardcoded) and onAdd method to SearchResults component
    //and pass playlist Name, Tracks and onRemove method to Playlist component
    render() {
        return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
              <SearchBar />
              <div className="App-playlist">
                <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack} 
                />
                <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                />
              </div>
            </div>
          </div>
        );
    }
}
export default App;