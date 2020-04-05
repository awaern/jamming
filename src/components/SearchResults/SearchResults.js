import React from 'react';
import './SearchResults.css';
import { Tracklist } from '../TrackList/Tracklist';

export const SearchResults = props => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
    </div>
  );
};
