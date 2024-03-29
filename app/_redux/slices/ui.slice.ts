import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum SidebarType {
  Cart,
}

interface UiState {
  sidebar: null | number;
}

const initialState: UiState = {
  sidebar: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSidebar: (state, action: PayloadAction<SidebarType>) => {
      if (state.sidebar === action.payload) return;
      state.sidebar = action.payload;
    },
    hideSidebar: (state) => {
      state.sidebar = null;
    },
  },
});

export const { showSidebar, hideSidebar } = uiSlice.actions;

export default uiSlice.reducer;
