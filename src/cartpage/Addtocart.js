import React, { useState, useEffect } from 'react';
import "../cartpage/Addtocart.scss";
import Header from "../header/Header";
import { useSelector, useDispatch } from "react-redux";
import { setAddToCartProducts } from "../redux/actions/productAction";

const Addtocart = ({ totalItems, setTotalItems }) => {
    const products = useSelector((state) => state.addtocartProduct);
    const dispatch = useDispatch();

    const [counts, setCounts] = useState({});
    const [allPrice, setAllPrice] = useState(0);
    const [orderVisible, setOrderVisible] = useState(false);


    useEffect(() => {
        const totalAllItems = products.productList.reduce((acc, curr) => acc + curr.quantity, 0);
        const totalAllItemsPrice = products.productList.reduce((acc, curr) => acc + curr.quantityPrice, 0);
        setTotalItems(totalAllItems);
        setAllPrice(totalAllItemsPrice);
    }, [products.productList, setTotalItems]);

    const handleIncrement = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1
        }));

        const updatedProductList = products.productList.map(item => {
            if (item.id === id) {
                return { 
                    ...item,
                    quantity: item.quantity + 1,
                    quantityPrice:(item.quantity + 1)*item.price,
                };
            }
            return item;
        });
        dispatch(setAddToCartProducts(updatedProductList));
    };

    const handleDecrement = (id) => {
        const product = products.productList.find(item => item.id === id);
        if(product.quantity >1){
            setCounts((prevCounts) => ({
                ...prevCounts,
                [id]: Math.max((prevCounts[id] || 0) - 1, 0)
            }));

            const updatedProductList = products.productList.map(item => {
                if (item.id === id && item.quantity > 0) {
                    return { 
                        ...item,
                        quantity: item.quantity - 1,
                        quantityPrice:(item.quantity - 1)*item.price,
                    };
                }
                return item;
            });
            dispatch(setAddToCartProducts(updatedProductList));
        }
        else{
            const updatedProductList = products.productList.filter(item => item.id !== id);
            dispatch(setAddToCartProducts(updatedProductList));
        };
    }

    const handleDelete = (id) => {
        const updatedProductList = products.productList.filter(item => item.id !== id);
        dispatch(setAddToCartProducts(updatedProductList));
    };

    const handleOrderButton = () => {
        if (products.productList.length > 0){
            setOrderVisible(true);
            dispatch(setAddToCartProducts([]));
            setTimeout(() => {
                setOrderVisible(false);
            }, 3000);
        }
    }
    
    let renderList;

    if (!products || products.productList.length === 0) {
        renderList = <div>Cart is empty....</div>;
    } else {
        renderList = products.productList.map((product) => {
            const { id, title, image, price, quantity, rating, quantityPrice } = product;

            return (
                <div className="productDetailContainer" key={id}>
                    <img src={image} alt={title} />
                    <div className='productDetail'>
                        <div className='description'>
                            <p>{title}</p>
                            <p>Price:- {price}</p>
                            {rating && (
                                <>
                                    <p>Rating:- {rating.rate}</p>
                                </>
                            )}
                        </div>
                        <div className='cartContainer'>
                            <div className='countButton'>
                                <button onClick={() => handleIncrement(product.id)}>+</button>
                                <button onClick={() => handleDecrement(product.id)}>-</button>
                            </div>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                        <div className='costOfProduct'>
                            <span className='costTitle'>
                                Total Count:-
                            </span>
                            <span className='count'>
                                {quantity}
                            </span>
                            <span className='costTitle'>
                                Total Cost:-
                            </span>
                            <span className='costtag'>
                                {Math.round(quantity * price)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className='bodyContainer'>
            <Header totalItems={totalItems} />
            <div className="productContainer">
                <div className="productTitleContainer">Product List<span className='orderAll' onClick={handleOrderButton}>Order All</span></div>
                {renderList}
            </div>
            {!orderVisible && <div className="priceDetail">
                <div className="priceDetailHeading">Price Description</div>
                <div className='total'>
                    <div className="itemTotal">
                        Total Item:- {totalItems}
                    </div>
                    <div className="totalPrice">
                        Total Price:- {Math.round(allPrice)}
                    </div>
                </div>
            </div>}
            {orderVisible && <div className="orderDisplay">
                <div className="orderGreetings">
                    Thank you for your order!... Your order has been successfully submitted.... You're always welcome!:).....
                </div>
            </div>}
        </div>
    );
}

export default Addtocart;