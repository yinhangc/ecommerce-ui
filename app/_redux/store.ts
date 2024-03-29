import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui.slice";
import i18nReducer from "./slices/i18n.slice";
import cartReducer from "./slices/cart.slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    i18n: i18nReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
