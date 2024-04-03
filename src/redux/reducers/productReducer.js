import { ActionTypes } from "../constants/actionType";
const intialState = {
  products: [],
};

const intialAddToCartState = {
  productList: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const addToCartProductsReducer = (state = intialAddToCartState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ADDTOCART_PRODUCTS:
      return { ...state, productList: payload };
    default:
      return state;
  }
};

export const filteredProductsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FILTERED_PRODUCTS:
      return payload;
    default:
      return state;
  }
};