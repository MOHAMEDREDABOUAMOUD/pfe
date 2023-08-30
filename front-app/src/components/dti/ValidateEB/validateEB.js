import React, { useEffect, useState } from 'react';
import "./updateEB.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/sideBar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import { SlLogout } from 'react-icons/sl';
import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const ValidateEBDti = () => {
    const { id } = useParams();

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

    const [objet, setObjet] = useState('');
    const [objetError, setObjetError] = useState("");
    const [agence, setAgence] = useState('');
    const [observation, setObservation] = useState('');
    const [observationError, setObservationError] = useState("");
    const [progNonProgram, setProgNonProgram] = useState(false);
    const [prog_nonprog, setProg_nonprog] = useState("Non");
    const [caution, setCaution] = useState('');
    const [cautionError, setCautionError] = useState("");
    const [estimation, setEstimation] = useState('');
    const [estimationError, setEstimationError] = useState("");
    const [modePassation, setModePassation] = useState('');
    const [secteur, setSecteur] = useState('');
    const [qualification, setQualification] = useState('');
    const [numUtilisateur, setNumUtilisateur] = useState('');
    const [validerPar, setValiderPar] = useState('');

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
            setQualification(""); // Clear the selected qualification when changing sectors
        }
    };

    const navigate = useNavigate();
    const handleOperations = (id) => {
        navigate(`/listOperationsDti/${id}`);
    };
    const handleFiles = (id) => {
        navigate(`/listFiles/${id}`);
    };
    const handleSubmitV = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        let hasErrors = false;
        if (objet.trim() === '') {
            setObjetError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (observation.trim() === '') {
            setObservationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (caution.trim() === '') {
            setCautionError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (estimation.trim() === '') {
            setEstimationError('Ce champ est obligatoire');
            hasErrors = true;
        }
        if (!hasErrors) {
            const progValue = progNonProgram ? "Oui" : "Non";
            setProg_nonprog(progValue);

            try {
                await axios.post("/validateEBDti", {
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
                    numUtilisateur: numUtilisateur
                });
                alert("l'expression des besoins a ete bien valider");
                navigate(`/listEBDti/${id}`);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleSubmitR = async (event) => {
        let email = "";
        if (validerPar.toString() != "") {
            try {
                const userData = await axios.post("/getUser", { id: validerPar });
                email = userData.data["email"];
            } catch (error) {
                console.error(error);
            }
        }
        else {
            try {
                const userData = await axios.post("/getUser", { id: numUtilisateur });
                email = userData.data["email"];
            } catch (error) {
                console.error(error);
            }
        }
        alert("l'EB n'a pas ete valider");
        //send mail to email
        navigate("/listEBDti");
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
                setValiderPar(userData.data["validerPar"]);
                setNumUtilisateur(userData.data["numUtilisateur"]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <center>
        <div className='formCreateUser-dmm-upeb'>
            <div className='appbare'>
    <Sidebar />
    <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'
              
              title={currentUser}
            >
              <NavDropdown.Item href="/notifications" className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      <center><h1 className='espace_admin'>Espace DTI</h1></center>
    </div>
    <center><h1 className='titre'>Validation Expression Besoins</h1></center>
            <form className='forma'>
                <div className='disp'>
                <div className="form-group1">
                    <label htmlFor="objet" className='lab'>objet</label><br />
                    <input type="text" className={`form-control ${objetError ? 'error-border' : ''}`} id="objet" placeholder="objet" value={objet} onChange={(e) => setObjet(e.target.value)} />
                    {objetError && <p className='error-message'>{objetError}</p>}
                </div>
                <div className="form-group1">
                    <label htmlFor="observation" className='lab'>observation</label><br />
                    <input type="text" className={`form-control ${observationError ? 'error-border' : ''}`} id="observation" placeholder="obesrvation" value={observation} onChange={(e) => setObservation(e.target.value)} />
                    {observationError && <p className='error-message'>{observationError}</p>}
                </div>
                </div>
                <div className="form-group">
                    <label htmlFor="caution" className='lab'>caution</label><br />
                    <input type="text" className={`form-control ${cautionError ? 'error-border' : ''}`} id="caution" placeholder="caution" value={caution} onChange={(e) => setCaution(e.target.value)} />
                    {cautionError && <p className='error-message'>{cautionError}</p>}
                </div>
                <div className='disp'>
                <div className="form-group1">
                    <label htmlFor="estimation" className='lab'>estimation</label><br />
                    <input type="text" className={`form-control ${estimationError ? 'error-border' : ''}`} id="estimation" placeholder="estimation" value={estimation} onChange={(e) => setEstimation(e.target.value)} />
                    {estimationError && <p className='error-message'>{estimationError}</p>}
                </div>
                <div className="form-group1box">
                    <label htmlFor="progNonProgInput" className='lab'>prog-nonprog</label><br />
                    <input type="checkbox" id="progNonProg" checked={progNonProgram} onChange={(e) => setProgNonProgram(e.target.checked)} />
                </div>
                </div>

                <div className="form-group">
                    <label htmlFor="agence" className='lab'>Agence</label><br />
                    <select id="agence" className='form-control' value={agence} onChange={(e) => setAgence(e.target.value)}>
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
                <div className="form-group">
                    <label htmlFor="modePassation" className='lab'>modePassation</label><br />
                    <select id="modePassation" className='form-control' value={modePassation} onChange={(e) => setModePassation(e.target.value)}>
                        <option>B.C</option>
                        <option>A.O.O.</option>
                        <option>A.O.R.</option>
                        <option>Marché négocié</option>
                        <option>consultation</option>
                        <option>concours</option>
                    </select>
                </div>
                <div className='disp'>
                <div className="form-group1">
                    <label htmlFor="secteur" className='lab'>secteur</label><br />
                    <select
                        id="secteur"
                        className='form-control'
                        value={secteur}
                        onChange={(e) => handleSectorChange(e.target.value)}
                    >
                        <option value="">Select a sector</option>
                        {sectors.map((sector) => (
                            <option key={sector.sector} value={sector.sector}>
                                {sector.sector}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="qualification" className='lab'>qualification</label><br />
                    <select
                    className='form-control'
                        id="qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    >
                        <option value="">Select a qualification</option>
                        {qualificationOptions.map((qual) => (
                            <option key={qual} value={qual}>
                                {qual}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div className='form-group'>
                    <center><h5 className='titra'>files</h5></center>
                </div>
                <div className="form-group">
                    <button type="submit" className="botton" onClick={() => { handleFiles(id) }}>Update files</button>
                </div>
                <div className='form-group'>
                    <center><h5 className='titra'>Operations</h5></center>
                </div>
                <div className="form-group">
                    <button type="submit" className="botton" onClick={() => { handleOperations(id) }}>Update operations</button>
                </div>
                <div className="form-group">
                    <center><button type="submit" onClick={handleSubmitV} className="botton">Valider l'expression des besoins</button></center>
                </div>
                <div className="form-group">
                    <center><button type="submit" onClick={handleSubmitR} className="botton">Refuser l'expression des besoins</button></center>
                </div>
            </form>
        </div>
        </center>
    );
};

export default ValidateEBDti;
