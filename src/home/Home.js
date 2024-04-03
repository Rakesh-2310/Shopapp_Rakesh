import React, { useState } from 'react';
import Header from "../header/Header"
import Filter from "../filter/Filter"
import Productlist from "../productlist/Productlist"
import "../home/Home.scss"

const Home = ({totalItems}) => {

  const [filterVisible, setFilterVisible] = useState(false);

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