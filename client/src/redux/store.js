import { configureStore } from '@reduxjs/toolkit';
import { compose, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/root';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  composeEnhancer(applyMiddleware(reduxThunk))
);

export default store;
