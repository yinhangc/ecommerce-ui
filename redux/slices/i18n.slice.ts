import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Language = "zh" | "en";

interface I18nState {
  language: Language;
  translations: {
    zh: any;
    en: any;
  };
}

const initialState: I18nState = {
  language: 'zh',
  translations: {
    zh: {
      header: {
        nav_login: '登入',
        nav_cart: '購物車',
        nav_home: '主頁',
        nav_sneakers: '鞋',
        nav_accessories: '配件',
      },
    },
    en: {
      header: {
        nav_login: 'Login',
        nav_cart: 'Cart',
        nav_home: 'Home',
        nav_sneakers: 'Sneakers',
        nav_accessories: 'Accessories',
      },
    },
  },
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
export const selectTranslations = (state: RootState) =>
  state.i18n.translations[state.i18n.language];

export default i18nSlice.reducer;
