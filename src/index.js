import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore } from 'redux'
import rootReducer from './store/modules'

const store = createStore(rootReducer)
console.log(store.getState())

ReactDOM.render(
  <App />
  , document.getElementById('root'));
