import { createSlice } from "@reduxjs/toolkit";

const WISHLIST_KEY = "wishlistItems";

const getWishlistItems = () => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (error) {
    console.error("Error reading wishlist from localStorage", error);
    return [];
  }
};

const saveWishlistItems = (items) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error writing wishlist to localStorage", error);
  }
};

const initialState = {
  items: getWishlistItems(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }

      saveWishlistItems(state.items);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlistItems(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistItems([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
