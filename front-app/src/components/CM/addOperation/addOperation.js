import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import './add.css'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { SlLogout } from 'react-icons/sl';
import {IoMdNotifications} from 'react-icons/io';
import logo from "./logo-omrane.png";
import Navbar from 'react-bootstrap/Navbar';

const AddOperationCM = () => {
    const [agence, setAgence] = useState('Fes');
    const [imputation, setImputation] = useState('');
    const [nature_projet, setNatureProjet] = useState('');
    const [operation, setOperation] = useState('');
    const [programme, setProgramme] = useState('');
    const [situation, setSituation] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [type_projet, setTypeProjet] = useState('');
    const [piece, setPiece]=useState([]);

    const { id} = useParams();

    const navigate=useNavigate();
    const handleAddOperation =async (event) => {
        event.preventDefault();
        await axios.post("/addOperationDti", { id: id, agence: agence, imputation: imputation, nature_projet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, type_projet:type_projet, piece:piece});
        navigate(`/listEBCM`);
    };
    
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

    return (
        <div className='formCreateUseraddop'>
                        <Navbar className="barad">
                        <Navbar.Collapse className="justify-content-start">
              <img src={logo} className="imgleft"></img>
        </Navbar.Collapse>
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
        <Sidebar/>
      </Navbar>
            <form onSubmit={handleAddOperation}>
                <div className='form-group'>
                    <center><h5>Add operation</h5></center>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="exampleFormControlSelect1">Agence</label><br />
                    <select className="form-control" id="agence"onChange={(e) => setAgence(e.target.value)} value={agence}>
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
                <div class="form-group flex-row">
                    <label for="formFile" class="form-label">DA : </label>
                    <input class="form-control" type="file" id="formFile" onChange={(e) => handleFileUpload(e)}/>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">imputation</label><br />
                    <input type="text" class="form-control" id="imputation" placeholder="imputation"onChange={(e) => setImputation(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">nature projet</label><br />
                    <input type="text" class="form-control" id="nature_projet" placeholder="nature pojet" onChange={(e) => setNatureProjet(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">operation</label><br />
                    <input type="text" class="form-control" id="operation" placeholder="operation" onChange={(e) => setOperation(e.target.value)}/>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">programme</label><br />
                    <input type="text" class="form-control" id="programme" placeholder="programme" onChange={(e) => setProgramme(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">situation</label><br />
                    <input type="text" class="form-control" id="situation" placeholder="situation" onChange={(e) => setSituation(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">superficie</label><br />
                    <input type="text" class="form-control" id="superficie" placeholder="superficie" onChange={(e) => setSuperficie(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">type projet </label><br />
                    <input type="text" class="form-control" id="type_projet" placeholder="type projet" onChange={(e) => setTypeProjet(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">add</button>
                </div>
            </form>
        </div>
    );
}

export default AddOperationCM;
