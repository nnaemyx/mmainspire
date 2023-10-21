import { configureStore } from "@reduxjs/toolkit";


// Creating our store and combining all slices
export const store = configureStore({
  reducer: {
    
  },
  devTools: true,
});