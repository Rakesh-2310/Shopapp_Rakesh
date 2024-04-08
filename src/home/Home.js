import React, { useState, useEffect} from 'react';
import Header from "../header/Header"
import Filter from "../filter/Filter"
import Productlist from "../productlist/Productlist"
import { useSelector, useDispatch} from "react-redux";
import { setAddToCartProducts } from "../redux/actions/productAction";
import { auth } from '../firebase/Firebaseconfig';
import "../home/Home.scss"

const Home = ( ) => {

  const [filterVisible, setFilterVisible] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const products = useSelector((state) => state.addtocartProduct);
  const dispatch = useDispatch();

  useEffect(() => {
      const totalAllItems = products.productList.reduce((acc, curr) => acc + curr.quantity, 0);
      setTotalItems(totalAllItems);
  }, [products.productList, setTotalItems]);

  // Fetch stored products data from local storage 
  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const storedProducts = JSON.parse(localStorage.getItem(`cartProducts_${userId}`));

    if (storedProducts) {
        dispatch(setAddToCartProducts(storedProducts));
    }
  }, []);

  const handleFilter = () => {
    setFilterVisible(!filterVisible);
  };
  
  return (
    <div>
      <Header handleFilter={handleFilter} totalItems={totalItems} />
      <div className='bodyContainer'>
        <Productlist totalItems={totalItems} />
        <div className="component1">
          <Filter visible={filterVisible} />
        </div>
      </div>
    </div>
  )
}

export default Home