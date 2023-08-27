import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./updateAvis.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from '../../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const UpdateAvis = (props) => {
    const id = props.id;
    const [piece, setPiece]=useState([]);
    const [fileName, setFileName]=useState("");

    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        // Check file size
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (selectedFile.size > maxSize) {
            alert("La taille du fichier dépasse 10Mo.");
        }
        else{
            const fileName = selectedFile.name;
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileData = event.target.result;
                const base64FileData = btoa(String.fromCharCode(...new Uint8Array(fileData)));
                setPiece(base64FileData);
                setFileName(fileName);
            };
            fileReader.readAsArrayBuffer(selectedFile);
        }
    };

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
    
    const handleUpdate = async () => {
        if(piece!=[]){
            console.log("enter handle Update : "+fileName+", "+piece);
            alert("l'avis a ete bien modifier");
            await axios.post("/updateAvis", {piece: piece, fileName: fileName, id: id});
        }
        navigate("/listAO");
    }

    return (
        <div className="table-wrapper">
            <Navbar className="barad">
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
            </Navbar>
            <Sidebar />
            <center>
                <div className="center">
                    <input
                        className="form-control"
                        type="file"
                        id="file"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button type="button" onClick={handleUpdate}>Update</button>
                </div>
            </center>
        </div>
    );
};

export default UpdateAvis;
