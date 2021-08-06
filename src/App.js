import React, { useState, useEffect } from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';
import { SearchProvider } from './context/search';
import * as Spotify from './util/Spotify';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  highlight: {
    color: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <h1>
      Ja<span className={classes.highlight}>mm</span>ing
    </h1>
  );
};

function App() {
  const [playListName, setPlaylistName] = useState('New Playlist');
  const [playListTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const removeTrack = (track) => {
    const filteredList = playListTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    setPlaylistTracks(filteredList);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlayList = () => {
    const trackURIs = playListTracks.map((track) => track.uri);
    Spotify.savePlaylist(playListName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="App">
        <Container maxWidth="md">
          <SearchProvider>
            <SearchBar />
            <div className="App-playlist">
              <SearchResults />
              <Playlist
                playListName={playListName}
                playListTracks={playListTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlayList}
              />
            </div>
          </SearchProvider>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
