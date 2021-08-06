import React from 'react';

import Grid from '@material-ui/core/Grid';
import './Tracklist.css';
import { Track } from '../Track/Track';

export const Tracklist = (props) => {
  return (
    <Grid container spacing={2}>
      {props.tracks.map((track) => (
        <Grid item xs={4} key={track.id}>
          <Track
            track={track}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval}
          />
        </Grid>
      ))}
    </Grid>
  );
};
