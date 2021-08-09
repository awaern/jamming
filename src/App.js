import React, { useEffect } from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Playlist } from './components/Playlist';
import { useSearch } from './context/search';
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
  const { state, dispatch } = useSearch();

  const savePlayList = () => {
    const trackURIs = state.playList.map((track) => track.uri);
    Spotify.savePlaylist(state.playListName, trackURIs).then(() => {
      dispatch({ type: 'search/resetPlayList' });
    });
  };

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  useEffect(() => {
    if (!state.playListName) return;
    savePlayList(); // eslint-disable-next-line
  }, [state.playListName]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="App">
        <Container maxWidth="md">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            <Playlist />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
