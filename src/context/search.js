import React from 'react';

const SearchContext = React.createContext();

const initialState = {
  result: [],
  playList: [],
  playListName: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'search/result':
      return {
        ...state,
        result: action.payload,
      };
    case 'search/addTrack':
      return {
        ...state,
        playList: [...state.playList, action.payload],
      };
    case 'search/removeTrack':
      return {
        ...state,
        playList: state.playList.filter(
          (track) => track.id !== action.payload.id
        ),
      };
    case 'search/resetPlayList':
      return {
        ...state,
        playList: [],
        playListName: '',
      };
    case 'search/playListName':
      return {
        ...state,
        playListName: action.payload,
      };
    default:
      return initialState;
  }
};

const SearchProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export { SearchProvider, useSearch };
