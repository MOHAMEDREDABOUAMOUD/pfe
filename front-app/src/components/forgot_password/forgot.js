import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import './forgot.css';
import axios from 'axios';
import logo from "./logo-omrane.png"; // Import Axios
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Password reset link sent to your email.');
      } else {
        const errorMessage = await response.text();
        setMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
<div className="App">
<div className='app2'>
<div className="bara">
    <img src={logo} className="image"></img>
</div>
<div>
  <div className="wrapper d-flex align-items-center justify-content-center w-100">
    <div className="login">
      <h2 className="mb-3">Forgot Password</h2>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label className="form-label" htmlFor="userName">Email</label>
          <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
        </div>
        <button type="submit" className="btn btn-success w-100 mt-2">Send</button>
      </form>
    </div>
  </div>
</div>
</div>
</div>
  );
};

export default ForgotPassword;