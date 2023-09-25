import React from 'react';
import { useState } from 'react';
import './design/UserPage.css';
import '../App.css';
import axios from 'axios';

function ChangeEmail({user}) {

    const [email, setEmail] = useState([]);
    const [changeSuccess, setChangeSuccess] = useState(false);

    const handleChange = async () => {
        try {
          const url = `http://localhost:9090/api/v1/customer/changeEmail?oldEmail=${encodeURIComponent(user.email)}&newEmail=${encodeURIComponent(email)}`;
          await axios.put(url);
        } catch (error) {
          console.error("Error");
        }
        setChangeSuccess(true);
    }

    if (changeSuccess) {
      return (
      <div className='centered-container'>
        <div className="login-container">
        <h1>Modifica email effettuata con successo!</h1>
        <h2> </h2>
        <div className="login-link">
          <p>Per accedere al tuo account <a href="/">Login here</a></p>
        </div>
        </div>
  
      </div>);
    }

    return (<div className='centered_container'>
                <div className='login-container'> 
                    <h2>Insert your new email</h2>
                    <div className="input-container">
                       <input type="text" placeholder="New Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button className='login-button' onClick={handleChange}>Send</button>
            
                </div>
            </div>
    );
}

export default ChangeEmail;