import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import axios from 'axios';
import './updateUser.css'
import logo from "./logo-omrane.png";
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const UpdateUser = () => {
    const { id } = useParams();

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fonction, setFonction] = useState('Demandeur');
    const [sexe, setSexe] = useState('M.');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("/updateUser", { id: id, email: email, nom: nom, prenom: prenom, login: userName, pwd: password, fonction: fonction, sexe: sexe });
        navigate("/listUsers");
    };

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
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace Admin</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mohammed Raji"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1"><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
            <Sidebar />
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
                    <label htmlFor="userNameInput">UserName</label><br />
                    <input
                        type="text"
                        className="form-control"
                        id="userNameInput"
                        placeholder="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label><br />
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fonctionSelect">Fonction</label><br />
                    <select
                        className="form-control"
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
                        className="form-control"
                        id="sexeSelect"
                        value={sexe}
                        onChange={(e) => setSexe(e.target.value)}
                    >
                        <option>M.</option>
                        <option>Mme.</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
        </div>
        </center>
    );
}

export default UpdateUser;
