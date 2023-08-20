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

export default function UpdateCommission() {
    const { id } = useParams();

    console.log("id passed to updateCommission"+id);

    const [numEnvoie, setNumEnvoie] = useState('');
    const [dateEnvoie, setDateEnvoie] = useState("");
    const [destinataire, setDestinataire] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJData = async () => {
            try {
                const jData = await axios.post("/getCommission", { id: id });
                setNumEnvoie(jData.data["numEnvoie"]);
                const backendDateEnvoie = jData.data["dateEnvoie"];
                const frontendDateEnvoie = new Date(backendDateEnvoie).toISOString().split("T")[0];
                setDateEnvoie(frontendDateEnvoie);
                setDestinataire(jData.data["destinataire"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJData();
    }, [id]);

    const handleSubmitAJ = async () => {
        await axios.post("/updateCommission", { num: id,numEnvoie: numEnvoie, destinataire: destinataire, dateEnvoie: dateEnvoie});
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
                    <center><h5>Commission</h5></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="numEnvoieCommission">num envoie lettre commission</label><br />
                    <input type="text" className="form-control" id="numEnvoieCommission" placeholder="num envoie Commission" value={numEnvoie} onChange={(e) => setNumEnvoie(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="dateEnvoieCommission">Date envoie Commission</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateEnvoieCommission"
                        value={dateEnvoie}
                        onChange={(e) => setDateEnvoie(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="formatCommission">destinataire</label><br />
                    <input type="text" className="form-control" id="formatCommission" placeholder="destinataire" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmitAJ} className="btn btn-primary big-btn">Update Commission</button></center>
                </div>
            </form>
        </div>
    )
}
