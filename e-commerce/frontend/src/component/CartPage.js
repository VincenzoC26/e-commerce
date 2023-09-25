import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './design/CartPage.css';
import axios from 'axios';
import product1Image from './image/maglietta.jpg';

function CartPage({ user , onLogout}) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9090/api/v1/shoppingCart/get')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error during the request!"))
  })

  let tot = 0;

  async function removeFromCart(id){
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
    try{
       const url = `http://localhost:9090/api/v1/shoppingCart/delete?productId=${encodeURIComponent(id)}`;
       await axios.delete(url);
    }
    catch(error) {
      console.error("Error during the add of the product to the shopping cart");
    }
  }

  const buttonStyle = {
    backgroundColor: isClicked ? 'gray' : 'dark_gray',
  };


  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserClick = () => {
    navigate('/user');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleHomeClick = () => {
    navigate('/');
  }

  async function createOrder() {
    try{
      const url = `http://localhost:9090/api/v1/order/add`;
      await axios.post(url);
   }
   catch(error) {
     console.error("Error during the creation of the order!");
   }
   setIsClicked(true);
   setTimeout(() => {
     setIsClicked(false);
   }, 200);
  }

  return (
    <div>
      <nav className="navbar">
        <span>Ciao {user.firstname}!</span>
        <div className="nav-icons">
          <FaUser className="user-icon" onClick={toggleUserMenu}/>
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li onClick={handleUserClick}>Profilo</li>
                <li>News</li>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          )}
          <FaShoppingCart className="cart-icon" onClick={handleCartClick}/>
          <FaHome className="home-icon" onClick={handleHomeClick} />
        </div>
      </nav>
      <div class="master-container">
        <div class="card cart">
          <label class="title">Il tuo carrello</label>
          <div class="products">
            {products.map((item) => (
              <div class="product" key={item.name}>
                <img
                src={product1Image}
                alt={product1Image}
                width="80"
                height="80"
              />
                <div>
                  <span><strong>{item.name}</strong></span>
                  {/* Altre informazioni sul prodotto */}
                </div>
                <div class="quantity">
                  <label>1</label>
                </div>
                <label class="price small">${item.price}</label>
                <script>{tot =tot+item.price}</script>
                <button style={buttonStyle} className="button-remove"onClick={() => removeFromCart(item.id)}>
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        <div class="card coupons">
          <label class="title">Applica coupon</label>
          <form class="form">
            <input type="text" placeholder="Applica il tuo coupon qui" class="input_field" />
            <button>Applica</button>
          </form>
        </div>

        <div class="card checkout">
          <label class="title">Checkout</label>
          <div class="details">
            <span>Totale parziale:</span>
            <span>${tot}</span>
            {/*altre informazioni sul checkout come sconti, spese di spedizione, ecc. */}
          </div>
          <div class="checkout--footer">
            <label class="price">
              <sup>$</sup>
              {tot}
            </label>
            <button class="checkout-btn" style={buttonStyle}
                 onClick={() => createOrder()}
            >Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
