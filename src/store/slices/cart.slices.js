import { createSlice } from "@reduxjs/toolkit";
import { axiosEcomerce, getCongig } from "../../utils/configAxios";

const initialState = {
  products: [],
  isShowCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeIsShowCart: (state) => {
      state.isShowCart = !state.isShowCart;
    },

    setProducts: (state, action) => {
      const newProducts = action.payload;
      state.products = newProducts;
    },
  },
});

export const { changeIsShowCart, setProducts } = cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
  axiosEcomerce
    .get("cart", getCongig())
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err));
};

export const addProductCart = (data) => (dispatch) => {
  axiosEcomerce
    .post("cart", data, getCongig())
    .then((res) => dispatch(getCartProducts()))
    .catch((err) => console.log(err));
};
export const purchaseCart = () => (dispatch) => {
  axiosEcomerce
    .post("purchases", {}, getCongig())
    .then((res) => dispatch(getCartProducts()))
    .catch((err) => console.log(err));
};
export const deleteProductCart = (id) => (dispatch) => {
  axiosEcomerce
    .delete(`cart/${id}`, getCongig())
    .then((res) => dispatch(getCartProducts()))
    .catch((err) => console.log(err));
};

export default cartSlice.reducer;
