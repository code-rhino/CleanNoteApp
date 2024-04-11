import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Notes reducer
const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.note];
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);
    default:
      return state;
  }
};

// User reducer
const userReducer = (state = { name: '' }, action) => {
  switch (action.type) {
    case 'SAVE_NAME':
      return { ...state, name: action.name };
    default:
      return state;
  }
};

// Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['notes', 'user'], // Specify which reducers should be persisted
};

const rootReducer = combineReducers({
  notes: notesReducer,
  user: userReducer, // Add the user reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Add any other actions that Redux Persist might fire
      },
    }),
});

export const persistor = persistStore(store);
