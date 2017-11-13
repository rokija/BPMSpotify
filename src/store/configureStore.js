import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
export const history = createHistory();
export function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    thunk,
    reactRouterMiddleware,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    reactRouterMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  /* istanbul ignore next */
  /* can't test hot reloading */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

/* istanbul ignore next */
/* can't simulate production mode for test environment*/
const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
