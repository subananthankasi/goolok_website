import { createSlice } from "@reduxjs/toolkit";

const SliderForAddToCart = createSlice({
  name: "ui",
  initialState: {
    cartSidebarOpen: false,
  },
  reducers: {
    openCartSidebar: (state) => {
      state.cartSidebarOpen = true;
    },
    closeCartSidebar: (state) => {
      state.cartSidebarOpen = false;
    },
    toggleCartSidebar: (state) => {
      state.cartSidebarOpen = !state.cartSidebarOpen;
    },
  },
});

export const { openCartSidebar, closeCartSidebar, toggleCartSidebar } = SliderForAddToCart.actions;
export default SliderForAddToCart.reducer;
