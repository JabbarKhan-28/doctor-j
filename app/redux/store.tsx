import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import doctorReducer from "./slices/doctorSlice";
import appointmentReducer from "./slices/appointmentSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
  },
});


// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;