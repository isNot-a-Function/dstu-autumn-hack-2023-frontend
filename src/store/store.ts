import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authServices";
import { userApi } from "../services/userServices";
import { flightApi } from "../services/flightService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { chatApi } from "../services/chatServices";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [flightApi.reducerPath]: flightApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(flightApi.middleware)
      .concat(chatApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
