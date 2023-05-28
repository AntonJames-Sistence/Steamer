import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';


const store = configureStore();

// for testing purposes, has to be removed later
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

// wrapper component to provide access to redux store
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

// wrapper function to allow restoring of X-CSRF-Token
const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// logic for restoring session by storing currentUser and X-CSRF-Token in browser sessionStorage
if (  sessionStorage.getItem("X-CSRF-Token") === null ||
      sessionStorage.getItem("currentUser") === null ) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
};