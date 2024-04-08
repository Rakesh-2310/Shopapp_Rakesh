import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../productlist/Productlist.scss"
import Product from '../product/Product'
import { setProducts } from "../redux/actions/productAction";

const Productlist = () => {
  const dispatch = useDispatch();
  // Fetch products from the API
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='productListContainerHolder'>
      <div className='productListContainer'>
        <div className="productsTitle">Product List</div>
        <div className="products">
          <Product />
        </div>
      </div>
    </div>
  )
}

export default Productlist