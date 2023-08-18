import React, { useState } from 'react'
import Sidebar from '../sidebar/sideBar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./createAO.css";

export default function CreateAO() {
    const { id } = useParams();
    
    const [numAO, setNumAO] = useState('');
    const [dateOuverturePlis, setDateOuverturePlis] = useState('');
    const [heureOuverturePlis, setHeureOuverturePlis] = useState('');
    const [datePublicationPortail, setDatePublicationPortail] = useState('');
    const [avisAO, setAvisAO] = useState([]);
    const [fileNameAvis, setFileNameAvis] = useState('');

    const [dateEnvoieLettreCommission, setDateEnvoieLettreCommission] = useState('');
    const [dateAchevementTravauxCommission, setDateAchevementTravauxCommission] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [numEnvoieLettreCommission, setNumEnvoieLettreCommission] = useState('');
    const [lettreCommission, setLettreCommission] = useState([]);
    const [fileNameLC, setFileNameLC] = useState('');

    const [listJournal, setListJournal] = useState([]);

    const [dateEnvoieJournal, setDateEnvoieJournal] = useState('');
    const [datePublicationJournal, setDatePublicationJournal] = useState('');
    const [formatJournal, setFormatJournal] = useState('');
    const [fournisseurJournal, setFournisseurJournal] = useState('');
    const [numEnvoieJournal, setNumEnvoieJournal] = useState('');
    const [lettreJournal, setLettreJournal] = useState([]);
    const [fileNameJ, setFileNameJ] = useState('');

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
    }

    const navigate=useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedTime = new Date();
        const [hours, minutes] = heureOuverturePlis.split(':');
        selectedTime.setHours(hours, minutes, 0, 0);

        console.log("enter handleSubmit");
        await axios.post("/createAO", { num: numAO, dateOuverturePlis: dateOuverturePlis, heureOuverturePlis: selectedTime, datePublicationPortail: datePublicationPortail, dateAchevementTravauxCommission: dateAchevementTravauxCommission, avis: avisAO, fileNameAvis: fileNameAvis, numEB: id, dateEnvoieLettreCommission: dateEnvoieLettreCommission, destinataire: destinataire, numEnvoieLettreCommission: numEnvoieLettreCommission, lettreCommission: lettreCommission, fileNameLC: fileNameLC, listJournal: listJournal});
        navigate("/listEBDM");
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
            <Sidebar />
            <form>
                <div className='form-group margin-top'>
                    <center><h3>Creation d'un AO</h3></center>
                </div>
                <div className='form-group'>
                    <label htmlFor="numAO">num AO</label><br />
                    <input type="text" className="form-control" id="numAO" placeholder="num AO" value={numAO} onChange={(e) => setNumAO(e.target.value)} />
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
                    <input class="form-control" type="file" id="avisAO" onChange={(e) => handleFileUpload(e)}/>
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
                    <input type="text" className="form-control" id="destinataire" placeholder="Destinataire" value={destinataire} onChange={(e) => setDestinataire(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="numEnvoieLettreCommission">num envoie lettre commission</label><br />
                    <input type="text" className="form-control" id="numEnvoieLettreCommission" placeholder="num envoie lettre commission" value={numEnvoieLettreCommission} onChange={(e) => setNumEnvoieLettreCommission(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="lettreCommission" class="form-label">Lettre commission : </label>
                    <input class="form-control" type="file" id="lettreCommission" onChange={(e) => handleFileUploadC(e)}/>
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
                    <label htmlFor="numEnvoieJournal">num envoie lettre commission</label><br />
                    <input type="text" className="form-control" id="numEnvoieJournal" placeholder="num envoie journal" value={numEnvoieJournal} onChange={(e) => setNumEnvoieJournal(e.target.value)} />
                </div>
                <div class="form-group flex-row">
                    <label for="lettreJournal" class="form-label">Lettre Journal : </label>
                    <input class="form-control" type="file" id="lettreJournal" onChange={(e) => handleFileUploadJ(e)}/>
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmitAJ} className="btn btn-primary big-btn">Ajouter journal</button></center>
                </div>
                <div className="form-group">
                    <center><button type="button" onClick={handleSubmit} className="btn btn-primary big-btn">Creer l'AO</button></center>
                </div>
            </form>
        </div>
    )
}