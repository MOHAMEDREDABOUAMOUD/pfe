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
        const fileName = selectedFile.name;
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result;
            const base64FileData = btoa(String.fromCharCode(...new Uint8Array(fileData)));
            setPiece(base64FileData);
            setFileName(fileName);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };
    
    const handleUpdate = async () => {
        if(piece!=[]){
            console.log("enter handle Update : "+fileName+", "+piece);
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
                            title="Mohammed Raji"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item href="#action/3.1"><IoMdNotifications /> Notifications</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <SlLogout /> Logout
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
