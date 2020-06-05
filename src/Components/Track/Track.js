import React from 'react';
import './Track.css';

//Render the Tracks and add track and remove track methods with functionality
class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    //add track passed down from Tracklist
    addTrack(){
      this.props.onAdd(this.props.track);
    }
    
    //remove track passed down from Tracklist
    removeTrack(){
      this.props.onRemove(this.props.track);
    }

    //UI functionality for clicking on a track to be add/removed    
    renderAction(){
        if(this.props.onAdd){
        return <a className='Track-action' onClick={this.addTrack}>+</a>;
        } else if(this.props.onRemove){
            return <a className='Track-action' onClick={this.removeTrack}>-</a>;
        }    
      }
      songPreview(){
        if(this.props.track.preview){
          return <video className="Track-sample" controls src={this.props.track.preview} type="audio/mpeg"></video>;
        }
        else return;
      }
    //Render track method
    render() {
        return (
            <div className="Track">
              <div className="Track-information">
                 <h3>{this.props.track.name}</h3>
                  <div className="Track-sample">{this.songPreview()}</div>
                 <p>{this.props.track.artist} | {this.props.track.album}</p>
              </div>
              <button className='Track-action'>{this.renderAction()}</button>
            </div>
        );
        }
}
export default Track;