import React, { Component } from 'react'
import "./createUser.css";

export default class CreateUser extends Component {
    render() {
        return (
            <div className='formCreateUser'>
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">E-mail</label><br />
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Nom</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nom" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Prenom</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Prenom" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">UserName</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="userName" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Password</label><br />
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="password" />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Fonction</label><br />
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Demandeur</option>
                            <option>DM</option>
                            <option>DTI</option>
                            <option>CG</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Sexe</label><br />
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>M.</option>
                            <option>Mme.</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Creer</button>
                </form>
            </div>
        )
    }
}
