import React, { useEffect, useState } from "react";
import "../productpage/Productpage.scss"
import Header from "../header/Header"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct, setAddToCartProducts } from "../redux/actions/productAction";

const Productpage = ({totalItems}) => {

    const { Id } = useParams();
    const [number,setNumber] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) =>{
      setNumber(event.target.value);
    }

    const productList = useSelector((state) => state.addtocartProduct.productList);
    const handleClick = () => {
        const existingProductIndex = productList.findIndex(item => item.id === product.id);
      
        if (existingProductIndex !== -1) {
          const updatedProductList = [...productList];
          updatedProductList[existingProductIndex] = {
            ...updatedProductList[existingProductIndex],
            quantity: updatedProductList[existingProductIndex].quantity + parseInt(number, 10),
            quantityPrice: (updatedProductList[existingProductIndex].quantity + parseInt(number, 10)) * product.price,
          };
          dispatch(setAddToCartProducts(updatedProductList));
        } else {
          const cartItem = {
            ...product,
            quantity: parseInt(number, 10), 
            quantityPrice: parseInt(number, 10) * product.price,
          };
          dispatch(setAddToCartProducts([...productList, cartItem]));
        }
        navigate('/Addtocart'); 
      };
      

    const product = useSelector((state) => state.product);
    const { image, title, price, category, description ,rating} = product || {};
    const fetchProductDetail = async (id) => { 
      const response = await axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .catch((err) => {
          console.log("Err: ", err);
        });
      dispatch(selectedProduct(response.data));
    };
  
    useEffect(() => {
      if (Id && Id !== "") {
        fetchProductDetail(Id);
      }
      return () => {
        dispatch(removeSelectedProduct());
      };
    }, [dispatch, Id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
      <div className='bodyContainer'>
          <Header totalItems={totalItems} />
          <div className="productContainer">
              <div className="productTitleContainer">{title}</div>
              <div className="productDetailContainer">
                  <img src={image} alt={title} />
                  <div className='productDetail'>
                      <p>Description:- {description}</p>
                      {rating && (
                          <>
                              <p>Rating:- {rating.rate}</p>
                              <p>Count:- {rating.count}</p>
                          </>
                      )}
                      <p>Category:- {category}</p>
                      <p>Price:-{price}</p>
                      <div className='cartContainer'>
                          <div className='countButton'>
                              <span>
                                  <input type="number" name="number" defaultValue={1} onChange={handleChange} />
                              </span>
                          </div>
                          <button onClick={handleClick}>Add To Cart</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
export default Productpage