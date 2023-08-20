import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../../sidebar/sideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

export default function UpdateJournal() {
    const { id } = useParams();

    console.log("id passed to updateJournal"+id);

    const [numEnvoie, setNumEnvoie] = useState('');
    const [format, setFormat] = useState('');
    const [fournisseur, setFournisseur] = useState('');
    const [dateEnvoie, setDateEnvoie] = useState("");
    const [datePublication, setDatePublication] = useState("");
    const [fileName, setFileName] = useState("");
    const [lettreJournal, setLettreJournal] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJData = async () => {
            try {
                const jData = await axios.post("/getJournal", { id: id });
                setNumEnvoie(jData.data["numEnvoie"]);
                setFormat(jData.data["format"]);
                setFournisseur(jData.data["fournisseur"]);
                const backendDateEnvoie = jData.data["dateEnvoie"];
                const frontendDateEnvoie = new Date(backendDateEnvoie).toISOString().split("T")[0];
                setDateEnvoie(frontendDateEnvoie);

                const backendDatePublication = jData.data["datePublication"];
                const frontendDatePublication = new Date(backendDatePublication).toISOString().split("T")[0];
                setDatePublication(frontendDatePublication);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJData();
    }, [id]);

    const handleSubmitAJ = async () => {
        console.log(lettreJournal);
        await axios.post("/updateJournal", { num: id, numEnvoie: numEnvoie, format: format, fournisseur: fournisseur, dateEnvoie: dateEnvoie, datePublication: datePublication});
        navigate(`/listAO`);
    }

    return (
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
                            <NavDropdown.Item href="#action/3.1"><IoMdNotifications /> Notifications</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                <SlLogout /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Sidebar />
            <form>
                <div className='form-group'>
                    <center><h5>Journal</h5></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="dateEnvoieJournal">Date envoie journal</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateEnvoieJournal"
                        value={dateEnvoie}
                        onChange={(e) => setDateEnvoie(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="datePublicationJournal">Date Publication journal</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="datePublicationJournal"
                        value={datePublication}
                        onChange={(e) => setDatePublication(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="formatJournal">format journal</label><br />
                    <input type="text" className="form-control" id="formatJournal" placeholder="format journal" value={format} onChange={(e) => setFormat(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="fournisseurJournal">fournisseur journal</label><br />
                    <input type="text" className="form-control" id="fournisseurJournal" placeholder="fournisseur journal" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="numEnvoieJournal">num envoie lettre commission</label><br />
                    <input type="text" className="form-control" id="numEnvoieJournal" placeholder="num envoie journal" value={numEnvoie} onChange={(e) => setNumEnvoie(e.target.value)} />
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmitAJ} className="btn btn-primary big-btn">Ajouter journal</button></center>
                </div>
            </form>
        </div>
    )
}
