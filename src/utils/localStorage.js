export const CART_KEY = "cartItems";

export const getCartItems = () =>
  JSON.parse(localStorage.getItem(CART_KEY)) || [];
export const saveCartItems = (items) =>
  localStorage.setItem(CART_KEY, JSON.stringify(items));
