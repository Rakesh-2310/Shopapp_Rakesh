import React, { useEffect, useState } from 'react'
import "../filter/Filter.scss"
import { setProducts, setFilteredProducts } from "../redux/actions/productAction";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Filter = ({ visible }) => {

  // Filter products based on selected price range, category, and rating when filter options change
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [selectedPriceRange, setSelectedPriceRange] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [selectedRating, setSelectedRating] = useState("none");

  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products").catch((err) => {
      console.log("Err: ", err);
    });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedPriceRange, selectedCategory, selectedRating]);

  const handleReset = () =>{
    setSelectedPriceRange("none");
    setSelectedCategory("none");
    setSelectedRating("none");
  }

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedPriceRange !== "none") {
      filtered = filtered.filter((product) => {
        switch (selectedPriceRange) {
          case "<100":
            return product.price < 100;
          case "100=> & <500":
            return product.price >= 100 && product.price < 500;
          case ">500":
            return product.price > 500;
          default:
            return true;
        }
      });
    }

    if (selectedCategory !== "none") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedRating !== "none") {
      filtered = filtered.filter((product) => {
        switch (selectedRating) {
          case "0> & <=1":
            return product.rating.rate > 0 && product.rating.rate <= 1;
          case "1> & <=2":
            return product.rating.rate > 1 && product.rating.rate <= 2;
          case "2> & <=3":
            return product.rating.rate > 2 && product.rating.rate <= 3;
          case "3> & <=4":
            return product.rating.rate > 3 && product.rating.rate <= 4;
          case "4> & <=5":
            return product.rating.rate > 4 && product.rating.rate <= 5;
          default:
            return true;
        }
      });
    }

    dispatch(setFilteredProducts(filtered));
  };

  return (
      <div className="filterContainer" style={{ display: visible ? 'block' : 'none' }}>
        <div className='filterHeading'>
          <h1>Filter</h1>
        </div>
        <div className="filterElement">
          <p>Price</p>
          <select name="price" id="price" value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
              <option value="none">Select</option>
              <option value="<100">Less than 100</option>
              <option value="100=> & <500">100 to 500</option>
              <option value=">500">Above 500</option>
          </select>
        </div>
        <div className="filterElement">
          <p>Category</p>
          <select name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="none">Select</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option>
          </select>
        </div>
        <div className="filterElement">
          <p>Rate</p>
          <select name="rate" id="rate" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
              <option value="none">Select</option>
              <option value="0> & <=1">1 Star</option>
              <option value="1> & <=2">2 Stars</option>
              <option value="2> & <=3">3 Stars</option>
              <option value="3> & <=4">4 Stars</option>
              <option value="4> & <=5">5 Stars</option>
            </select>
        </div>
        <div className='actionContainer'>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
  )
}

export default Filter