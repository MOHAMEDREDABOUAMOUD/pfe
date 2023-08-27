import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import './LoginForm.css';
import axios from 'axios';
import logo from "./logo-omrane.png"; // Import Axios
import { Link, useNavigate } from 'react-router-dom';
import titre from './titre.png'

function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setError('fill all the inputs');
    }
    else {
      try {
        const formData = new FormData();
        formData.append('login', userName);
        formData.append('pwd', password);

        await axios
          .post("/signIn", { userName: userName, password: password })
          .then((response) => {
            //console.log(response.data); // You can handle the response here if needed
            // Redirect the user to a different page upon successful sign-in
            //console.log(response.data["fonction"]);
            if (response.data["fonction"] === "Admin") {
              navigate("/admin/main");
              setError(null);
            }
            else if (response.data["fonction"] === "Demandeur") {
              navigate("/demandeur/main");
              setError(null);
            }
            else if (response.data["fonction"] === "DTI") {
              navigate("/dti/main");
              setError(null);
            }
            else if (response.data["fonction"] === "CM") {
              navigate("/CM/main");
              setError(null);
            }
            else if (response.data["fonction"] === "DM") {
              navigate("/DM/main");
              setError(null);
            }
            else {
            setError('User not found');
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            setError('User not found');
          });
      } catch (error) {
        console.error('Error:', error);
      }
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
              <h2 className="mb-3">Sign In</h2>
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="userName">nom d'utilisateur</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    name="login"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Entre votre nom d'utilisateur
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="password">Mot de passe</label>
                  <input
                    className="form-control"
                    type="password"
                    required
                    name="pwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Entre votre mot de passe
                  </div>
                </div>
                <div className="form-group form-check mb-2">
                  <label htmlFor="check" className="form-check-label"><Link to="/forgotPassword">mot de passe oublié?</Link></label>
                </div>
                <button type="submit" className="btn btn-success w-100 mt-2">Sign In</button>
                {error && <p className="text-danger mt-2">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
