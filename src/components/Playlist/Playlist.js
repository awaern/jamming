import React, { useState } from 'react';
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

export const Playlist = (props) => {
  const [open, setOpen] = useState(false);
  const { state } = useSearch();
  const classes = useStyles();
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
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

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.list}>
          <TextField value={props.playListName} onChange={handleNameChange} />
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
                    <IconButton onClick={() => props.onRemove(track)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          <Button onClick={props.onSave} variant="contained">
            SAVE TO SPOTIFY
          </Button>
        </div>
      </Drawer>
      <Fab
        aria-label="Favorites"
        onClick={() => setOpen(true)}
        className={classes.fab}
      >
        <Favorite />
      </Fab>
    </>
  );
};
