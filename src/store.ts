import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer, { RootState } from './reducers';
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActionType } from './types/types';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const configureStore = (preloadedState: any) => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(thunk as ThunkMiddleware<RootState, AppActionType>)
    ),
  )
);

const store = configureStore({});

export default store;
