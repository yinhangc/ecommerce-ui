import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import filter from "lodash/filter";
import find from "lodash/find";

interface Product {
  id: string;
  name: string;
  price: number;
  imagePath: string;
  description?: string;
}

interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, qty } = action.payload;
      const existingItem = find(
        state.items,
        (el) => el.product.id === product.id,
      );
      if (existingItem) existingItem.qty += qty;
      else state.items.push({ product, qty });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = filter(state.items, (el) => el.product.id !== id);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = find(state.items, (el) => el.product.id === id);
      // TODO: check inventory
      if (existingItem) existingItem.qty++;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = find(state.items, (el) => el.product.id === id);
      if (!existingItem) return;
      if (existingItem.qty === 1)
        state.items = filter(state.items, (el) => el.product.id !== id);
      else existingItem.qty--;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
