import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer, addToCartProductsReducer, filteredProductsReducer } from "./productReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  addtocartProduct:addToCartProductsReducer,
  filteredProducts: filteredProductsReducer,
});
export default reducers;