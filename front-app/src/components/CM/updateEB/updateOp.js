import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import Sidebar from '../sidebar/sideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo-omrane.png'
import { IoMdNotifications } from 'react-icons/io';
import { SlLogout } from 'react-icons/sl';
import Navbar from 'react-bootstrap/Navbar';

export default function UpdateOpCM() {
    const { id } = useParams();

    const [agence, setAgence] = useState('');
    const [imputation, setImputation] = useState('');
    const [imputationError, setImputationError] = useState('');
    const [nature_projet, setNature_projet] = useState('');
    const [nature_projetError, setNatureProjetError] = useState('');
    const [operation, setOperation] = useState("");
    const [operationError, setOperationError] = useState('');
    const [programme, setProgramme] = useState("");
    const [programmeError, setProgrammeError] = useState('');
    const [situation, setSituation] = useState('');
    const [situationError, setSituationError] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [superficieError, setSuperficieError] = useState('');
    const [type_projet, setType_projet] = useState('');
    const [type_projetError, setTypeProjetError] = useState('');
    const [piece, setPiece] = useState([]);
    const [pieceError, setPieceError] = useState('');
    const navigate = useNavigate();

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
            navigate(`/listEBCM`);
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
        <div className='formCreateUser-cm-upeb'>
            <div className='appbare'>
    <Sidebar />
      <center><h1 className='espace_admin'>Espace CM</h1></center>
    </div>
    <center><h1 className='titre'>Modification Operation</h1></center>
            <form onSubmit={handleUpdate} className='forma'>
                <div className='disp'>
                <div class="form-group1">
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
                <div class="form-group1">
                    <label for="formFile">DA : </label>
                    <input className={`form-control ${pieceError ? 'error-border' : ''}`} type="file" id="formFile" onChange={(e) => handleFileUpload(e)} />
                    {pieceError && <p className='error-message'>{pieceError}</p>}
                </div>
                </div>
                <div className='disp'>
                <div class="form-group1">
                    <label for="exampleFormControlInput1">imputation</label><br />
                    <input type="text" className={`form-control ${imputationError ? 'error-border' : ''}`} id="imputation" placeholder="imputation" onChange={(e) => setImputation(e.target.value)} />
                    {imputationError && <p className='error-message'>{imputationError}</p>}
                </div>
                <div class="form-group1">
                    <label for="exampleFormControlInput1">nature projet</label><br />
                    <input type="text" className={`form-control ${nature_projetError ? 'error-border' : ''}`} id="nature_projet" placeholder="nature pojet" onChange={(e) => setNature_projet(e.target.value)} />
                    {nature_projetError && <p className='error-message'>{nature_projetError}</p>}
                </div>
                </div>
                
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">operation</label><br />
                    <input type="text" className={`form-control ${operationError ? 'error-border' : ''}`} id="operation" placeholder="operation" onChange={(e) => setOperation(e.target.value)} />
                    {operationError && <p className='error-message'>{operationError}</p>}
                </div>
                <div className='disp'>
                <div class="form-group1">
                    <label for="exampleFormControlInput1">programme</label><br />
                    <input type="text" className={`form-control ${programmeError ? 'error-border' : ''}`} id="programme" placeholder="programme" onChange={(e) => setProgramme(e.target.value)} />
                    {programmeError && <p className='error-message'>{programmeError}</p>}
                </div>
                <div class="form-group1">
                    <label for="exampleFormControlInput1">situation</label><br />
                    <input type="text" className={`form-control ${situationError ? 'error-border' : ''}`} id="situation" placeholder="situation" onChange={(e) => setSituation(e.target.value)} />
                    {situationError && <p className='error-message'>{situationError}</p>}
                </div>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">superficie</label><br />
                    <input type="text" className={`form-control ${superficieError ? 'error-border' : ''}`} id="superficie" placeholder="superficie" onChange={(e) => setSuperficie(e.target.value)} />
                    {superficieError && <p className='error-message'>{superficieError}</p>}
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">type projet </label><br />
                    <input type="text" className={`form-control ${type_projetError ? 'error-border' : ''}`} id="type_projet" placeholder="type projet" onChange={(e) => setType_projet(e.target.value)} />
                    {type_projetError && <p className='error-message'>{type_projetError}</p>}
                </div>
                <div className="form-group">
                    <center><button type="submit" className="botton">modifier</button></center>
                </div>
            </form>
        </div>
    )
}
