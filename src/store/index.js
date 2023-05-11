import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slice";
import cart from "./slices/cart.slices";
export default configureStore({
  reducer: {
    userInfo,
    cart
  }
})