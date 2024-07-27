import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  items: {
  },
};

const mockStore = configureStore({
  reducer: {},
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;

export { mockStore };