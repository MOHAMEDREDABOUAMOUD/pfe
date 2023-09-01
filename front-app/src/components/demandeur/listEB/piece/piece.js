import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./piece.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from '../../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const UpdatePiece = (props) => {
    const id = props.id;
    const [piece, setPiece] = useState([]);
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();

    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        // Check file size
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (selectedFile.size > maxSize) {
            alert("La taille du fichier dépasse 10Mo.");
        }
        else {
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

    const handleUpdate = async () => {
        if (piece != []) {
            alert("la piece a ete bien modifier");
            await axios.post("/updatePiece", { piece: piece, fileName: fileName, id: id });
        }
        navigate("/listEB");
    }

    return (
        <div className="table-wrapper">
            <center>
                <div className="center">
                    <input
                        className="form-control"
                        type="file"
                        id="file"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button type="button" onClick={handleUpdate}>Modifier</button>
                </div>
            </center>
        </div>
    );
};

export default UpdatePiece;
