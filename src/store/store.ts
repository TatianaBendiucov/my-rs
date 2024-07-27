import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./itemReducer";
import itemApi from "./listFetchReducer";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    // Add the API reducer to the store
    [itemApi.reducerPath]: itemApi.reducer,
  },
  // Add the API middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
