import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import { IoMdNotifications } from 'react-icons/io';
import "./createEB.css";

import Navbar from 'react-bootstrap/Navbar';

const AddOperationDti = () => {
  const [agence, setAgence] = useState('Fes');
  const [imputation, setImputation] = useState('');
  const [imputationError, setImputationError] = useState('');
  const [nature_projet, setNatureProjet] = useState('');
  const [nature_projetError, setNatureProjetError] = useState('');
  const [operation, setOperation] = useState('');
  const [operationError, setOperationError] = useState('');
  const [programme, setProgramme] = useState('');
  const [programmeError, setProgrammeError] = useState('');
  const [situation, setSituation] = useState('');
  const [situationError, setSituationError] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [superficieError, setSuperficieError] = useState('');
  const [type_projet, setTypeProjet] = useState('');
  const [type_projetError, setTypeProjetError] = useState('');
  const [piece, setPiece] = useState("");
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

  const { id } = useParams();

  const navigate = useNavigate();
  const handleAddOperation = async (event) => {
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

    if (imputation === '') {
      setImputationError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (nature_projet === '') {
      setNatureProjetError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (operation === '') {
      setOperationError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (programme === '') {
      setProgrammeError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (situation === '') {
      setSituationError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (superficie === '') {
      setSuperficieError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (type_projet === '') {
      setTypeProjetError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (piece === "") {
      setPieceError('Ce champ est obligatoire');
      hasErrors = true;
    }
    if (!hasErrors) {
      alert("l'operation a ete bien ajouter");
      await axios.post("/addOperationDti", { id: id, agence: agence, imputation: imputation, nature_projet: nature_projet, operation: operation, programme: programme, situation: situation, superficie: superficie, type_projet: type_projet, piece: piece });
      navigate(`/listEBDti`);
    }
    else {
      alert("l'operation n'a pas ete ajouter");
    }
  };

  return (
    <center>
      <div className='formCreateUser-dti-upeb'>
        <div className='appbare'>
          <Sidebar />
          <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'

              title={currentUser}
            >
              <NavDropdown.Item onClick={() => { navigate("/notifications") }} className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <center><h1 className='espace_admin'>Espace DTI</h1></center>
        </div>
        <center><h1 className='titre'>Ajouter Operation</h1></center>
        <form onSubmit={handleAddOperation} className='forma'>
          <div className='disp'>
            <div className="form-group1ad">
              <label htmlFor="exampleFormControlSelect1" className='lab'>Agence</label><br />
              <select className='form-control' id="agence" onChange={(e) => setAgence(e.target.value)} value={agence}>
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
            <div class="form-group2ad">
              <label for="formFile" class="lab">DA : </label>
              <input class="form-control" type="number" id="formFile" onChange={(e) => setPiece(e.target.value)} />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1" className='lab'>imputation</label><br />
            <input type="text" class="form-control" id="imputation" placeholder="imputation" onChange={(e) => setImputation(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1" className='lab'>nature projet</label><br />
            <input type="text" class="form-control" id="nature_projet" placeholder="nature pojet" onChange={(e) => setNatureProjet(e.target.value)} />
          </div>
          <div className='disp'>
            <div class="form-group1ad">
              <label for="exampleFormControlInput1" className='lab'>operation</label><br />
              <input type="text" class="form-control" id="operation" placeholder="operation" onChange={(e) => setOperation(e.target.value)} />
            </div>
            <div class="form-group2ad">
              <label for="exampleFormControlInput1" className='lab'>programme</label><br />
              <input type="text" class="form-control" id="programme" placeholder="programme" onChange={(e) => setProgramme(e.target.value)} />
            </div>
          </div>
          <div className='disp'>
            <div class="form-group1ad">
              <label for="exampleFormControlInput1" className='lab'>situation</label><br />
              <input type="text" class="form-control" id="situation" placeholder="situation" onChange={(e) => setSituation(e.target.value)} />
            </div>
            <div class="form-group2ad">
              <label for="exampleFormControlInput1" className='lab'>superficie</label><br />
              <input type="text" class="form-control" id="superficie" placeholder="superficie" onChange={(e) => setSuperficie(e.target.value)} />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1" className='lab'>type projet </label><br />
            <input type="text" class="form-control" id="type_projet" placeholder="type projet" onChange={(e) => setTypeProjet(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit" className="botton">Ajouter</button>
          </div>
        </form>
      </div>
    </center>
  );
}

export default AddOperationDti;
