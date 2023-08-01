import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Alert, Row, Col } from 'react-bootstrap';
import SideBar from "./SideBar"
import "./main.css"

function MainDemandeur() {
  // State to track the active component in MainAdmin
  const [activeComponent, setActiveComponent] = React.useState(null);

  // Function to set the active component
  const setActiveContent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="App">
        <div className="big-containt">
        <SideBar setActiveContent={setActiveContent} />
      <center>
      <div id="containt" className="containt">
        {activeComponent}
      </div>
      </center>
        </div>
    </div>
  );
}

export default MainDemandeur;