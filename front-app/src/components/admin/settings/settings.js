import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sideBar";
import axios from "axios";
import logo from "./logo-omrane.png";
import './settings.css';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("informations");

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
        const userData = await axios.post("/getCurrentUserData", { id: 0 });
        console.log(userData.data);
        setEmail(userData.data["email"]);
        setNom(userData.data["nom"]);
        setPrenom(userData.data["prenom"]);
        setUserName(userData.data["login"]);
        setPassword(userData.data["pwd"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInformationsSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/updateSettingsIP", { email: email, nom: nom, prenom: prenom });
    alert("les informations personnelles ont ete bien modifier");
  };

  const handleSecuriteSubmit = async (event) => {
    event.preventDefault();
    alert("les informations personnelles ont ete bien modifier");
    await axios.post("/updateSettingsS", { login: userName, pwd: password });
  };
  const navigate = useNavigate();
  return (
    <center>
      <div className="settings-all">
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
        <div className="container mt-5">
          <center><h1 className='titre'>Parametres Admin</h1></center>


          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "informations" ? "active" : ""
                  }`}
                onClick={() => handleTabChange("informations")}
              >
                Informations Personnelles
      <div className="tab-content mt-3">
        {activeTab === "informations" && (
          <div className="tab-pane fade show active">
            <h3>Informations Personnelles</h3>
            <form onSubmit={handleInformationsSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="labo">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nom" className="labo">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom" className="labo">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <button type="submit" className="botton">
                Confirmer
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "securite" ? "active" : ""}`}
                onClick={() => handleTabChange("securite")}
              >
                Sécurité
              </button>
            </li>
          </ul>


          <div className="tab-content mt-3">
            {activeTab === "informations" && (
              <div className="tab-pane fade show active">
                <h3>Informations Personnelles</h3>
                <form onSubmit={handleInformationsSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prenom">Prenom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="botton">
                    Confirmer
                  </button>
                </form>
              </div>
            )}

            {activeTab === "securite" && (
              <div className="tab-pane fade show active">
                <h3>Sécurité</h3>
                <form onSubmit={handleSecuriteSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">nom d'utilisateur</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="botton">
                    Confirmer
                  </button>
                </form>
              </div>
            )}
        {activeTab === "securite" && (
          <div className="tab-pane fade show active">
            <h3>Sécurité</h3>
            <form onSubmit={handleSecuriteSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="labo">nom d'utilisateur</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="labo">mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="botton3">
                Confirmer
              </button>
            </form>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Settings;
