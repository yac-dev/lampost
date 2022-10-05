import { configureStore } from '@reduxjs/toolkit';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/root';

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
  // composeEnhancers(
  //   applyMiddleware(reduxThunk)
  //   // other store enhancers if any
  // )
);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = configureStore(
//   {
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//   },
//   composeEnhancers(applyMiddleware(reduxThunk))
// );

export default store;
