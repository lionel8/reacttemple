// IE polyfill
import  "./polyfill";
import  "core-js/es";
import  "mutation-observer";
import  "react-app-polyfill/ie9";
import  "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import 'antd/dist/antd.css';
import './assets/style/common.css';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  //<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
