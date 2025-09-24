import { configureStore } from '@reduxjs/toolkit';
import locationSlice from "./slice/locationSlice"
import filterSlice from "./slice/filterSlice"

export const store = configureStore({
  reducer: {
    location: locationSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;