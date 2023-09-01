import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './notifications.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Nav, NavDropdown } from 'react-bootstrap';
import { SlLogout } from 'react-icons/sl';
import Sidebar from '../demandeur/sidebar/sideBar';

import logo from "./logo-omrane.png";


import {AiFillDashboard} from 'react-icons/ai';

import Navbar from 'react-bootstrap/Navbar';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const [currentSexe, setCurrentSexe] = useState('');
  const [currentNom, setCurrentNom] = useState('');
  const [currentPrenom, setCurrentPrenom] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();
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

  const getNotifications = async () => {
    try {
      const response = await axios.post("/getNotifications", { id: 1 });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRows = async () => {
    const u = await getNotifications();
    console.log(u);
    if (u != null) {
      setNotifications(u);
    }
    else setNotifications([]);
  };

  useEffect(() => {
    getRows();
  }, []);

  return (
    <center>
    <div className="cont">
      <div className='appbare'>
    
    <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'
              
              title={currentUser}
            >
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      <center><h1 className='espace_admin'>Notifications</h1></center>
    </div>
      <div className="conte">
        <h1 className='titre'>Notifications</h1>
        <div className="mt-4">
          {notifications.map((notification, index) => (
            <Alert key={index} variant="success" className="mb-2 alert">
              {notification}
            </Alert>
          ))}
        </div>
      </div>
    </div>
    </center>
  );
};

export default Notifications;
