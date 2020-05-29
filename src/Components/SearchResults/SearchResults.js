import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

//Pass search results and onAdd(isRemoval value set to false) from App down to Tracklist
class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
              <h2>Results</h2>
                <TrackList 
                tracks={this.props.searchResults} 
                onAdd={this.props.onAdd} 
                isRemoval={false} 
                />
            </div>
        );
    }
}
export default SearchResults;