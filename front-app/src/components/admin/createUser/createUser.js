import React, { useState } from 'react';
import './createUser.css';
import Sidebar from '../sidebar/sideBar';
import axios from 'axios';
import logo from "./logo-omrane.png";
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fonction, setFonction] = useState('Demandeur');
  const [sexe, setSexe] = useState('M.');

  const navigate= useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();

    await axios.post("/createUser", { email:email, nom:nom, prenom:prenom, userName:userName, password:password, fonction:fonction, sexe:sexe });
    navigate("/listUsers");
};

  return (
    <div className='all-div'>
    <div className='formCreateUser'>
      <div className="bara">
          <center><img src={logo} className="image"></img></center>
      </div>
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>E-mail</label><br />
          <input
            type='email'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Nom</label><br />
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Nom'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Prenom</label><br />
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Prenom'
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>UserName</label><br />
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='userName'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlInput1'>Password</label><br />
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlSelect1'>Fonction</label><br />
          <select
            className='form-control'
            id='exampleFormControlSelect1'
            value={fonction}
            onChange={(e) => setFonction(e.target.value)}
          >
            <option>Demandeur</option>
            <option>DM</option>
            <option>DTI</option>
            <option>CG</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleFormControlSelect1'>Sexe</label><br />
          <select
            className='form-control'
            id='exampleFormControlSelect1'
            value={sexe}
            onChange={(e) => setSexe(e.target.value)}
          >
            <option>M.</option>
            <option>Mme.</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Creer</button>
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
