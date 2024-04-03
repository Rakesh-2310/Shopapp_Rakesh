import { ActionTypes } from "../constants/actionType";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setAddToCartProducts = (productList) => {
  return {
    type: ActionTypes.SET_ADDTOCART_PRODUCTS,
    payload: productList,
  };
};

export const setFilteredProducts = (filteredProducts) => {
  return {
    type: ActionTypes.SET_FILTERED_PRODUCTS,
    payload: filteredProducts,
  };
}