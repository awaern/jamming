import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  TextField,
  Button,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Favorite, Delete } from '@material-ui/icons';
import { useSearch } from '../../context/search';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    padding: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: 10,
    right: 10,
  },
}));

export const Playlist = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [fontSize, setFontSize] = useState('');
  const { state, dispatch } = useSearch();
  const classes = useStyles();

  const savePlayList = () => {
    dispatch({
      type: 'search/playListName',
      payload: input,
    });
    setInput('');
  };

  const resetPlayList = () => {
    dispatch({ type: 'search/resetPlayList' });
    setInput('');
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  useEffect(() => {
    if (!state.playList.length) return;
    setFontSize('large');
    const hello = setTimeout(() => {
      setFontSize('');
    }, 600);
    return () => clearTimeout(hello);
  }, [state.playList]);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className={classes.list}>
          <TextField
            label="New Playlist"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          {state.playList.length > 0 && (
            <List>
              {state.playList.map((track) => (
                <ListItem key={track.id}>
                  <ListItemText
                    primary={track.name}
                    secondary={
                      <>
                        {track.artist} | {track.album}
                      </>
                    }
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        dispatch({
                          type: 'search/removeTrack',
                          payload: track,
                        })
                      }
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          <Button onClick={savePlayList} variant="contained" color="primary">
            Save to Spotify
          </Button>
          {state.playList.length > 0 && (
            <Button onClick={resetPlayList} color="secondary">
              Reset Playlist
            </Button>
          )}
        </div>
      </Drawer>
      <Fab
        aria-label="Favorites"
        onClick={() => setOpen(true)}
        className={classes.fab}
      >
        <Favorite
          color={state.playList.length ? 'secondary' : ''}
          fontSize={fontSize}
          style={{ transition: 'font-size 0.3s' }}
        />
      </Fab>
    </>
  );
};
