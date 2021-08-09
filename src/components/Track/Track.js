import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Grow from '@material-ui/core/Grow';
import { useSearch } from '../../context/search';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export function Track(props) {
  const { dispatch, state } = useSearch();
  const classes = useStyles();

  const addTrack = () => {
    if (state.playList.find((savedTrack) => savedTrack.id === props.track.id)) {
      return;
    }
    dispatch({ type: 'search/addTrack', payload: props.track });
  };

  const removeTrack = () => {
    dispatch({ type: 'search/removeTrack', payload: props.track });
  };

  return (
    <Grow
      in={props.track ? true : false}
      style={{ transformOrigin: '0 0 0' }}
      {...(props.track ? { timeout: 1000 } : {})}
    >
      <Card className={classes.root}>
        <CardMedia
          component="img"
          className={classes.cover}
          image={props.track.albumImage}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.track.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.track.artist} | {props.track.album}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            {state.playList.find(
              (savedTrack) => savedTrack.id === props.track.id
            ) ? (
              <IconButton aria-label="remove track" onClick={removeTrack}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="add track" onClick={addTrack}>
                <AddCircleOutlineIcon />
              </IconButton>
            )}
          </div>
        </div>
      </Card>
    </Grow>
  );
}
