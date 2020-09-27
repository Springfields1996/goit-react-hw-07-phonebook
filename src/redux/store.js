import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { applyMiddleware } from 'redux';
import { rootReducer } from './reduces/reducer';
import { logger } from './middleware';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig);

const middlewares = [logger];

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(...middlewares),
);

persistStore(store);
