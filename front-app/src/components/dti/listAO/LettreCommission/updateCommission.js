import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../../sidebar/sideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

export default function UpdateCommission() {
    const { id } = useParams();

    console.log("id passed to updateCommission"+id);

    const [numEnvoie, setNumEnvoie] = useState('');
    const [dateEnvoie, setDateEnvoie] = useState("");
    const [destinataire, setDestinataire] = useState('');

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

    useEffect(() => {
        const fetchJData = async () => {
            try {
                const jData = await axios.post("/getCommission", { id: id });
                setNumEnvoie(jData.data["numEnvoie"]);
                const backendDateEnvoie = jData.data["dateEnvoie"];
                const frontendDateEnvoie = new Date(backendDateEnvoie).toISOString().split("T")[0];
                setDateEnvoie(frontendDateEnvoie);
                setDestinataire(jData.data["destinataire"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJData();
    }, [id]);

    const handleSubmitAJ = async () => {
        alert("la commission a ete bien modifier");
        await axios.post("/updateCommission", { num: id,numEnvoie: numEnvoie, destinataire: destinataire, dateEnvoie: dateEnvoie});
        navigate(`/listAODti`);
    }

    return (
        <center>
        <div className='formCreateUser-dem-upeb'>
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
      <center><h1 className='espace_admin'>Espace Demandeur</h1></center>
    </div>
            <form>
                <div className='form-group'>
                    <center><h5 className='titre'>Commission</h5></center>
                </div>
                <div className='disp'>
                <div className='form-group1ad'>
                    <label htmlFor="numEnvoieCommission">num envoie lettre commission</label><br />
                    <input type="text" className="form-control" id="numEnvoieCommission" placeholder="num envoie Commission" value={numEnvoie} onChange={(e) => setNumEnvoie(e.target.value)} />
                </div>
                <div className='form-group2ad'>
                    <label htmlFor="dateEnvoieCommission">Date envoie Commission</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateEnvoieCommission"
                        value={dateEnvoie}
                        onChange={(e) => setDateEnvoie(e.target.value)}
                    />
                </div>
                </div>
                
                <div className='form-group'>
                    <label htmlFor="formatCommission">destinataire</label><br />
                    <input type="text" className="form-control" id="formatCommission" placeholder="destinataire" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmitAJ} className="botton">Modifier</button></center>
                </div>
                
            </form>
        </div>
        </center>
    )
}
