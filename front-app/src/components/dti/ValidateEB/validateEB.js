import React, { useEffect, useState } from 'react';
import "./updateEB.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

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
    const [agence, setAgence] = useState('');
    const [observation, setObservation] = useState('');
    const [progNonProgram, setProgNonProgram] = useState(false);
    const [prog_nonprog, setProg_nonprog] = useState("Non");
    const [caution, setCaution] = useState('');
    const [estimation, setEstimation] = useState('');
    const [modePassation, setModePassation] = useState('');
    const [secteur, setSecteur] = useState('');
    const [qualification, setQualification] = useState('');
    const [validerPar, setValiderPar] = useState('');
    const [numUtilisateur, setNumUtilisateur] = useState('');

    const [qualificationOptions, setQualificationOptions] = useState([]); // Available qualifications for the selected sector

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
    const handleSubmitV = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (
            objet === "" ||
            observation === "" ||
            caution === "" ||
            estimation === ""
        ) {
            alert("Please fill in all required fields before submitting.");
            return; // Stop the form submission
        }
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
            navigate("/listEBDti");
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmitR = async (event) => {
        
        let email="";
        if(validerPar.toString()!=""){
            try {
                const userData = await axios.post("/getUser", { id: validerPar });
                email=userData.data["email"];
            } catch (error) {
                console.error(error);
            }
        }
        else{
            try {
                const userData = await axios.post("/getUser", { id: numUtilisateur });
                email=userData.data["email"];
            } catch (error) {
                console.error(error);
            }
        }
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
        <div className='formCreateUser'>
                                <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace DTI</h1>
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
            <form>
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
                    <select
                        className="form-control"
                        id="secteur"
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
                    <label htmlFor="qualification">qualification</label><br />
                    <select
                        className="form-control"
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
                    <center><button type="submit" onClick={handleSubmitV} className="btn btn-primary big-btn">Valider l'expression des besoins</button></center>
                </div>
                <div className="form-group">
                    <center><button type="submit" onClick={handleSubmitR} className="btn btn-primary big-btn">Refuser l'expression des besoins</button></center>
                </div>
            </form>
        </div>
    );
};

export default ValidateEBDti;
