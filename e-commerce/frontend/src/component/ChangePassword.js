import React from 'react';
import { useState } from 'react';
import './design/UserPage.css';
import '../App.css';
import axios from 'axios';

function ChangePassword({user}) {
    const [password, setPassword] = useState([]);
    const [changePassword, setChangePassword] = useState(false);

    const handleChange = async () => {
        try {
            const url = `http://localhost:9090/api/v1/customer/changePassword?email=${encodeURIComponent(user.email)}&oldPassword=${encodeURIComponent(user.password)}&newPassword=${encodeURIComponent(password)}`;
            await axios.put(url);

        } catch(error) {
            console.log("Error");
        }

        setChangePassword(true);
    }

    if (changePassword) {
        return (
        <div className='centered-container'>
          <div className="login-container">
          <h1>Modifica password effettuata con successo!</h1>
          <h2> </h2>
          <div className="login-link">
            <p>Per accedere al tuo account <a href="/">Login here</a></p>
          </div>
          </div>
    
        </div>);
      }


      return (
      <div className='centered_container'>
      <div className='login-container'> 
          <h2>Insert your new password</h2>
          <div className="input-container">
             <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='login-button' onClick={handleChange}>Send</button>
  
      </div>
  </div>
);


}


export default ChangePassword;