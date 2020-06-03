import React from 'react';
import './Playlist.css';
import Tracklist from '../TrackList/TrackList';

//Pass playlist information down to tracklist 
class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
              <input value={this.props.playlistName} onChange={this.handleNameChange} />
              <Tracklist 
              tracks={this.props.playlistTracks} 
              onRemove={this.props.onRemove}
              isRemoval={true}
              />
              <button  
              className="Playlist-save" 
              onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}
export default Playlist;