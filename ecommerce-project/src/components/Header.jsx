import './header.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import SuperSimpleDevLogo from '../assets/images/logo-white.png';
import MobileLogo from '../assets/images/mobile-logo-white.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';

export function Header({cart}) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');  
  const [keyword, setKeyWord] = useState(search || '');

  const updateKeyword = (event) => {
    setKeyWord(event.target.value);
  }

  const navigate = useNavigate();
  const searchKeyword = () => {
    navigate(`/?search=${keyword}`);
  }

  const checkKey = (event) => {
    if (event.key === 'Enter') {
      searchKeyword();
    }
  }

  let totalCartItems = 0;
  cart.forEach((cartItem) => {
    totalCartItems += cartItem.quantity;
  })

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={SuperSimpleDevLogo} />
          <img className="mobile-logo"
            src={MobileLogo} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={keyword} 
          onChange={updateKeyword}
          onKeyDown={checkKey}
        />

        <button className="search-button"
          onClick={searchKeyword}
        >
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalCartItems}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}