import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import "./main.css"
import Sidebar from '../sidebar/sideBar';
import logo from "./logo-omrane.png";
import welcome from "./welcome.png";
import Container from 'react-bootstrap/Container';
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

function Maindem() {
  // State to track the active component in MainAdmin
  const [activeComponent, setActiveComponent] = React.useState(null);

  // Function to set the active component
  const setActiveContent = (component) => {
    setActiveComponent(component);
  };

  const navigate=useNavigate();
  const handleNotifications=()=>{
    navigate(`/notifications`);
  }

  return (
    <div className="App">
      <Sidebar/>
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
              title="Mohammed Raji"
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={handleNotifications}><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item>
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Sidebar/>
      </Navbar>
      <center>
        <img src={welcome} className="welcome"></img>
      </center>
        {/* <div className="big-containt">
        <SideBar setActiveContent={setActiveContent} />
      <center>
      <div id="containt" className="containt">
        {activeComponent}
      </div>
      </center>
        </div> */}
    </div>
  );
}

export default Maindem;