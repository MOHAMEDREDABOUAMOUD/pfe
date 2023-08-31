import React, { useEffect, useState } from 'react';
import './createUser.css';
import Sidebar from '../sidebar/sideBar';
import axios from 'axios';
import logo from "./logo-omrane.png";
import { useNavigate } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const CreateUser = () => {
  const [immatricule, setImmatricule] = useState('');
  const [immatriculeError, setImmatriculeError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nom, setNom] = useState('');
  const [nomError, setNomError] = useState('');
  const [prenom, setPrenom] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fonction, setFonction] = useState('Demandeur');
  const [sexe, setSexe] = useState('M.');

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

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError('');
    setNomError('');
    setPrenomError('');
    setUserNameError('');
    setPasswordError('');
    setImmatriculeError('');
    let hasErrors = false;

    // Check for empty fields and set error messages
    if (immatricule.trim() === '') {
      setImmatriculeError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (email.trim() === '') {
      setEmailError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (nom.trim() === '') {
      setNomError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (prenom.trim() === '') {
      setPrenomError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (userName.trim() === '') {
      setUserNameError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (password.trim() === '') {
      setPasswordError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (!hasErrors) {
      try {
        const res = await axios.post("/createUser", { immatricule: immatricule, email: email, nom: nom, prenom: prenom, userName: userName, password: password, fonction: fonction, sexe: sexe });
        if (res.status === 200) {
          alert("le compte a ete bien creer");
          navigate("/listUsers");
        }
        else {
          alert("le compte n'a pas ete creer");
        }
      } catch (error) {
        alert("le compte n'a pas ete creer");
      }
    }
  };

  return (
    <center>
      <div className='all-div'>
        <div className='appbare'>
          <Sidebar />
          <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'

              title={currentUser}
            >
              <NavDropdown.Item onClick={() => { navigate("/notifications") }} className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <center><h1 className='espace_admin'>Espace Admin</h1></center>
        </div>
        <div className='formCreateUser_admin'>
          <center><h1 className='titre'>Creation d'utilisateur</h1></center>
          <form onSubmit={handleSubmit} className='forma'>

            <div className='disp'>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>Immatricule</label><br />
                <input
                  type='text'
                  className={`form-control ${immatriculeError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder='100'
                  value={immatricule}
                  onChange={(e) => setImmatricule(e.target.value)}
                />
                {immatriculeError && <p className='error-message'>{immatriculeError}</p>}
              </div>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>E-mail</label><br />
                <input
                  type='email'
                  className={`form-control ${emailError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder='name@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className='error-message'>{emailError}</p>}
              </div>
            </div>
            <div className='disp'>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>Nom</label><br />
                <input
                  type='text'
                  className={`form-control ${nomError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder='Nom'
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
                {nomError && <p className='error-message'>{nomError}</p>}
              </div>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>Prenom</label><br />
                <input
                  type='text'
                  className={`form-control ${prenomError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder='Prenom'
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
                {prenomError && <p className='error-message'>{prenomError}</p>}
              </div>
            </div>
            <div className='disp'>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>nom d'utilisateur</label><br />
                <input
                  type='text'
                  className={`form-control ${userNameError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder="nom d'utilisateur"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {userNameError && <p className='error-message'>{userNameError}</p>}
              </div>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlInput1'>mot de passe</label><br />
                <input
                  type='text'
                  className={`form-control ${passwordError ? 'error-border' : ''}`}
                  id='exampleFormControlInput1'
                  placeholder="mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className='error-message'>{passwordError}</p>}
              </div>
            </div>
            <div className='disp'>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlSelect1'>Fonction</label><br />
                <select
                  className='form-control'
                  id='exampleFormControlSelect1'
                  value={fonction}
                  onChange={(e) => setFonction(e.target.value)}
                >
                  <option value="Demandeur">Demandeur</option>
                  <option value="DM">DM</option>
                  <option value="DTI">DTI</option>
                  <option value="CM">CM</option>
                </select>
              </div>
              <div className='form-group1'>
                <label htmlFor='exampleFormControlSelect1'>Sexe</label><br />
                <select
                  className='form-control'
                  id='exampleFormControlSelect1'
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                >
                  <option value="M.">M.</option>
                  <option value="Mme.">Mme.</option>
                </select>
              </div>
            </div>
            <button type='submit' className='botton'>Creer</button>
          </form>
        </div>
      </div>
    </center>
  );
};
export default CreateUser;
