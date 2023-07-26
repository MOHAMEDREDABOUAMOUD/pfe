import React, { Component } from 'react'
import "./createEB.css";

export default class CreateEB extends Component {
    files = [];

    handleFileUpload = (event) => {
        event.preventDefault();
        this.files.push(document.getElementById("file"));
      }
    render() {

        return (
            <div className='formCreateUser'>
                <form>
                    <div className='form-group'>
                        <center><h3>Creation d'une expression des besoins</h3></center>
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">objet</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="objet" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">observation</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="obesrvation" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">caution</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="caution" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">estimation</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="estimation" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">prog-nonprogram</label><br />
                        <input type="checkbox" id="exampleFormControlInput1" />
                    </div>

                    <div class="form-group flex-row">
                        <label for="exampleFormControlSelect1">Agence</label><br />
                        <select class="form-control" id="exampleFormControlSelect1">
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
                        <select class="form-control" id="exampleFormControlSelect1">
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
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option> 122 </option>
                            <option> 222 </option>
                            <option> 555</option>

                        </select>
                        <label for="exampleFormControlSelect1">qualification</label><br />
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option> 000 </option>
                            <option> 100 </option>
                            <option> 999 </option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label for="formFile" class="form-label">files</label>
                    </div>
                    <div class="form-group files margin">
                        <input type="libelle" class="form-control" id="exampleFormControlInput1" placeholder="libelle" />
                        <input class="form-control" type="file" id="file" />
                        <button type="submit" class="btn btn-primary" onClick={()=>{this.handleAddFile()}}>add</button>
                    </div>
                    <div className='form-group'>
                        <center><h5>Operations</h5></center>
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlSelect1">Agence</label><br />
                        <select class="form-control" id="exampleFormControlSelect1">
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
                        <label for="exampleFormControlInput1">impulation</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="impulation" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">nature projet</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="nature pojet" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">operation</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="operation" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">programme</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="programme" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">situation</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="situation" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">superficie</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="superficie" />
                    </div>
                    <div class="form-group flex-row">
                        <label for="exampleFormControlInput1">type projet </label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="type projet" />
                    </div>
                    <div className="form-group">
                        <button type="submit" class="btn btn-primary">add</button>
                    </div>
                    <div className="form-group">
                        <center><button type="submit" class="btn btn-primary big-btn">Creer</button></center>
                    </div>
                </form>
            </div>

        )

    }
}