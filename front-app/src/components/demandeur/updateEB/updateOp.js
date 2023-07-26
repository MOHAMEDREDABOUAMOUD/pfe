import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';

export default function UpdateOp(props) {
    
    const location = useLocation();
    const {
        id,
        agence,
        imputation,
        nature_projet,
        operation,
        programme,
        situation,
        superficie,
        type_projet,
    } = location.state;
    return (
        <div className='formCreateUser'>
            <form>
                <div className='form-group'>
                    <center><h5>Operations</h5></center>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlSelect1">Agence</label><br />
                    <select className="form-control" id="exampleFormControlSelect1" value={agence}>
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
                <div className="form-group flex-row">
                    <label for="formFile" className="form-label">DA : </label>
                    <input className="form-control" type="file" id="formFile"/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">imputation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="imputation" value={imputation}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">nature projet</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="nature pojet" value={nature_projet}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">operation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="operation" value={operation}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">programme</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="programme" value={programme}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">situation</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="situation" value={situation}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">superficie</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="superficie" value={superficie}/>
                </div>
                <div className="form-group flex-row">
                    <label for="exampleFormControlInput1">type projet </label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="type projet" value={type_projet}/>
                </div>
                <div className="form-group">
                    <center><button type="submit" className="btn btn-primary big-btn">modify</button></center>
                </div>
            </form>
        </div>
    )
}
