import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import axios from 'axios';
import './updateUser.css'
import logo from "./logo-omrane.png";
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const UpdateUser = () => {
    const { id } = useParams();

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nomError, setNomError] = useState('');
    const [prenomError, setPrenomError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fonction, setFonction] = useState('Demandeur');
    const [sexe, setSexe] = useState('M.');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError('');
        setNomError('');
        setPrenomError('');
        setUserNameError('');
        setPasswordError('');
        let hasErrors = false;

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
            await axios.post("/updateUser", { id: id, email: email, nom: nom, prenom: prenom, login: userName, pwd: password, fonction: fonction, sexe: sexe });
            alert("l'utilisateur a ete bien modifier");
            navigate("/listUsers");
        }
    };

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await axios.post("/getUser", { id: id });
                setEmail(userData.data["email"]);
                setNom(userData.data["nom"]);
                setPrenom(userData.data["prenom"]);
                setUserName(userData.data["login"]);
                setPassword(userData.data["pwd"]);
                setFonction(userData.data["fonction"]);
                setSexe(userData.data["sexe"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <center>
            <div className='all-div'>
                <div className='formCreateUserad'>
                <div className='appbare'>
    <Sidebar />
    <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'
              
              title={currentUser}
            >
              <NavDropdown.Item onClick={()=>{navigate("/notifications")}} className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      <center><h1 className='espace_admin'>Espace Admin</h1></center>
    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <center><h1 className='titre'>Modifier d'utilisateur</h1></center>
                    
                            <label htmlFor="emailInput">E-mail</label><br />
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='disp'>
                        <div className="form-group1">
                            <label htmlFor="nomInput">Nom</label><br />
                            <input
                                type="text"
                                className="form-control"
                                id="nomInput"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>
                        <div className="form-group1">
                            <label htmlFor="prenomInput">Prenom</label><br />
                            <input
                                type="text"
                                className="form-control"
                                id="prenomInput"
                                placeholder="Prenom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className='disp'>
                        <div className="form-group1">
                            <label htmlFor="userNameInput">nom d'utilisateur</label><br />
                            <input
                                type="text"
                                className="form-control"
                                id="userNameInput"
                                placeholder="nom d'utilisateur"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group1">
                            <label htmlFor="passwordInput">mot de passe</label><br />
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className='disp'>
                        <div className="form-group1">
                            <label htmlFor="fonctionSelect">Fonction</label><br />
                            <select
                                id="fonctionSelect"
                                value={fonction}
                                onChange={(e) => setFonction(e.target.value)}
                            >
                                <option>Demandeur</option>
                                <option>DM</option>
                                <option>DTI</option>
                                <option>CM</option>
                            </select>
                        </div>
                        <div className="form-group1">
                            <label htmlFor="sexeSelect">Sexe</label><br />
                            <select
                                id="sexeSelect"
                                value={sexe}
                                onChange={(e) => setSexe(e.target.value)}
                            >
                                <option>M.</option>
                                <option>Mme.</option>
                            </select>
                        </div>
                        </div>
                        <button type="submit" className="botton">modifier</button>
                    </form>
                </div>
            </div>
        </center>
    );
}

export default UpdateUser;
