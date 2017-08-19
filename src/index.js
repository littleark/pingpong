import React from 'react';
import ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import { selectTimestamps, fetchData } from './actions'

import mainReducer from './reducers'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middleware = [thunkMiddleware, loggerMiddleware]

const enhancer = composeEnhancers(
      applyMiddleware(...middleware),
      // other store enhancers if any
    );

const store = createStore(mainReducer, enhancer);

const now = +new Date()
const days = 10
const day = 60 * 60 * 24 * 1000
const timestamps = {endTs: now, startTs: now - 10 * day}

store.dispatch(selectTimestamps(timestamps))

store
  .dispatch(fetchData(timestamps))
  .then(() => console.log(store.getState()))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

registerServiceWorker();
