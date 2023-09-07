import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import './forgot.css';
import axios from 'axios';
import logo from "./logo-omrane.png"; // Import Axios
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const [currentSexe, setCurrentSexe] = useState('');
  const [currentNom, setCurrentNom] = useState('');
  const [currentPrenom, setCurrentPrenom] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getCurrentUserData", { id: 0 });
        console.log(userData.data);
        setCurrentNom(userData.data["nom"]);
        setCurrentSexe(userData.data["sexe"]);
        setCurrentPrenom(userData.data["prenom"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    setCurrentUser(currentSexe + " " + currentNom + " " + currentPrenom);
  }, [currentSexe, currentNom, currentPrenom]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const r = await axios.post("/getPassword", { email: email });
    //password huwa r.pwd
    if (r!=null) {
      await axios.post("/sendPassword", { email: email });
      alert("le mot de passe a ete envoyer a : " + email);
    }
    else{
      alert(email+"ne se trouve pas sur la base de données");
    }
    //const sent = await sendEmail(email, "recuperation du mot de passe", "voila votre mot de passe : "+r.pwd); makhdamach
    // if (sent) {
    //   console.log('Email sent successfully');
    // } else {
    //   console.log('Failed to send email');
    // }
  };

  return (
    <div className="App">
        
        <div>
          <div >
          <center><img src={logo} className="imagee"></img></center>
          <center>
            <div className="loginn">
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-labelll" htmlFor="userName">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button type="submit" className="button">Envoyer</button>
              </form>
            </div>
            </center>
          </div>
        </div>
      </div>
  );
};

export default ForgotPassword;
