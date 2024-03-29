import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

export default initialState => {
  initialState =
    JSON.parse(window.localStorage.getItem('state')) || initialState;
  const middleware = [thunk];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );

  store.subscribe(() => {
    const state = store.getState();
  });

  return store;
};