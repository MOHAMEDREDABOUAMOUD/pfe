import React, { useEffect, useState } from "react";
import "./createEB.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/sideBar";

const CreateEB = () => {
    const [objet, setObjet] = useState("");
    const [observation, setObservation] = useState("");
    const [caution, setCaution] = useState("");
    const [estimation, setEstimation] = useState("");
    const [progNonProgram, setProgNonProgram] = useState(false);
    const [progNonProg, setProgNonProg] = useState("Non");
    const [agence, setAgence] = useState("Fes");
    const [agenceOp, setAgenceOp] = useState("Fes");
    const [modePassation, setModePassation] = useState("B.C");
    const [secteur, setSecteur] = useState("122");
    const [qualification, setQualification] = useState("000");
    const [libelle, setLibelle] = useState("");
    const [piece, setPiece] = useState([]);
    const [daFile, setDaFile] = useState([]);
    const [imputation, setImputation] = useState("");
    const [natureProjet, setNatureProjet] = useState("");
    const [operation, setOperation] = useState("");
    const [programme, setProgramme] = useState("");
    const [situation, setSituation] = useState("");
    const [superficie, setSuperficie] = useState("");
    const [typeProjet, setTypeProjet] = useState("");


    const [EB, setEB] = useState({}); // Dictionary to store all data
    const [fileList, setFileList] = useState([]); // List of files
    const [operationList, setOperationList] = useState([]); // List of operations

    const handleFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setPiece(base64FileData);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };

    const handleDAFileUpload = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileData = event.target.result; // This is the binary buffer
            const base64FileData = btoa(fileData);
            setDaFile(base64FileData);
        };
        fileReader.readAsArrayBuffer(selectedFile);
    };

    const handleAddFile = (event) => {
        event.preventDefault();
        // Handle file upload logic here
        const filee = {
            name: libelle,
            file: piece,
        };
        console.log("piece : " + piece);
        setFileList((prevFileList) => [...prevFileList, filee]);
        setLibelle("");
        setPiece([]);
        //console.log(fileList);
    };

    const handleAddOperation = (event) => {
        event.preventDefault();
        //event.preventDefault();
        // Handle adding operation logic here
        const op = {
            agence: agenceOp,
            daFile: daFile,
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
        setImputation("");
        setNatureProjet("");
        setOperation("");
        setProgramme("");
        setSituation("");
        setSuperficie("");
        setTypeProjet("");
        //console.log(operationList);
    }

    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Combine all data into the EB dictionary
        console.log(fileList);
        const progValue = progNonProgram ? "Non" : "Oui";
        setProgNonProg(progValue);
        console.log(progNonProg);
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
        await axios.post("/createEB", { objet: objet, observation: observation, caution: caution, estimation: estimation, progNonProg: progNonProg, agence: agence, modePassation: modePassation, secteur: secteur, qualification: qualification, fileList: fileList, operationList: operationList, });
        navigate("/listEB");
    };

    useEffect(() => {
        console.log("Updated EB:", EB);
    }, [EB]);

    return (
        <div className="formCreateUser">
            <Sidebar/>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <center>
                        <h3>Creation d'une expression des besoins</h3>
                    </center>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="objet">objet</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="objet"
                        placeholder="objet"
                        value={objet}
                        onChange={(e) => setObjet(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="observation">observation</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="observation"
                        placeholder="observation"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="caution">caution</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="caution"
                        placeholder="caution"
                        value={caution}
                        onChange={(e) => setCaution(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="estimation">estimation</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="estimation"
                        placeholder="estimation"
                        value={estimation}
                        onChange={(e) => setEstimation(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="progNonProgram">prog-nonprogram</label>
                    <br />
                    <input
                        type="checkbox"
                        id="progNonProgram"
                        checked={progNonProgram}
                        onChange={(e) => setProgNonProgram(e.target.checked)}
                    />
                </div>

                <div className="form-group flex-row">
                    <label htmlFor="agence">Agence</label>
                    <br />
                    <select
                        className="form-control"
                        id="agence"
                        value={agence}
                        onChange={(e) => setAgence(e.target.value)}
                    >
                        <option> Fès </option>
                        <option> Boulemane </option>
                        {/* Rest of the options */}
                    </select>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="modePassation">modePassation</label>
                    <br />
                    <select
                        className="form-control"
                        id="modePassation"
                        value={modePassation}
                        onChange={(e) => setModePassation(e.target.value)}
                    >
                        <option>B.C</option>
                        {/* Rest of the options */}
                    </select>
                </div>
                <div className="form-group flex-row margin">
                    <label htmlFor="secteur">secteur</label>
                    <br />
                    <select
                        className="form-control"
                        id="secteur"
                        value={secteur}
                        onChange={(e) => setSecteur(e.target.value)}
                    >
                        <option> 122 </option>
                        {/* Rest of the options */}
                    </select>
                    <label htmlFor="qualification">qualification</label>
                    <br />
                    <select
                        className="form-control"
                        id="qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    >
                        <option> 000 </option>
                        {/* Rest of the options */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="libelle" className="form-label">
                        files
                    </label>
                </div>
                <div className="form-group files margin">
                    <input
                        type="text"
                        className="form-control"
                        id="libelle"
                        placeholder="libelle"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="file"
                        id="file"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => handleAddFile(e)}
                    >
                        add
                    </button>
                </div>
                <div className="form-group">
                    <center>
                        <h5>Operations</h5>
                    </center>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="agence">Agence</label>
                    <br />
                    <select
                        className="form-control"
                        id="agenceOp"
                        value={agenceOp}
                        onChange={(e) => setAgenceOp(e.target.value)}
                    >
                        <option> Fès </option>
                        {/* Rest of the options */}
                    </select>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="daFile" className="form-label">
                        DA :
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="daFile"
                        onChange={(e) => handleDAFileUpload(e)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="impulation">imputation</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="imputation"
                        placeholder="impulation"
                        value={imputation}
                        onChange={(e) => setImputation(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="natureProjet">nature projet</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="natureProjet"
                        placeholder="nature projet"
                        value={natureProjet}
                        onChange={(e) => setNatureProjet(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="operation">operation</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="operation"
                        placeholder="operation"
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="programme">programme</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="programme"
                        placeholder="programme"
                        value={programme}
                        onChange={(e) => setProgramme(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="situation">situation</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="situation"
                        placeholder="situation"
                        value={situation}
                        onChange={(e) => setSituation(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="superficie">superficie</label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="superficie"
                        placeholder="superficie"
                        value={superficie}
                        onChange={(e) => setSuperficie(e.target.value)}
                    />
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="typeProjet">type projet </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        id="typeProjet"
                        placeholder="type projet"
                        value={typeProjet}
                        onChange={(e) => setTypeProjet(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary" onClick={handleAddOperation}>
                        add
                    </button>
                </div>
                <div className="form-group">
                    <center>
                        <button type="submit" className="btn btn-primary big-btn">
                            Creer
                        </button>
                    </center>
                </div>
            </form>
        </div>
    );
};

export default CreateEB;
