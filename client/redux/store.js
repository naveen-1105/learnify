import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./feature/api/apiSlice";
import { authSlice } from "./feature/auth/authSlice";
import uiReducer from "./feature/ui/uiSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    ui: uiReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
}
);

const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
