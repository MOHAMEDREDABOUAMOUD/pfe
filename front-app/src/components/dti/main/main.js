import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import "./main.css"
import Sidebar from '../sidebar/sideBar';
import logo from "./logo-omrane.png";
import welcome from "./welcome.png"

function Maindti() {
  // State to track the active component in MainAdmin
  const [activeComponent, setActiveComponent] = React.useState(null);

  // Function to set the active component
  const setActiveContent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="App">
      <div className="bara">
          <center><img src={logo} className="image"></img></center>
      </div>
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

export default Maindti;