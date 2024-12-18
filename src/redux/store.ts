import { configureStore } from '@reduxjs/toolkit';
import chatbotReducer from '@/redux/chatbotSlice';
import blogReducer from '@/redux/blogSlice';
import contentCreationReducer from '@/redux/contentCreationSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
} from "redux-persist";
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

export function createPersistStore(): WebStorage {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedChatbotReducer = persistReducer(persistConfig, chatbotReducer);

export const store = configureStore({
  reducer: {
    chatbot: persistedChatbotReducer,
    blog: blogReducer,
    contentCreation: contentCreationReducer,  // Agregamos el slice aquí
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
