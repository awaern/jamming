import React from 'react';
import './SearchResults.css';
import { Tracklist } from '../TrackList/Tracklist';
import { useSearch } from '../../context/search';
export const SearchResults = (props) => {
  const { state } = useSearch();
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={state.result} onAdd={props.onAdd} isRemoval={false} />
    </div>
  );
};
