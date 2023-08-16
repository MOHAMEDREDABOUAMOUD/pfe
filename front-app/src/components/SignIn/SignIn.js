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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('login', userName);
      formData.append('pwd', password);

      await axios
        .post("/signIn", { userName : userName, password : password })
        .then((response) => {
          //console.log(response.data); // You can handle the response here if needed
          // Redirect the user to a different page upon successful sign-in
          //console.log(response.data["fonction"]);
          if(response.data["fonction"]==="Admin"){
            navigate("/admin/main");
          }
          else if(response.data["fonction"]==="Demandeur"){
            navigate("/demandeur/main");
          }
          else if(response.data["fonction"]==="DTI"){
            navigate("/dti/main");
          }
          else if(response.data["fonction"]==="CM"){
            navigate("/CM/main");
          }
          else{
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          //navigate("/createUser");
        });

      // const response = await axios.post('http://localhost:80/alOmrane_prj/pfe/backend/login.php', formData, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // });

      // const data = response.data;
      // console.log(data);
      // // You can handle the response here (e.g., show success message, redirect, etc.)
      // if (response.status === 200) {
      //   // Login successful, show success message (optional)
      //   alert('Login successful!');

      //   // Redirect the user to "exemple/exemple"
      //   window.location.replace('../admin/main.js');
      // } else {
      //   // Login failed, show error message
      //   alert(data.error);
      // }
    } catch (error) {
      console.error('Error:', error);
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
                <label className="form-label" htmlFor="userName">User Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  name="login"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter your username
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  required
                  name="pwd"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter your password
                </div>
              </div>
              <div className="form-group form-check mb-2">
                <label htmlFor="check" className="form-check-label"><Link to="/forgotPassword">Forgot Password?</Link></label>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-2">Sign In</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SignIn;
