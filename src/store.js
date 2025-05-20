import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const APP_VERSION = "1.0";

const persistConfig = {
  key: "root",
  storage,
  version: APP_VERSION,
  migrate: (state) => {
    const currentVersion = state?._persist?.version;
    if (currentVersion !== APP_VERSION) {
      // When the version is different, clear the persisted data
      storage.removeItem("persist:root"); // Removes the persisted state from storage
      return Promise.resolve(undefined); // Forces app to start fresh
    }
    return Promise.resolve(state);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

// persistor.subscribe(() => {
//   const state = store.getState();
//   console.log(" Rehydrated state:", state);
// });

export { store, persistor };
