import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SearchProvider } from './context/search';

ReactDOM.render(
  <SearchProvider>
    <App />
  </SearchProvider>,
  document.getElementById('root')
);
