import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import { Viewer } from 'react-doc-viewer';
import "./view.css";
import { Nav, NavDropdown } from 'react-bootstrap';
import { SlLogout } from 'react-icons/sl';

const View = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState('');
  const [data, setData] = useState("");
  const [currentSexe, setCurrentSexe] = useState('');
  const [currentNom, setCurrentNom] = useState('');
  const [currentPrenom, setCurrentPrenom] = useState('');
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

  const getFile=async()=>{
    try {
      const response = await axios.post("/getFile", { id: id });
      //console.log(response.data);
      setData(response.data["base64"]);
      // const buffer = new Uint8Array(response.data["piece"].data);
      // const binaryString = buffer.reduce((str, byte) => str + String.fromCharCode(byte), '');
  
      // // Decode the binary data
      // const decodedData = atob(binaryString);
  
      // // Create a Uint8Array from the decoded data
      // const uint8Array = new Uint8Array(decodedData.length);
      // for (let i = 0; i < decodedData.length; i++) {
      //   uint8Array[i] = decodedData.charCodeAt(i);
      // }
  
      // // Create a Blob from the Uint8Array
      // const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
      // const contentBlob = blob;
      // if (contentBlob) {
      //   const textContent = await contentBlob.text();
      //   console.log(textContent);
      //   //setData(contentBlob);
      //   setData(textContent);
      // }
    } catch (error) {
      console.error("Error fetching file content:", error);
      setData("");
    }
  }

  useEffect(() => {
    getFile();
  }, "");

  return (
    <center>
    <div className='doc'>
    <div className='appbare'>
    <Sidebar />
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
      <center><h1 className='espace_admin'>Espace Demandeur</h1></center>
    </div>
      <pre className='cadre'>
      <div style={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}>
    {data}
  </div>
      </pre>
    </div>
    </center>
  );
};

export default View;
