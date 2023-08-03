import React, { Component } from 'react';
import "query-string"
import { useLocation } from 'react-router-dom';
import Sidebar from '../../sidebar/sideBar';

export default function UpdateUser() {
    const location = useLocation();
    const { id, email, nom, prenom, userName, password, fonction, sexe } = location.state;

    return (
        <div className='formCreateUser'>
        <Sidebar/>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">E-mail</label><br />
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Nom</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nom" value={nom} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Prenom</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Prenom" value={prenom} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">UserName</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="userName" value={userName} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Password</label><br />
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="password" value={password} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Fonction</label><br />
                    <select className="form-control" id="exampleFormControlSelect1" value={fonction}>
                        <option>Demandeur</option>
                        <option>DM</option>
                        <option>DTI</option>
                        <option>CG</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Sexe</label><br />
                    <select className="form-control" id="exampleFormControlSelect1" value={sexe}>
                        <option>M.</option>
                        <option>Mme.</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
