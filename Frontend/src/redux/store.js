import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";

const persistConfig = {
  key: "root", // Key for the local storage entry
  storage, // Storage to use (e.g., localStorage)
  version: 1, // Version of the persisted state
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company : companySlice,
});
// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
