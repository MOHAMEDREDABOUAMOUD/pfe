import React, { useEffect, useState } from 'react';
import "./updateEB.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "./logo-omrane.png";
import Sidebar from '../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const UpdateEB = () => {
    const { id } = useParams();

    const [objet, setObjet] = useState('');
    const [agence, setAgence] = useState('');
    const [observation, setObservation] = useState('');
    const [progNonProgram, setProgNonProgram] = useState(false);
    const [prog_nonprog, setProg_nonprog] = useState("Non");
    const [caution, setCaution] = useState('');
    const [estimation, setEstimation] = useState('');
    const [modePassation, setModePassation] = useState('');
    const [secteur, setSecteur] = useState('');
    const [qualification, setQualification] = useState('');
    const [numUtilisateur, setNumUtilisateur] = useState('');

    const navigate = useNavigate();
    const handleOperations = (id) => {
        navigate(`/listOperations/${id}`);
    };
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("numUtilisateur : "+numUtilisateur);
        const progValue = progNonProgram ? "Oui" : "Non";
        setProg_nonprog(progValue);

        try {
            await axios.post("/updateEB", {
                id: id,
                objet: objet,
                agence: agence,
                observation: observation,
                prog_nonprog: prog_nonprog,
                caution: caution,
                estimation: estimation,
                modePassation: modePassation,
                secteur: secteur,
                qualification: qualification,
                numUtilisateur:numUtilisateur
            });
            navigate("/listEB");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await axios.post("/getEB", { id: id });
                setObjet(userData.data["objet"]);
                setAgence(userData.data["agence"]);
                setObservation(userData.data["observation"]);
                if (userData.data["prog_nonprog"] == "Non") setProgNonProgram(false);
                else setProgNonProgram(true);
                //console.log(progNonProgram);
                setCaution(userData.data["caution"]);
                setEstimation(userData.data["estimation"]);
                setModePassation(userData.data["modePassation"]);
                setSecteur(userData.data["secteur"]);
                setQualification(userData.data["qualification"]);
                setNumUtilisateur(userData.data["numUtilisateur"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <center>
        <div className='all'>
        <div className='formCreateUser'>
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
              <NavDropdown.Item href="#action/3.1"><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
            <Sidebar />
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <center><h3>Creation d'une expression des besoins</h3></center>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="objet">objet</label><br />
                    <input type="text" className="form-control" id="objet" placeholder="objet" value={objet} onChange={(e) => setObjet(e.target.value)} />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="observation">observation</label><br />
                    <input type="text" className="form-control" id="observation" placeholder="obesrvation" value={observation} onChange={(e) => setObservation(e.target.value)} />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="caution">caution</label><br />
                    <input type="text" className="form-control" id="caution" placeholder="caution" value={caution} onChange={(e) => setCaution(e.target.value)} />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="estimation">estimation</label><br />
                    <input type="text" className="form-control" id="estimation" placeholder="estimation" value={estimation} onChange={(e) => setEstimation(e.target.value)} />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="progNonProgInput">prog-nonprog</label><br />
                    <input type="checkbox" id="progNonProg" checked={progNonProgram} onChange={(e) => setProgNonProgram(e.target.checked)} />
                </div>

                <div className="form-group flex-row">
                    <label htmlFor="agence">Agence</label><br />
                    <select className="form-control" id="agence" value={agence} onChange={(e) => setAgence(e.target.value)}>
                        <option> Fès </option>
                        <option> Boulemane </option>
                        <option> sefrou </option>
                        <option> Moulay yaacoub </option>
                        <option> taza </option>
                        <option> meknes </option>
                        <option> el hajeb </option>
                        <option> ifrane </option>
                    </select>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="modePassation">modePassation</label><br />
                    <select className="form-control" id="modePassation" value={modePassation} onChange={(e) => setModePassation(e.target.value)}>
                        <option>B.C</option>
                        <option>A.O.O.</option>
                        <option>A.O.R.</option>
                        <option>Marché négocié</option>
                        <option>consultation</option>
                        <option>concours</option>
                    </select>
                </div>
                <div className="form-group flex-row margin">
                    <label htmlFor="secteur">secteur</label><br />
                    <select className="form-control" id="secteur" value={secteur} onChange={(e) => setSecteur(e.target.value)}>
                        <option> 122 </option>
                        <option> 222 </option>
                        <option> 555</option>
                    </select>
                    <label htmlFor="qualification">qualification</label><br />
                    <select className="form-control" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)}>
                        <option> 000 </option>
                        <option> 100 </option>
                        <option> 999 </option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="formFile" className="form-label">files</label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Update files</button>
                </div>
                <div className='form-group'>
                    <center><h5>Operations</h5></center>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={() => { handleOperations(id) }}>Update operations</button>
                </div>
                <div className="form-group">
                    <center><button type="submit" className="btn btn-primary big-btn">Update</button></center>
                </div>
            </form>
        </div>
        </div>
        </center>
    );
};

export default UpdateEB;
