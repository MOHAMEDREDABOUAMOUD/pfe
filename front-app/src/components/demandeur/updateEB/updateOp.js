import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../sidebar/sideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import { IoMdNotifications } from 'react-icons/io';
import "./updateOp.css"
import Navbar from 'react-bootstrap/Navbar';

export default function UpdateOp() {
    const { id } = useParams();

    const [agence, setAgence] = useState('');
    const [imputation, setImputation] = useState('');
    const [imputationError, setImputationError] = useState('');
    const [nature_projet, setNatureProjet] = useState('');
    const [nature_projetError, setNatureProjetError] = useState('');
    const [operation, setOperation] = useState("");
    const [operationError, setOperationError] = useState('');
    const [programme, setProgramme] = useState("");
    const [programmeError, setProgrammeError] = useState('');
    const [situation, setSituation] = useState('');
    const [situationError, setSituationError] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [superficieError, setSuperficieError] = useState('');
    const [type_projet, setTypeProjet] = useState('');
    const [type_projetError, setTypeProjetError] = useState('');
    const [piece, setPiece] = useState([]);
    const [pieceError, setPieceError] = useState('');

    
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

    const navigate = useNavigate();

    const handleUpdate = async (event) => {
        event.preventDefault();
        setImputationError('');
        setNatureProjetError('');
        setOperationError('');
        setProgrammeError('');
        setSituationError('');
        setSuperficieError('');
        setTypeProjetError('');
        setPieceError('');
        let hasErrors = false;

        if (imputation.trim() === '') {
            setImputationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (nature_projet.trim() === '') {
            setNatureProjetError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (operation.trim() === '') {
            setOperationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (programme.trim() === '') {
            setProgrammeError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (situation.trim() === '') {
            setSituationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (superficie.trim() === '') {
            setSuperficieError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (type_projet.trim() === '') {
            setTypeProjetError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (piece === []) {
            setPieceError('Ce champ est obligatoire');
            hasErrors = true;
        }

        if (!hasErrors) {
            await axios.post("/updateOperation", { id: id, agence: agence, imputation: imputation, nature_projet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, type_projet: type_projet, piece: piece });
            alert("l'operation a ete bien modifier");
            navigate(`/listEB`);
        }
    }
    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        // Check file size
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (selectedFile.size > maxSize) {
            alert("La taille du fichier dépasse 10Mo.");
        }
        else {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileData = event.target.result; // This is the binary buffer
                const base64FileData = btoa(fileData);
                setPiece(base64FileData);
            };
            fileReader.readAsArrayBuffer(selectedFile);
        }
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await axios.post("/getOperation", { id: id });
                setAgence(userData.data["agence"]);
                setImputation(userData.data["imputation"]);
                setNatureProjet(userData.data["natureProjet"]);
                setOperation(userData.data["operation"]);
                setProgramme(userData.data["programme"]);
                setSituation(userData.data["situation"]);
                setSuperficie(userData.data["superficie"]);
                setTypeProjet(userData.data["typeProjet"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <center>
        <div className='formCreateUser-dem-upeb'>
            <div className='appbare'>
    <Sidebar />
      <center><h1 className='espace_admin'>Espace Demandeur</h1></center>
    </div>
    <center><h1 className='titre'>Modification D'operation</h1></center>
            <form onSubmit={handleUpdate} className='forma'>
                <div className='disp'>
                <div class="form-group1">
                    <label for="exampleFormControlSelect1" className='lab'>Agence</label><br />
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
                <div class="form-group1">
                    <label for="formFile" className='lab'>DA : </label>
                    <input className={`form-control ${pieceError ? 'error-border' : ''}`} type="file" id="formFile" onChange={(e) => handleFileUpload(e)} />
                    {pieceError && <p className='error-message'>{pieceError}</p>}
                </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1" className='lab'>imputation</label><br />
                    <input type="text" className={`form-control ${imputationError ? 'error-border' : ''}`} id="imputation" placeholder="imputation" onChange={(e) => setImputation(e.target.value)} />
                    {imputationError && <p className='error-message'>{imputationError}</p>}
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1" className='lab'>nature projet</label><br />
                    <input type="text" className={`form-control ${nature_projetError ? 'error-border' : ''}`} id="nature_projet" placeholder="nature pojet" onChange={(e) => setNatureProjet(e.target.value)} />
                    {nature_projetError && <p className='error-message'>{nature_projetError}</p>}
                </div>
                    <div className='disp'>
                <div class="form-group1">
                    <label for="exampleFormControlInput1" className='lab'>operation</label><br />
                    <input type="text" className={`form-control ${operationError ? 'error-border' : ''}`} id="operation" placeholder="operation" onChange={(e) => setOperation(e.target.value)} />
                    {operationError && <p className='error-message'>{operationError}</p>}
                </div>
                <div class="form-group1">
                    <label for="exampleFormControlInput1" className='lab'>programme</label><br />
                    <input type="text" className={`form-control ${programmeError ? 'error-border' : ''}`} id="programme" placeholder="programme" onChange={(e) => setProgramme(e.target.value)} />
                    {programmeError && <p className='error-message'>{programmeError}</p>}
                </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1" className='lab'>situation</label><br />
                    <input type="text" className={`form-control ${situationError ? 'error-border' : ''}`} id="situation" placeholder="situation" onChange={(e) => setSituation(e.target.value)} />
                    {situationError && <p className='error-message'>{situationError}</p>}
                </div>
                <div className='disp'>
                <div class="form-group1">
                    <label for="exampleFormControlInput1" className='lab'>superficie</label><br />
                    <input type="text" className={`form-control ${superficieError ? 'error-border' : ''}`} id="superficie" placeholder="superficie" onChange={(e) => setSuperficie(e.target.value)} />
                    {superficieError && <p className='error-message'>{superficieError}</p>}
                </div>
                <div class="form-group1">
                    <label for="exampleFormControlInput1" className='lab'>type projet </label><br />
                    <input type="text" className={`form-control ${type_projetError ? 'error-border' : ''}`} id="type_projet" placeholder="type projet" onChange={(e) => setTypeProjet(e.target.value)} />
                    {type_projetError && <p className='error-message'>{type_projetError}</p>}
                </div>
                </div>
                <div className="form-group">
                    <center><button type="submit" className="botton">Modifier</button></center>
                </div>
            </form>
        </div>
        </center>
    )
}
