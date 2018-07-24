// tslint:disable
import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App';
import configureStore from './redux/store/configureStore';
import './index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
