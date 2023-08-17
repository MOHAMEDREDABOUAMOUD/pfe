import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import "./main.css"
import Sidebar from '../sidebar/sideBar';
import logo from "./logo-omrane.png";
import welcome from "./welcome.png";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';

import Navbar from 'react-bootstrap/Navbar';

function Maindem() {
  // State to track the active component in MainAdmin
  const [activeComponent, setActiveComponent] = React.useState(null);

  // Function to set the active component
  const setActiveContent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="App">
      <Sidebar/>
      <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
            <h1 href="#login" className="espacee">Espace Demandeur</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <h3 className="absolutely-positioned"><FaUserTie/> Mohammed Raji</h3>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login" className="logout"><SlLogout/></a>
          </Navbar.Text>
        </Navbar.Collapse>
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
      <Sidebar/>
    </div>
  );
}

export default Maindem;