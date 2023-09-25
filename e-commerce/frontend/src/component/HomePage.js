import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaHome} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './design/HomePage.css';
import product1Image from './image/maglietta.jpg';
import axios from 'axios';


function HomePage({ user, onLogout }) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9090/api/v1/products/get')
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error during the products request!"));
  }, []);

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

  const handleSearch = () => {
    /*TODO*/
    console.log('Ricerca:', searchQuery);
  };

  async function addToShoppingCart(id){
    try{
       const url = `http://localhost:9090/api/v1/shoppingCart/add?productId=${encodeURIComponent(id)}`;
       await axios.post(url);
    }
    catch(error) {
      console.error("Error during the add of the product to the shopping cart");
    }
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  }

  const buttonStyle = {
    backgroundColor: isClicked ? 'white' : 'gray',
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <span className="welcome">Ciao {user.firstname}!</span>
        <div className="nav-icons">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cerca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" onClick={handleSearch} />
          </div>
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li onClick={handleUserClick}>Profilo</li>
                <li>News</li>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          )}
          <FaShoppingCart className="cart-icon" onClick={handleCartClick} />
          <FaHome className="home-icon" onClick={handleHomeClick} />
        </div>
      </nav>
      <h1>Inizia ora il tuo shopping!</h1>
      <main>
      <h1>Inizia ora il tuo shopping!</h1>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product1Image}
                alt={product1Image}
                width="400"
                height="400"
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button className='button-shopping' onClick={() => addToShoppingCart(product.id)} style={buttonStyle}>
                 +
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-info">
          <div className="footer-item">
            <h3>P.Iva: 1234567890</h3>
          </div>
          <div className="footer-item">
            <h3>Contattaci</h3>
            <p>Email: info@example.com</p>
            <p>Telefono: +123 456 789</p>
          </div>
          <div className="footer-item">
            <h3>Seguici su</h3>
            <div className="social-icons">
              {/* Aggiungi qui gli icon component per i social */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
