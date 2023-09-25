import React from 'react';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './design/UserPage.css';
import '../App.css';

function UserPage({ user, onLogout}) {

  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/api/v1/order/get')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error during the order request!")) 
  })

  const handleChangeEmailClick = () => {
    navigate('/emailChange');
  };

  const handleChangePasswordClick = () => {
    navigate('/passwordChange');
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



  return (
    <div className="user-page">
      <nav className="navbar">
        <div className="navbar">
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
        </div>
      </nav>
      <div className="user-header">
        <h2>Welcome, {user.firstname}!</h2>
      </div>
      <div className="user-details">
        <div className="user-info">
          <p><strong>Firstname:</strong> {user.firstname}</p>
          <p><strong>Lastname:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Birthdate:</strong> {user.dob}</p>
          <p><strong>Age:</strong> {user.age}</p>
        </div>
        <div className="user-actions">
          <button onClick={handleChangeEmailClick}>Change Email</button>
          <button onClick={handleChangePasswordClick}>Change Password</button>
        </div>
      </div>
      <div className="user-orders">
        <h3>Recent Orders</h3>
        <ul>
          {products.map((product) => (
            <div className='order-card' key = {product.id}>
              <h2>Name: {product.name}</h2>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserPage;





