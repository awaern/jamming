import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tracklist } from '../TrackList';
import { useSearch } from '../../context/search';

const useStyles = makeStyles((theme) => ({
  searchResults: {
    width: '90%',
    margin: '0 auto',
    padding: theme.spacing(2),
  },
}));

export const SearchResults = () => {
  const { state } = useSearch();
  const classes = useStyles();

  return (
    <div className={classes.searchResults}>
      <h2>Results</h2>
      <Tracklist tracks={state.result} />
    </div>
  );
};
