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
import { FaTrash } from 'react-icons/fa';
import { BsFillTrashFill } from "react-icons/bs";


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
///////////////////////////////////////////////////////////////////////
  const getDPs = async () => {
    try {
      const response = await axios.post("/getDPs", { id: "1" });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRows = async () => {
    const u = await getDPs();
    if (u != null) {
      setSelectedFiles(u);
    }
    else setSelectedFiles([]);
  };

  useEffect(() => {
    getRows();
  }, []);
  //////////////////////////////////////////////////
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

  // Step 1: Add state variables
  const [selectedName, setSelectedName] = useState("Avis");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Step 2: Function to handle file selection
  const handleFileSelect = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    // Check file size
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
    if (selectedFile.size > maxSize) {
        alert("La taille du fichier dépasse 10Mo.");
    }
    else {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result;
            const base64FileData = btoa(String.fromCharCode(...new Uint8Array(fileData)));
            setSelectedFile(base64FileData);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    }
  };

  // Function to handle adding files to the table
  const handleAddFile = async () => {
    if (selectedName && selectedFile) {
      // Check if a file with the same name already exists
      const duplicateFile = selectedFiles.find((file) => file.name === selectedName);
  
      if (!duplicateFile) {
        const newFile = { name: selectedName, file: selectedFile };
        await axios.post("/addDefaultPiece",newFile);
        setSelectedFiles([...selectedFiles, newFile]);
      } else {
        alert("Un fichier avec le meme nom existe deja.");
      }
  
      setSelectedFile(null); // Clear the selected file
    }
  };
  const handleDeleteFile = async (index) => {
    await axios.post("/deleteDefaultPiece", {name: selectedFiles[index].name});
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };


  // Step 4: Function to render table rows based on selected files
  const renderFileRows = () => {
    return selectedFiles.map((file, index) => (
      <tr key={index}>
        <td>{file.name}</td>
        <td>
          <span className="actions">
            <BsFillTrashFill
              className="delete-btn"
              onClick={() => handleDeleteFile(index)}
            />
          </span>
        </td>
      </tr>
    ));
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
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "fichiers" ? "active" : ""}`}
                onClick={() => handleTabChange("fichiers")}
              >
                fichiers
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
                </form>
              </div>
            )}

            {activeTab === "securite" && (
              <div className="tab-pane fade show active">
                <h3>Sécurité</h3>
                <form onSubmit={handleSecuriteSubmit}>
                  <div className="form-group">
                    <label htmlFor="username" className="larg">nom d'utilisateur</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="larg">mot de passe</label>
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

            {activeTab === "fichiers" && (
              <div className="tab-pane fade show active">
                <h3>Fichiers</h3>
                <div className="form-group">
                  <label htmlFor="fileName">Nom du fichier:</label>
                  <select className="form-control" name="fileName" id="fileName" onChange={(e) => setSelectedName(e.target.value)}>
                    <option value="Avis">Avis</option>
                    <option value="Lettre Commission">Lettre Commission</option>
                    <option value="Lettre Journal">Lettre Journal</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fileSelect">Selectionne un fichier:</label>
                  <input
                    type="file"
                    id="fileSelect"
                    className="form-control"
                    onChange={handleFileSelect}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleAddFile}>Ajouter</button>
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Nom du fichier</th>
                    </tr>
                  </thead>
                  <tbody>{renderFileRows()}</tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </center>
  );
};

export default Settings;
