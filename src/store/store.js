import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { monthSlice } from "./month/monthSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";
import { courseSlice } from "./course/courseSlice";
import { appUserSlice } from "./appUser/appUserSlice";
import { guardDaySlice } from "./guardDay/guardDaySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    month: monthSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
    course: courseSlice.reducer,
    appUser: appUserSlice.reducer,
    guardDay: guardDaySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
