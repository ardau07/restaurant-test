import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default (preloadedState = {}) => {
  const middlewares = [thunk, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(...enhancers)
  );

  return store;
};
