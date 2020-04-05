import React, { useState } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlaylistName] = useState('New Playlist');
  const [playListTracks, setPlaylistTracks] = useState([]);

  const addTrack = track => {
    if (playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playListTracks, track]);
  };

  const removeTrack = track => {
    const filteredList = playListTracks.filter(
      savedTrack => savedTrack.id !== track.id
    );
    setPlaylistTracks(filteredList);
  };

  const updatePlaylistName = name => {
    setPlaylistName(name);
  };

  const savePlayList = () => {
    const trackURIs = playListTracks.map(track => track.uri);
    Spotify.savePlaylist(playListName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    })
  };

  const search = searchTerm => {
    Spotify.search(searchTerm).then(searchResults => {
      console.log(searchResults);
      setSearchResults(searchResults);
    })
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playListName={playListName}
            playListTracks={playListTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlayList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
