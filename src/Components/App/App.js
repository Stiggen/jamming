import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchResults:[],
                      playlistName: 'Rock',
                      playlistTracks: [{
                        name: '',
                        artist:'' ,
                        album:'' ,
                        id : ''
                        }
                    ]};
           /*Hard(ROCK!) coded tracks
            [
            {
              name:'Ramble On', 
              artist:'Led Zeppelin', 
              album: 'Led Zeppelin II', 
              id: 'Track 4',
            },
            {
              name:'Good Times Bad Times',
              artist:'Led Zeppelin',
              album: 'Led Zeppelin',
              id: 'Track 1'
            },
            {
              name:'Whole Lotta Love',
              artist:'Led Zeppelin',
              album:'Led Zeppelin',
              id: 'Track 2'
            }
        ],
        */
            
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayistName = this.updatePlayistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
    
    updatePlayistName(name){
      this.setState({playlistName:name});
    }

    //Create an array of URI numbers from playlistTracks to be 
    //sent to Spotify
    savePlaylist(){
        let trackURIs = [this.state.playlistTracks.map()];
    }

    search(term){
        Spotify.search(term)
        .then(searchResults=>this.setState({searchResults:searchResults}));
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
                onNameChange= {this.updatePlayistName}
                onSave= {this.savePlaylist}
                />
              </div>
            </div>
          </div>
        );
    }
}
export default App;