import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { doSignOut } from "../firebase/auth"
import "../header/Header.scss"
import cart from '../image/cart.png'
import filter from '../image/filter.png'

const Header = ({ handleFilter, totalItems }) => {

  const navigate = useNavigate()

  return (
    <div className="headerContainer">
      <div className='headerLogo'>
        <h1>SKR FakeShop</h1>
      </div>
      <div className='headerLinks'>
        <Link to="/Home">Home</Link>
        <img src={filter} alt="Filter" onClick={handleFilter}/>
        <Link to="/Addtocart">
          <img src={cart} alt="Cart"/>
          <span>{totalItems}</span>
        </Link>
        <button onClick={() => { doSignOut().then(() => { navigate('/') }) }} >logout</button>
      </div>
    </div>
  )
}

export default Header