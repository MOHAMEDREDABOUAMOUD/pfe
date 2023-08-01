import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddOperation = (props) => {
    const [agence, setAgence] = useState('Fes');
    const [imputation, setImputation] = useState('');
    const [nature_projet, setNatureProjet] = useState('');
    const [operation, setOperation] = useState('');
    const [programme, setProgramme] = useState('');
    const [situation, setSituation] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [type_projet, setTypeProjet] = useState('');

    const { idEB, idxEB } = useParams();

    const handleInputChangeAg = (event) => {
        setAgence(event.target.value);
    };

    const handleInputChangeImp = (event) => {
        setImputation(event.target.value);
    };

    const handleInputChangeNP = (event) => {
        setNatureProjet(event.target.value);
    };

    const handleInputChangeOP = (event) => {
        setOperation(event.target.value);
    };

    const handleInputChangePR = (event) => {
        setProgramme(event.target.value);
    };

    const handleInputChangeSI = (event) => {
        setSituation(event.target.value);
    };

    const handleInputChangeSU = (event) => {
        setSuperficie(event.target.value);
    };

    const handleInputChangeTP = (event) => {
        setTypeProjet(event.target.value);
    };

    const handleAddOperation = () => {
        const { handleAdd } = props;
        handleAdd(idEB, idxEB, agence, imputation, nature_projet, operation, programme, situation, superficie, type_projet);
    };

    return (
        <div className='formCreateUser'>
            <form>
                <div className='form-group'>
                    <center><h5>Add operation</h5></center>
                </div>
                <div className="form-group flex-row">
                    <label htmlFor="exampleFormControlSelect1">Agence</label><br />
                    <select className="form-control" id="agence" onChange={handleInputChangeAg} value={agence}>
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
                <div class="form-group flex-row">
                    <label for="formFile" class="form-label">DA : </label>
                    <input class="form-control" type="file" id="formFile" />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">imputation</label><br />
                    <input type="text" class="form-control" id="imputation" placeholder="imputation" onChange={handleInputChangeImp} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">nature projet</label><br />
                    <input type="text" class="form-control" id="nature_projet" placeholder="nature pojet" onChange={handleInputChangeNP} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">operation</label><br />
                    <input type="text" class="form-control" id="operation" placeholder="operation" onChange={handleInputChangeOP} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">programme</label><br />
                    <input type="text" class="form-control" id="programme" placeholder="programme" onChange={handleInputChangePR} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">situation</label><br />
                    <input type="text" class="form-control" id="situation" placeholder="situation" onChange={handleInputChangeSI} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">superficie</label><br />
                    <input type="text" class="form-control" id="superficie" placeholder="superficie" onChange={handleInputChangeSU} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">type projet </label><br />
                    <input type="text" class="form-control" id="type_projet" placeholder="type projet" onChange={handleInputChangeTP} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={handleAddOperation}>add</button>
                </div>
            </form>
        </div>
    );
}

export default AddOperation;
