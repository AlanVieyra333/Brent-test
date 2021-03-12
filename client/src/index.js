import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import jwt_decode from 'jwt-decode'

import "antd/dist/antd.css";

import App from './App';
import reportWebVitals from './reportWebVitals';

import authReducer from "./reducers/auth";

import { watchAuth } from "./sagas";

import setAuthToken from "./utils/setAuthToken";
import { signinSuccess } from "./actions/auth";

const composeEnhancers = compose;
// process.env.NODE_ENV === "development"
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);

//  Check for token
if (localStorage.jwtToken) {
  //  Set auth token header
  setAuthToken(localStorage.jwtToken);

  const user = jwt_decode(localStorage.jwtToken);

  store.dispatch(signinSuccess(user));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
