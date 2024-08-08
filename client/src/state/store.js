import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./api/todoApis";
const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export default store;
