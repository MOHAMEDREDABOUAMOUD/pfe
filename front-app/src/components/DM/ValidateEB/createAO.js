import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/sideBar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./createAO.css";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import { SlLogout } from 'react-icons/sl';
import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

export default function CreateAO() {
    const { id } = useParams();

    const [numAO, setNumAO] = useState('');
    const [numAOError, setNumAOError] = useState('');
    const [dateOuverturePlis, setDateOuverturePlis] = useState(new Date().toISOString().split('T')[0]);
    const [heureOuverturePlis, setHeureOuverturePlis] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const [datePublicationPortail, setDatePublicationPortail] = useState(new Date().toISOString().split('T')[0]);
    const [avisAO, setAvisAO] = useState([]);
    const [avisAOError, setAvisAOError] = useState('');
    const [fileNameAvis, setFileNameAvis] = useState('');

    const [dateEnvoieLettreCommission, setDateEnvoieLettreCommission] = useState(new Date().toISOString().split('T')[0]);
    const [dateAchevementTravauxCommission, setDateAchevementTravauxCommission] = useState(new Date().toISOString().split('T')[0]);
    const [destinataire, setDestinataire] = useState('');
    const [destinataireError, setDestinataireError] = useState('');
    const [numEnvoieLettreCommission, setNumEnvoieLettreCommission] = useState('');
    const [numEnvoieLettreCommissionError, setNumEnvoieLettreCommissionError] = useState('');
    const [lettreCommission, setLettreCommission] = useState([]);
    const [lettreCommissionError, setLettreCommissionError] = useState('');
    const [fileNameLC, setFileNameLC] = useState('');

    const [listJournal, setListJournal] = useState([]);
    const [listJournalError, setListJournalError] = useState([]);

    const [dateEnvoieJournal, setDateEnvoieJournal] = useState(new Date().toISOString().split('T')[0]);
    const [datePublicationJournal, setDatePublicationJournal] = useState(new Date().toISOString().split('T')[0]);
    const [formatJournal, setFormatJournal] = useState('');
    const [fournisseurJournal, setFournisseurJournal] = useState('');
    const [numEnvoieJournal, setNumEnvoieJournal] = useState('');
    const [lettreJournal, setLettreJournal] = useState([]);
    const [fileNameJ, setFileNameJ] = useState('');

    
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

    const handleSubmitAJ = (event) => {
        event.preventDefault();
        const j = {
            dateEnvoieJournal: dateEnvoieJournal,
            datePublicationJournal: datePublicationJournal,
            formatJournal: formatJournal,
            fournisseurJournal: fournisseurJournal,
            numEnvoieJournal: numEnvoieJournal,
            lettreJournal: lettreJournal,
            fileNameJ: fileNameJ
        };
        setListJournal((prevListJournal) => [...prevListJournal, j]);
        setDateEnvoieJournal("");
        setLettreJournal([]);
        setDatePublicationJournal("");
        setFormatJournal("");
        setFournisseurJournal("");
        setNumEnvoieJournal("");
        setFileNameJ("");
        setListJournalError('');
    }

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let hasErrors = false;
        if (numAO.trim() === "") {
            setNumAOError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (avisAO === []) {
            setAvisAOError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (destinataire.trim() === '') {
            setDestinataireError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (numEnvoieLettreCommission.trim() === '') {
            setNumEnvoieLettreCommissionError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (lettreCommission === []) {
            setLettreCommissionError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (listJournal.length() === 0) {
            setListJournalError('Ce champ est obligatoire');
            hasErrors = true;
        }

        if (!hasErrors) {
            const selectedTime = new Date();
            const [hours, minutes] = heureOuverturePlis.split(':');
            selectedTime.setHours(hours, minutes, 0, 0);

            console.log("enter handleSubmit");
            alert("l'AO a ete bien Creer");
            await axios.post("/createAO", { num: numAO, dateOuverturePlis: dateOuverturePlis, heureOuverturePlis: selectedTime, datePublicationPortail: datePublicationPortail, dateAchevementTravauxCommission: dateAchevementTravauxCommission, avis: avisAO, fileNameAvis: fileNameAvis, numEB: id, dateEnvoieLettreCommission: dateEnvoieLettreCommission, destinataire: destinataire, numEnvoieLettreCommission: numEnvoieLettreCommission, lettreCommission: lettreCommission, fileNameLC: fileNameLC, listJournal: listJournal });
            navigate("/listEBDM");
        }
    }
    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setAvisAO(base64FileData);
            setFileNameAvis(selectedFile.name);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };
    const handleFileUploadC = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setLettreCommission(base64FileData);
            setFileNameLC(selectedFile.name);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };
    const handleFileUploadJ = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setLettreJournal(base64FileData);
            setFileNameJ(selectedFile.name);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };
    return (
        <div className='formCreateUser'>
            <Navbar className="barad">
                <Navbar.Collapse className="justify-content-start">
                    <img src={logo} className="imgleft"></img>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="left">
                        <h1 href="#login" className="espacee">Espace DM</h1>
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
                <Sidebar />
            </Navbar>
            <form>
                <div className='form-group margin-top'>
                    <center><h3>Creation d'un AO</h3></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="numAO">num AO</label><br />
                    <input type="text" className={`form-control ${numAOError ? 'error-border' : ''}`} id="numAO" placeholder="num AO" value={numAO} onChange={(e) => setNumAO(e.target.value)} />
                    {numAOError && <p className='error-message'>{numAOError}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="dateOuverturePlis">Date ouverture plis</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateOuverturePlis"
                        value={dateOuverturePlis}
                        onChange={(e) => setDateOuverturePlis(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="heureOuverturePlis">heure ouverture du plis</label><br />
                    <input
                        type="time"
                        className="form-control"
                        id="heureOuverturePlis"
                        value={heureOuverturePlis}
                        onChange={(e) => setHeureOuverturePlis(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="datePublicationPortail">Date publication portail</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="datePublicationPortail"
                        value={datePublicationPortail}
                        onChange={(e) => setDatePublicationPortail(e.target.value)}
                    />
                </div>
                <div class="form-group flex-row">
                    <label for="avisAO" class="form-label">Avis AO : </label>
                    <input className={`form-control ${avisAOError ? 'error-border' : ''}`} type="file" id="avisAO" onChange={(e) => handleFileUpload(e)} />
                    {avisAOError && <p className='error-message'>{avisAOError}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="dateEnvoieLettreCommission">Date envoie lettre commission</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateEnvoieLettreCommission"
                        value={dateEnvoieLettreCommission}
                        onChange={(e) => setDateEnvoieLettreCommission(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <center><h3>Commission</h3></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="dateAchevementTravauxCommission">Date achevement travaux commission</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateAchevementTravauxCommission"
                        value={dateAchevementTravauxCommission}
                        onChange={(e) => setDateAchevementTravauxCommission(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="destinataire">Destinataire</label><br />
                    <input type="text" className={`form-control ${destinataireError ? 'error-border' : ''}`} id="destinataire" placeholder="Destinataire" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
                    {destinataireError && <p className='error-message'>{destinataireError}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="numEnvoieLettreCommission">num envoie lettre commission</label><br />
                    <input type="text" className={`form-control ${numEnvoieLettreCommissionError ? 'error-border' : ''}`} id="numEnvoieLettreCommission" placeholder="num envoie lettre commission" value={numEnvoieLettreCommission} onChange={(e) => setNumEnvoieLettreCommission(e.target.value)} />
                    {numEnvoieLettreCommissionError && <p className='error-message'>{numEnvoieLettreCommissionError}</p>}
                </div>
                <div class="form-group flex-row">
                    <label for="lettreCommission" class="form-label">Lettre commission : </label>
                    <input className={`form-control ${lettreCommissionError ? 'error-border' : ''}`} type="file" id="lettreCommission" onChange={(e) => handleFileUploadC(e)} />
                    {lettreCommissionError && <p className='error-message'>{lettreCommissionError}</p>}
                </div>
                <div className='form-group'>
                    <center><h3>Journal</h3></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="dateEnvoieJournal">Date envoie journal</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="dateEnvoieJournal"
                        value={dateEnvoieJournal}
                        onChange={(e) => setDateEnvoieJournal(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="datePublicationJournal">Date Publication journal</label><br />
                    <input
                        type="date"
                        className="form-control"
                        id="datePublicationJournal"
                        value={datePublicationJournal}
                        onChange={(e) => setDatePublicationJournal(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="formatJournal">format journal</label><br />
                    <input type="text" className="form-control" id="formatJournal" placeholder="format journal" value={formatJournal} onChange={(e) => setFormatJournal(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="fournisseurJournal">fournisseur journal</label><br />
                    <input type="text" className="form-control" id="fournisseurJournal" placeholder="fournisseur journal" value={fournisseurJournal} onChange={(e) => setFournisseurJournal(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="numEnvoieJournal">num envoie lettre journal</label><br />
                    <input type="text" className="form-control" id="numEnvoieJournal" placeholder="num envoie journal" value={numEnvoieJournal} onChange={(e) => setNumEnvoieJournal(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="lettreJournal" class="form-label">Lettre Journal : </label>
                    <input class="form-control" type="file" id="lettreJournal" onChange={(e) => handleFileUploadJ(e)} />
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmitAJ} className="btn btn-primary big-btn">Ajouter</button></center>
                    {listJournalError && <p className='error-message'>{listJournalError}</p>}
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmit} className="btn btn-primary big-btn">Creer</button></center>
                </div>
            </form>
        </div>
    )
}