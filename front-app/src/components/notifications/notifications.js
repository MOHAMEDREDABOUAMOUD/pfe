import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './notifications.css';
import axios from 'axios';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Sidebar from '../demandeur/sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import logo from "./logo-omrane.png";
import { IoMdNotifications } from 'react-icons/io';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

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

  // const addNotification = () => {
  //     const newNotification = `New notification at ${new Date().toLocaleTimeString()}`+"\n  testttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttt";
  //     setNotifications([...notifications, newNotification]);
  // };

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
    <div className="cont">
      <Navbar className="barad">
        <Navbar.Collapse className="justify-content-start">
          <img src={logo} className="imgleft"></img>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace Demandeur</h1>
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
      <div className="conte">
        <h1>Notifications</h1>
        {/* <Button variant="primary" onClick={addNotification}>Add Notification</Button> */}
        <div className="mt-4">
          {notifications.map((notification, index) => (
            <Alert key={index} variant="success" className="mb-2 alert">
              {notification}
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
