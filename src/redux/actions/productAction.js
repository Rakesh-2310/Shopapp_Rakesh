import { ActionTypes } from "../constants/actionType";
import { auth } from '../../firebase/Firebaseconfig';

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
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  if (userId) {
    localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(productList));
  }
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
};
