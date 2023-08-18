import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../sidebar/sideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';
import { SlLogout } from 'react-icons/sl';
import Navbar from 'react-bootstrap/Navbar';

export default function UpdateOpCM() {
    const { id} = useParams();

    const [agence, setAgence] = useState('');
    const [imputation, setImputation] = useState('');
    const [nature_projet, setNature_projet] = useState('');
    const [operation, setOperation] = useState("");
    const [programme, setProgramme] = useState("");
    const [situation, setSituation] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [type_projet, setType_projet] = useState('');
    const [piece, setPiece]=useState([]);

    const navigate=useNavigate();
    
    const handleUpdate=async(event)=>{
        event.preventDefault();
        await axios.post("/updateOperation", { id: id, agence: agence, imputation: imputation, nature_projet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, type_projet:type_projet, piece:piece});
        navigate(`/listEBCM`);
    }
    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setPiece(base64FileData);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await axios.post("/getOperation", { id: id });
                setAgence(userData.data["agence"]);
                setImputation(userData.data["imputation"]);
                setNature_projet(userData.data["natureProjet"]);
                setOperation(userData.data["operation"]);
                setProgramme(userData.data["programme"]);
                setSituation(userData.data["situation"]);
                setSuperficie(userData.data["superficie"]);
                setType_projet(userData.data["typeProjet"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <div className='formCreateUser'>
                        <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace CM</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mohammed Raji"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1"><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
            <Sidebar/>
            <form onSubmit={handleUpdate}>
                <div className='form-group'>
                    <center><h5>Operations</h5></center>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlSelect1">Agence</label><br />
                    <select className="form-control" id="exampleFormControlSelect1" value={agence} onChange={(e) => setAgence(e.target.value)}>
                        <option> Fès </option>
                        <option> Boulemane </option>
                        <option> sefrou </option>
                        <option> Moulay yaacoub </option>
                        <option> taza </option>
                        <option> meknes </option>
                        <option> el hajeb  </option>
                        <option> ifrane </option>

                    </select>
                </div>
                <div className="form-group flex-row">
                    <label for="formFile" className="form-label">DA : </label>
                    <input className="form-control" type="file" id="formFile" onChange={(e) => handleFileUpload(e)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">imputation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="imputation" value={imputation} onChange={(e) => setImputation(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">nature projet</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="nature pojet" value={nature_projet} onChange={(e) => setNature_projet(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">operation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="operation" value={operation} onChange={(e) => setOperation(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">programme</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="programme" value={programme} onChange={(e) => setProgramme(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">situation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="situation" value={situation} onChange={(e) => setSituation(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">superficie</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="superficie" value={superficie} onChange={(e) => setSuperficie(e.target.value)}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">type projet </label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="type projet" value={type_projet} onChange={(e) => setType_projet(e.target.value)}/>
                </div>
                <div className="form-group">
                    <center><button type="submit" className="btn btn-primary big-btn">modify</button></center>
                </div>
            </form>
        </div>
    )
}
