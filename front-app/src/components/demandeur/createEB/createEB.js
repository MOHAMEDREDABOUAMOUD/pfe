import React, { useEffect, useState } from "react";
import "./createEB.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo-omrane.png";
import Sidebar from '../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import { BsFillTrashFill } from "react-icons/bs";

const CreateEB = () => {
    const sectors = [
        {
            sector: "Terrassements",
            qualifications: [
                "travaux de terrassements généraux en masse",
                "travaux terrassements spéciaux",
                "travaux de minage et déroctage",
                "travaux d'enrochement et de drainage",
                "travaux de fouilles souterraines"
            ]
        },
        {
            sector: "Travaux de voirie",
            qualifications: [
                "assises non traitées et enduits superficiels",
                "assises traitées en enrobés",
                "travaux de bétonnage et de dallage de trottoirs et de chemins piétons",
                "ouverture et entretien de pistes"
            ]
        },
        {
            sector: "Assainissement - Pose de conduites",
            qualifications: [
                "travaux simples d’assainissement liquide et de voirie (conduites et ouvrages annexes)",
                "travaux souterrains d’assainissement (ovoïdes, galeries)",
                "travaux de réalisation de stations de traitement et de rejet",
                "travaux d’assainissement autonome (fosses septiques, épandage…)",
                "travaux de réfection et de remise en état de chaussées"
            ]
        },
        {
            sector: "Travaux d’électrification",
            qualifications: [
                "réalisation de réseau électrique : M et B tension (aérien et souterrain)",
                "pose de poteaux électriques",
                "installation de postes de transformation"
            ]
        },
        {
            sector: "Eau Potable",
            qualifications: [
                "travaux courants d’adduction d’eau potable (conduites et ouvrages annexes)",
                "Travaux d’installation des équipements de surpression et de génie civil",
                "réfection et remise en état de chaussées"
            ]
        },
        {
            sector: "Réseaux Téléphoniques",
            qualifications: [
                "travaux simples de réseaux téléphoniques (poteaux et câblages)",
                "pose de conduites, chambres de tirage et ouvrages annexes."
            ]
        },
        {
            sector: "Jardins – Espaces verts",
            qualifications: [
                "apports de terres végétales et travaux de plantations",
                "entretien et maintenance des jardins",
                "installation du matériel et systèmes d’arrosage"
            ]
        },
        {
            sector: "Réalisation d’ouvrages d’art",
            qualifications: [
                "ouvrages d’art en béton armé ou maçonnerie",
                "ouvrages d’art en acier",
                "ouvrages d’art en béton pré ou post-contraint",
                "ouvrages d’art exceptionnels en béton armé ou maçonnerie",
                "ouvrages d’art exceptionnels en acier",
                "ouvrages d’art exceptionnels en béton pré ou post-contraint",
                "ouvrages d’art souterrains en béton armé et maçonnerie",
                "construction de châteaux et réservoirs d’eau de capacité <100m3",
                "construction de châteaux et réservoirs d’eau de capacité 100m3 < ≤ 500m3",
                "construction de châteaux et réservoirs d’eau de capacité >500m3"
            ]
        },
        {
            sector: "Gros-œuvres",
            qualifications: [
                "travaux courants en béton armé et maçonnerie",
                "travaux exceptionnels en béton armé et maçonnerie",
                "travaux de réparation des structures et de travaux en sous œuvre",
                "préfabrication et mise en œuvre d’éléments de construction"
            ]
        },
        {
            sector: "Menuiserie Bois - Charpente",
            qualifications: [
                "fabrication et pose de menuiseries bois",
                "fabrication et pose de volets roulants en bois",
                "charpente en bois",
                "travaux et mise en œuvre de parquets en bois"
            ]
        },
        {
            sector: "Menuiserie aluminium, pvc et ferronnerie",
            qualifications: [
                "travaux de menuiserie en aluminium",
                "travaux de fourniture et de pose de volets roulants en aluminium",
                "travaux de façaderie et murs rideaux en aluminium",
                "travaux de menuiserie en PVC",
                "travaux de fourniture et de pose de volets roulants en PVC",
                "travaux de ferronnerie",
                "travaux de charpente métallique",
                "travaux d’installation de cloisons amovibles"
            ]
        },
        {
            sector: "Ascenseurs – Monte charges",
            qualifications: [
                "travaux de monte-charges et d'ascenseurs"
            ]
        },
        {
            sector: "Plomberie – Chauffage - Climatisation",
            qualifications: [
                "travaux simples de plomberie sanitaire",
                "travaux de haute technicité de plomberie sanitaire",
                "travaux d’installation et d’équipement des bassins et des fontaines",
                "travaux d'installation de systèmes de chauffe-eau solaire",
                "travaux d'installation de gaz et d’air comprimé",
                "travaux simples de climatisation",
                "travaux de haute technicité de climatisation",
                "travaux d'installation de chauffage central et production d’eau chaude",
                "travaux de haute technicité de chauffage central et de production d’eau chaude"
            ]
        },
        {
            sector: "Électricité",
            qualifications: [
                "travaux d'installations électriques à usage domestique",
                "travaux d'installations électriques de grands ensembles",
                "travaux d'installations électriques à usage industriel"
            ]
        },
        {
            sector: "Téléphone - Sonorisation",
            qualifications: [
                "travaux d'installations téléphoniques dans les bâtiments",
                "travaux de sonorisation",
                "travaux d’isolation et de traitements acoustiques",
                "travaux de gestion technique centralisée",
                "travaux de précâblage informatique",
                "travaux de détection et protection incendie automatisée"
            ]
        },
        {
            sector: "Peinture - Vitrerie",
            qualifications: [
                "travaux de peinture générale de bâtiment",
                "travaux de vitrerie"
            ]
        },
        {
            sector: "Étanchéité - Isolation",
            qualifications: [
                "travaux simples d'étanchéité",
                "travaux d'étanchéité de haute technicité",
                "travaux d'isolation thermique et acoustique",
                "travaux d'isolation thermique et acoustique de haute technicité"
            ]
        },
        {
            sector: "Carrelages – Revêtements",
            qualifications: [
                "travaux de revêtement courant",
                "travaux de faux planchers et faux plafonds industriels",
                "travaux de revêtements spéciaux (revêtements industriels)",
                "travaux de taille et de pose de revêtements en pierre"
            ]
        },
        {
            sector: "Plâtrerie",
            qualifications: [
                "travaux de maçonnerie en plâtre",
                "travaux d’enduits en plâtre",
                "travaux de faux plafonds en plâtre"
            ]
        },
        {
            sector: "Construction en matériaux locaux",
            qualifications: [
                "travaux de construction traditionnelle en pierre",
                "travaux de construction traditionnelle en terre banchée (pisé)",
                "travaux de construction traditionnelle en brique de terre stabilisée (BTS)",
                "travaux de construction en voûtage en BTS"
            ]
        },
        {
            sector: "Équipement intérieur - Décoration",
            qualifications: [
                "travaux d’installation de cuisines",
                "travaux d’ameublement et agencement",
                "travaux de revêtement en bois et ébénisterie",
                "travaux de ferronnerie d’art"
            ]
        },
        {
            sector: "Isolation frigorifique et chambres froides",
            qualifications: [
                "travaux de d’installation de chambres froides"
            ]
        },
        {
            sector: "Professions Artisanales",
            qualifications: [
                "travaux de pose de carreaux et de zellij traditionnels",
                "travaux de plâtre sculpté traditionnel",
                "travaux de tadellakt",
                "travaux traditionnels de revêtement en bois peints",
                "travaux de dinanderie et lustrerie traditionnelles"
            ]
        },
        {
            sector: "Réhabilitation de bâtiments anciens",
            qualifications: [
                "travaux simples de réhabilitation",
                "travaux complexes de réhabilitation",
                "travaux de restauration et réhabilitation du patrimoine bâti"
            ]
        }
    ];
    const [objet, setObjet] = useState("");
    const [objetError, setObjetError] = useState("");
    const [observation, setObservation] = useState("");
    const [observationError, setObservationError] = useState("");
    const [caution, setCaution] = useState("");
    const [cautionError, setCautionError] = useState("");
    const [estimation, setEstimation] = useState("");
    const [estimationError, setEstimationError] = useState("");
    const [progNonProgram, setProgNonProgram] = useState(true);
    const [progNonProg, setProgNonProg] = useState("Non");
    const [agence, setAgence] = useState("Fes");

    const [piece, setPiece] = useState([]);
    const [fileName, setFileName] = useState("");
    const [pieceError, setPieceError] = useState('');

    const [agenceOp, setAgenceOp] = useState("Fes");
    const [modePassation, setModePassation] = useState("B.C");
    const [secteur, setSecteur] = useState("Terrassements");
    const [qualification, setQualification] = useState("travaux de terrassements généraux en masse");
    const [libelle, setLibelle] = useState("");
    const [file, setFile] = useState(null);
    const [daFile, setDaFile] = useState([]);
    const [daFileName, setDaFileName] = useState("");
    const [imputation, setImputation] = useState("");
    const [natureProjet, setNatureProjet] = useState("");
    const [operation, setOperation] = useState("");
    const [programme, setProgramme] = useState("");
    const [situation, setSituation] = useState("");
    const [superficie, setSuperficie] = useState("");
    const [typeProjet, setTypeProjet] = useState("");
    const [operationError, setOperationError] = useState('');

    const [errorMessagelibelle, setErrorMessagelibelle] = useState('');
    const [errorMessagefile, setErrorMessagefile] = useState('');
    const [errorMessageAgence, setErrorMessageAgence] = useState('');
    const [errorMessageDA, setErrorMessageDA] = useState('');
    const [errorMessageim, setErrorMessageim] = useState('');
    const [errorMessagenp, setErrorMessagenp] = useState('');
    const [errorMessageop, setErrorMessageop] = useState('');
    const [errorMessageprog, setErrorMessageprog] = useState('');
    const [errorMessagesit, setErrorMessagesit] = useState('');
    const [errorMessagesup, setErrorMessagesup] = useState('');
    const [errorMessagetp, setErrorMessagetp] = useState('');


    const [EB, setEB] = useState({}); // Dictionary to store all data
    const [fileList, setFileList] = useState([]); // List of files
    const [operationList, setOperationList] = useState([]); // List of operations

    const [qualificationOptions, setQualificationOptions] = useState([]); // Available qualifications for the selected sector

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

    const handleSectorChange = (selectedSector) => {
        setSecteur(selectedSector);
        const selectedSectorObj = sectors.find((sector) => sector.sector === selectedSector);
        if (selectedSectorObj) {
            setQualificationOptions(selectedSectorObj.qualifications);
            setQualification(selectedSectorObj.qualifications[0]); // Clear the selected qualification when changing sectors
        }
    };


    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        // Check file size
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (selectedFile.size > maxSize) {
            alert("La taille du fichier dépasse 10Mo.");
        }
        else {
            const fileName = selectedFile.name;
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileData = event.target.result;
                const base64FileData = btoa(String.fromCharCode(...new Uint8Array(fileData)));
                setPiece(base64FileData);
                setFileName(fileName);
            };
            fileReader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleDAFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        // Check file size
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (selectedFile.size > maxSize) {
            alert("La taille du fichier dépasse 10Mo.");
        }
        else {
            const fileName = selectedFile.name;
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileData = event.target.result;
                const base64FileData = btoa(String.fromCharCode(...new Uint8Array(fileData)));
                setDaFile(base64FileData);
                setDaFileName(fileName);
            };
            fileReader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleAddFile = (event) => {
        let hasErrorsp = false;
        if (libelle.trim() === '') {
            // Display the error message if libelle is empty
            setErrorMessagelibelle('Ce champ est obligatoire');
            hasErrorsp = true;
        } else {
            setErrorMessagelibelle('');
            let hasErrorsp = false;
        }
        if (!hasErrorsp) {
            event.preventDefault();
            // Handle file upload logic here
            const filee = {
                name: libelle,
                fileName: fileName,
                file: piece,
            };
            console.log("piece : " + piece);
            setFileList((prevFileList) => [...prevFileList, filee]);
            setLibelle("");
            setPiece([]);
            setFileName("");
            setPieceError("");
        }

    };

    const handleAddOperation = (event) => {
        let hasErrorspp = false;
        if (agence.trim() === '') {
            setErrorMessageAgence('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessageAgence('');
        }
        if (imputation.trim() === '') {
            setErrorMessageim('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessageim('');
        }
        if (natureProjet.trim() === '') {
            setErrorMessagenp('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessagenp('');

        }
        if (operation.trim() === '') {
            setErrorMessageop('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessageop('');

        }
        if (programme.trim() === '') {
            setErrorMessageprog('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessageprog('');

        }
        if (situation.trim() === '') {
            setErrorMessagesit('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessagesit('');

        }
        if (superficie.trim() === '') {
            setErrorMessagesup('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessagesup('');

        }
        if (typeProjet.trim() === '') {
            setErrorMessagetp('Ce champ est obligatoire');
            hasErrorspp = true;
        } else {
            setErrorMessagetp('');

        }
        if (!hasErrorspp) {
            event.preventDefault();
            //event.preventDefault();
            // Handle adding operation logic here
            const op = {
                agence: agenceOp,
                daFile: daFile,
                daFileName: daFileName,
                imputation: imputation,
                natureProjet: natureProjet,
                operation: operation,
                programme: programme,
                situation: situation,
                superficie: superficie,
                typeProjet: typeProjet,
            };
            console.log("da : " + daFile);
            setOperationList((prevOperationList) => [...prevOperationList, op]);
            setAgence("Fes");
            setDaFile([]);
            setDaFileName("");
            setImputation("");
            setNatureProjet("");
            setOperation("");
            setProgramme("");
            setSituation("");
            setSuperficie("");
            setTypeProjet("");
            setOperationError("");
            //console.log(operationList);
        }

    }

    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Combine all data into the EB dictionary
        // Check if any of the required fields are empty
        let hasErrors = false;
        if (objet === '') {
            setObjetError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (observation === '') {
            setObservationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (caution === '') {
            setCautionError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (estimation === '') {
            setEstimationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (fileList.length === 0) {
            setPieceError('veuillez ajouter au moins une piece');
            hasErrors = true;
        }
        if (operationList.length === 0) {
            setOperationError('veuillez ajouter au moins une operation');
            hasErrors = true;
        }
        if (!hasErrors) {
            const progValue = progNonProgram ? "Oui" : "Non";
            setProgNonProg(progValue);
            const EBData = {
                objet: objet,
                observation: observation,
                caution: caution,
                estimation: estimation,
                progNonProg: progNonProg,
                agence: agence,
                modePassation: modePassation,
                secteur: secteur,
                qualification: qualification,
                fileList: fileList,
                operationList: operationList,
            };
            setEB(EBData);
            try {
                alert("l'expression des besoins a ete bien creer");
                navigate("/listEB");
                await axios.post("/createEB", { objet: objet, observation: observation, caution: caution, estimation: estimation, progNonProg: progValue, agence: agence, modePassation: modePassation, secteur: secteur, qualification: qualification, fileList: fileList, operationList: operationList });
            } catch (error) {
                console.log(error);
            }
        }
        else {
            alert("l'expression des besoins n'a pas ete creer");
        }
    };

    useEffect(() => {
        handleSectorChange("Terrassements");
    }, []);

    const deleteOp = (index) => {
        const updatedOperationList = operationList.filter((operation, i) => i !== index);
        setOperationList(updatedOperationList);
    }
    const deleteFile = (index) => {
        const updatedFileList = fileList.filter((file, i) => i !== index);
        setFileList(updatedFileList);
    }

    return (
        <center>
            <div className="formCreateUser-dm-upeb">
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
                    <center><h1 className='espace_admin'>Espace Demandeur</h1></center>
                </div>
                <center><h1 className='titre'>Creation Expression Besoins</h1></center>
                <form onSubmit={handleFormSubmit} className="forma">
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="objet" className="lab">objet</label>
                            <br />
                            <input
                                type="text"
                                className={`form-control ${objetError ? 'error-border' : ''}`}
                                id="objet"
                                placeholder="objet"
                                value={objet}
                                onChange={(e) => setObjet(e.target.value)}
                            />
                            {objetError && <p className='error-message'>{objetError}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="observation" className="lab">observation</label>
                            <br />
                            <input
                                type="text"
                                className={`form-control ${observationError ? 'error-border' : ''}`}
                                id="observation"
                                placeholder="observation"
                                value={observation}
                                onChange={(e) => setObservation(e.target.value)}
                            />
                            {observationError && <p className='error-message'>{observationError}</p>}
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="caution" className="lab">caution</label>
                            <br />
                            <input
                                type="text"
                                className={`form-control ${cautionError ? 'error-border' : ''}`}
                                id="caution"
                                placeholder="caution"
                                value={caution}
                                onChange={(e) => setCaution(e.target.value)}
                            />
                            {cautionError && <p className='error-message'>{cautionError}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="estimation" className="lab">estimation</label>
                            <br />
                            <input
                                type="text"
                                className={`form-control ${estimationError ? 'error-border' : ''}`}
                                id="estimation"
                                placeholder="estimation"
                                value={estimation}
                                onChange={(e) => setEstimation(e.target.value)}
                            />
                            {estimationError && <p className='error-message'>{estimationError}</p>}
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group disp">
                            <label htmlFor="progNonProgram" className="lab">prog-nonprogram</label>
                            <br />
                            <input
                                className="chekcboxa"
                                type="checkbox"
                                id="progNonProgram"
                                checked={progNonProgram}
                                onChange={(e) => setProgNonProgram(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="agence" className="lab">Agence</label>
                            <br />
                            <select
                                id="agence"
                                className="form-control"
                                value={agence}
                                onChange={(e) => setAgence(e.target.value)}
                            >
                                <option> Fès </option>
                                <option> Boulemane  </option>
                                <option> Moulay Yaâcoub </option>
                                <option> Taounate </option>
                                <option> Taza </option>
                                <option> Séfrou </option>
                                <option> Meknès </option>
                                <option> El Hajeb </option>
                                <option> Ifrane </option>
                            </select>
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="modePassation" className="lab">modePassation</label>
                            <br />
                            <select
                                id="modePassation"
                                className="form-control"
                                value={modePassation}
                                onChange={(e) => setModePassation(e.target.value)}
                            >
                                <option>B.C</option>
                                <option>A.O.O.</option>
                                <option>A.O.R.</option>
                                <option>Marché négocié</option>
                                <option>consultation</option>
                                <option>concours</option>
                            </select>
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="secteur" className="lab">secteur</label>
                            <br />
                            <select
                                id="secteur"
                                className="form-control"
                                value={secteur}
                                onChange={(e) => handleSectorChange(e.target.value)}
                            >
                                {sectors.map((sector) => (
                                    <option key={sector.sector} value={sector.sector}>
                                        {sector.sector}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="qualification" className="lab">qualification</label>
                            <br />
                            <select
                                className="form-control"
                                id="qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                            >
                                {qualificationOptions.map((qual) => (
                                    <option key={qual} value={qual}>
                                        {qual}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <center><h5 className="titrep">Pieces</h5></center>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="libelle"
                            placeholder="libelle"
                            value={libelle}
                            onChange={(e) => setLibelle(e.target.value)}
                        />
                        {errorMessagelibelle && <p className='error-message'>{errorMessagelibelle}</p>}
                        <input
                            className="form-control"
                            type="file"
                            id="file"

                            onChange={(e) => handleFileUpload(e)}
                        />
                        {errorMessagelibelle && <p className='error-message'>{errorMessagelibelle}</p>}
                        <button
                            type="button"
                            className="botton2"
                            onClick={(e) => handleAddFile(e)}
                        >
                            Ajouter
                        </button>

                        {pieceError && <p className='error-message'>{pieceError}</p>}
                    </div>
                    <div className="form-group">
                        {fileList.length > 0 && (
                            <div>
                                <h4>Liste des pieces</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileList.map((file, index) => (
                                            <tr key={index}>
                                                <td>{file.name}</td>
                                                <td>
                                                    <span className="actions">
                                                        <BsFillTrashFill
                                                            className="delete-btn"
                                                            onClick={() => deleteFile(index)}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <center>
                            <h5 className="titre">Operations</h5>
                        </center>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="agence" className="lab">Agence</label>
                            <br />
                            <select
                                id="agenceOp"
                                className="form-control"
                                value={agenceOp}
                                onChange={(e) => setAgenceOp(e.target.value)}
                            >
                                <option> Fès </option>
                                <option> Boulemane  </option>
                                <option> Moulay Yaâcoub </option>
                                <option> Taounate </option>
                                <option> Taza </option>
                                <option> Séfrou </option>
                                <option> Meknès </option>
                                <option> El Hajeb </option>
                                <option> Ifrane </option>
                            </select>
                            {errorMessageAgence && <p className='error-message'>{errorMessageAgence}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="daFile" className="lab">
                                DA :
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                id="daFile"
                                onChange={(e) => handleDAFileUpload(e)}
                            />

                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="impulation" className="lab">imputation</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="imputation"
                                placeholder="impulation"
                                value={imputation}
                                onChange={(e) => setImputation(e.target.value)}
                            />
                            {errorMessageim && <p className='error-message'>{errorMessageim}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="natureProjet" className="lab">nature projet</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="natureProjet"
                                placeholder="nature projet"
                                value={natureProjet}
                                onChange={(e) => setNatureProjet(e.target.value)}
                            />
                            {errorMessagenp && <p className='error-message'>{errorMessagenp}</p>}
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="operation" className="lab">operation</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="operation"
                                placeholder="operation"
                                value={operation}
                                onChange={(e) => setOperation(e.target.value)}
                            />
                            {errorMessageop && <p className='error-message'>{errorMessageop}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="programme" className="lab">programme</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="programme"
                                placeholder="programme"
                                value={programme}
                                onChange={(e) => setProgramme(e.target.value)}
                            />
                            {errorMessageprog && <p className='error-message'>{errorMessageprog}</p>}
                        </div>
                    </div>
                    <div className="disp">
                        <div className="form-group1ad">
                            <label htmlFor="situation" className="lab">situation</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="situation"
                                placeholder="situation"
                                value={situation}
                                onChange={(e) => setSituation(e.target.value)}
                            />
                            {errorMessagesit && <p className='error-message'>{errorMessagesit}</p>}
                        </div>
                        <div className="form-group2ad">
                            <label htmlFor="superficie" className="lab">superficie</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="superficie"
                                placeholder="superficie"
                                value={superficie}
                                onChange={(e) => setSuperficie(e.target.value)}
                            />
                            {errorMessagesup && <p className='error-message'>{errorMessagesup}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="typeProjet" className="lab">type projet </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            id="typeProjet"
                            placeholder="type projet"
                            value={typeProjet}
                            onChange={(e) => setTypeProjet(e.target.value)}
                        />
                        {errorMessagetp && <p className='error-message'>{errorMessagetp}</p>}
                    </div>
                    <div className="form-group">
                        <button type="button" className="botton2" onClick={handleAddOperation}>
                            Ajouter
                        </button>
                        {operationError && <p className='error-message'>{operationError}</p>}
                    </div>
                    <div className="form-group">
                        {operationList.length > 0 && (
                            <div>
                                <h4>Liste des Opérations</h4>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Agence</th>
                                            <th>Fichier DA</th>
                                            <th>Imputation</th>
                                            <th>Nature projet</th>
                                            <th>operation</th>
                                            <th>programme</th>
                                            <th>situation</th>
                                            <th>superficie</th>
                                            <th>type projet</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {operationList.map((op, index) => (
                                            <tr key={index}>
                                                <td>{op.agence}</td>
                                                <td>{op.daFileName}</td>
                                                <td>{op.imputation}</td>
                                                <td>{op.natureProjet}</td>
                                                <td>{op.operation}</td>
                                                <td>{op.programme}</td>
                                                <td>{op.situation}</td>
                                                <td>{op.superficie}</td>
                                                <td>{op.typeProjet}</td>
                                                <td>
                                                    <span className="actions">
                                                        <BsFillTrashFill
                                                            className="delete-btn"
                                                            onClick={() => deleteOp(index)}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )};
                    </div>
                    <div className="form-group">
                        <center>
                            <button type="submit" className="botton">
                                Creer
                            </button>
                        </center>
                    </div>
                </form>
            </div>
        </center>
    );
};

export default CreateEB;
