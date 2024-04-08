import React from 'react'
import "../product/Product.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Product = () => {

  const filteredProducts = useSelector((state) => state.filteredProducts);
  const renderList = filteredProducts.map((product) => {
  const { id, title, image, price, rating } = product;
  // Render list of products with links to their individual pages
    return (
        <div className='productDetailHolder' key={id}>
          <Link to={`/product/${id}`}>
            <div className='imageContainer'>
              <img src={image} alt={title} />
              <div className='productDetail'>
                <p>Rating:-{rating.rate}</p>
                <p>Price:-{price}</p>
              </div>
            </div>
            <div className="productTitle">
              {title}
            </div>
          </Link>
        </div>
    );
  });
  return <>{renderList}</>;
}

export default Product 