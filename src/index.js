import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { WrappedApp, store } from './App';

ReactDOM.render(
	<Provider store={store}>
    <WrappedApp />
  </Provider>,
	document.getElementById('root')
);
