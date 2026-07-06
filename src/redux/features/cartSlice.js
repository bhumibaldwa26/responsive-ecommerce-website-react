import { createSlice } from "@reduxjs/toolkit";
import { getCartItems, saveCartItems } from "../../components/utils/localStorage";

const calculateTotals = (items) => {
  let totalQuantity = 0;
  let totalAmount = 0;
  items.forEach((item) => {
    totalQuantity += item.quantity;
    totalAmount += item.price * item.quantity;
  });
  return { totalQuantity, totalAmount };
};

const initialItems = getCartItems();
const { totalQuantity, totalAmount } = calculateTotals(initialItems);

const initialState = {
  items: initialItems,
  totalQuantity,
  totalAmount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.items.push({ ...newItem, quantity: quantityToAdd });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartItems(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartItems(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = Math.max(1, quantity);
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
      saveCartItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartItems([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
