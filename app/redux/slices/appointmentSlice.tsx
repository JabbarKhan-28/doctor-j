import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment, UserProfile } from "@/app/types";

interface AppointmentState {
  appointments: Appointment[];
  currentUser: UserProfile | null;
}

const getInitialState = (): AppointmentState => {
  if (typeof window !== "undefined") {
    try {
      const storedAppointments = localStorage.getItem("doctor_j_appointments");
      const storedUser = localStorage.getItem("doctor_j_user");
      return {
        appointments: storedAppointments ? JSON.parse(storedAppointments) : [],
        currentUser: storedUser ? JSON.parse(storedUser) : null,
      };
    } catch (e) {
      console.error("Error loading state from localStorage", e);
    }
  }
  return {
    appointments: [],
    currentUser: null,
  };
};

const initialState: AppointmentState = getInitialState();

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    bookAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("doctor_j_appointments", JSON.stringify(state.appointments));
      }
    },
    cancelAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === action.payload
          ? { ...appointment, status: "cancelled" }
          : appointment
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("doctor_j_appointments", JSON.stringify(state.appointments));
      }
    },
    setCurrentUser(state, action: PayloadAction<UserProfile>) {
      state.currentUser = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("doctor_j_user", JSON.stringify(action.payload));
      }
    },
    clearCurrentUser(state) {
      state.currentUser = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("doctor_j_user");
      }
    },
  },
});

export const {
  bookAppointment,
  cancelAppointment,
  setCurrentUser,
  clearCurrentUser,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
