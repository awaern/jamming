import React from 'react';
import './Playlist.css';
import { Tracklist } from '../TrackList/Tracklist';

export const Playlist = props => {
  const handleNameChange = event => {
    props.onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input value={props.playListName} onChange={handleNameChange} />
      <Tracklist
        tracks={props.playListTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
};
