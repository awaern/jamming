import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as Spotify from '../../util/Spotify';
import { useSearch } from '../../context/search';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '6.94rem',
    marginBottom: '6.33rem',
  },
}));

export const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useSearch();

  const classes = useStyles();

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then((searchResults) => {
      dispatch({ type: 'search/result', payload: searchResults });
    });
  };
  const handleSearch = (event) => {
    event.preventDefault();
    search(searchTerm);
  };

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className={classes.searchBar} noValidate autoComplete="off">
      <FormControl fullWidth variant="outlined">
        <InputLabel
          htmlFor="input-search"
          classes={{ formControl: classes.root }}
        >
          Enter A Song, Album, or Artist
        </InputLabel>
        <OutlinedInput
          id="input-search"
          variant="outlined"
          label=" Enter A Song, Album, or Artist"
          onChange={handleTermChange}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Search"
                onClick={handleSearch}
                type="submit"
                classes={{
                  root: classes.root,
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          classes={{
            input: classes.root,
          }}
        />
      </FormControl>
    </form>
  );
};
