import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

//Map the tracks to the Track component according to track and track id
// as well as pass onAdd/onRemove methods and isRemoval value
class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
              {this.props.tracks.map(track=> <Track 
               track={track} 
               key={track.id} 
               onAdd={this.props.onAdd} 
               onRemove={this.props.onRemove}
               isRemoval={this.props.isRemoval}
              />)}
            </div>
        );
    }
}
export default TrackList;