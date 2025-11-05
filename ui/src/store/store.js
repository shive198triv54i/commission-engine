import { configureStore } from '@reduxjs/toolkit';
import commissionReducer from './slices/commissionSlice';

export const store = configureStore({
  reducer: {
    commission: commissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        
        ignoredActions: [],
      },
    }),
});



export default store;

