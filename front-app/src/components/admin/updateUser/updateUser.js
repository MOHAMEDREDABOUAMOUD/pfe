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
            <div className='all'>
                <div className='formCreateUserad'>
                    <Navbar className="barad">
                        <Navbar.Collapse className="justify-content-start">
                            <img src={logo} className="imgleft"></img>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className="left">
                                <h1 href="#login" className="espacee">Espace Admin</h1>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={currentUser}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item href="/notifications"><IoMdNotifications /> Notifications</NavDropdown.Item>
                                    <NavDropdown.Item href="/">
                                        <SlLogout /> Exit
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <Sidebar />
                    </Navbar>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <center><h5>Update User</h5></center>
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="fonctionSelect">Fonction</label><br />
                            <select
                                id="fonctionSelect"
                                value={fonction}
                                onChange={(e) => setFonction(e.target.value)}
                            >
                                <option>Demandeur</option>
                                <option>DM</option>
                                <option>DTI</option>
                                <option>CG</option>
                            </select>
                        </div>
                        <div className="form-group">
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
                        <button type="submit" className="btn btn-primary">modifier</button>
                    </form>
                </div>
            </div>
        </center>
    );
}

export default UpdateUser;
