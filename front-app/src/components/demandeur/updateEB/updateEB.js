import React, { useState } from 'react';
import "./updateEB.css";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateEB = (props) => {
    const navigate = useNavigate();
    const handleOperations = (idEB, idxEB) => {
        //alert(idEB+" "+idxEB);
        //const { operations } = rowsEB[idxEB];
        navigate(`/listOperations/${idEB}/${idxEB}`);
      };
    const location = useLocation();
    const {
        id,
        idxEB,
        objet, // Add other properties here with initial values
        agence,
        observation,
        prog_nonProg,
        caution,
        estimation,
        modePassation,
        secteur,
        qualification,
    } = location.state;

    return (
        <div className='formCreateUser'>
            {alert(id+ " " +idxEB)}
            <form>
                <div className='form-group'>
                    <center><h3>Creation d'une expression des besoins</h3></center>
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">objet</label><br />
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="objet" value={objet} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">observation</label><br />
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="obesrvation" value={observation} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">caution</label><br />
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="caution" value={caution} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">estimation</label><br />
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="estimation" value={estimation} />
                </div>
                <div class="form-group flex-row">
                    <label for="exampleFormControlInput1">prog-nonprogram</label><br />
                    <input type="checkbox" id="exampleFormControlInput1" value={prog_nonProg} />
                </div>

                <div class="form-group flex-row">
                    <label for="exampleFormControlSelect1">Agence</label><br />
                    <select class="form-control" id="exampleFormControlSelect1" value={agence}>
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
                    <label for="exampleFormControlSelect1">modePassation</label><br />
                    <select class="form-control" id="exampleFormControlSelect1" value={modePassation}>
                        <option>B.C</option>
                        <option>A.O.O.</option>
                        <option>A.O.R.</option>
                        <option>Marché négocié</option>
                        <option>consultation</option>
                        <option>concours</option>
                    </select>
                </div>
                <div class="form-group flex-row margin">
                    <label for="exampleFormControlSelect1">secteur</label><br />
                    <select class="form-control" id="exampleFormControlSelect1" value={secteur}>
                        <option> 122 </option>
                        <option> 222 </option>
                        <option> 555</option>

                    </select>
                    <label for="exampleFormControlSelect1">qualification</label><br />
                    <select class="form-control" id="exampleFormControlSelect1" value={qualification}>
                        <option> 000 </option>
                        <option> 100 </option>
                        <option> 999 </option>

                    </select>
                </div>
                <div className="form-group">
                    <label for="formFile" class="form-label">files</label>
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary">Update files</button>
                </div>
                <div className='form-group'>
                    <center><h5>Operations</h5></center>
                </div>
                <div className="form-group">
                    <button type="submit" class="btn btn-primary" onClick={()=>{handleOperations(id, idxEB)}}>Update operations</button>
                </div>
                <div className="form-group">
                    <center><button type="submit" class="btn btn-primary big-btn">Update</button></center>
                </div>
            </form>
        </div>
    );
};

export default UpdateEB;
