import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from "react";
import MainAdmin from './components/admin/main/main';
import CreateUser from './components/admin/createUser/createUser';
import ListUsers from './components/admin/listUsers/listUsers';
import UpdateUser from './components/admin/updateUser/updateUser';
import Settings from './components/admin/settings/settings';
import Dashboard from './components/admin/dashboard/dashboard';
import LoginForm from "./components/SignIn/SignIn";
import ListEB from './components/demandeur/listEB/listEB';
import CreateEB from './components/demandeur/createEB/createEB';

function App() {
  const [rows, setRows] = useState([
    {
      id: "1",
      email: "reda@gmail.com",
      nom: "bouamoud",
      prenom: "reda",
      userName: "reda",
      password: "111111",
      fonction: "Demandeur",
      sexe: "M.",
    },
    {
      id: "2",
      email: "walid@gmail.com",
      nom: "bouamoud",
      prenom: "walid",
      userName: "walid",
      password: "111111",
      fonction: "DM",
      sexe: "M.",
    },
    {
      id: "3",
      email: "salah@gmail.com",
      nom: "bouamoud",
      prenom: "salah",
      userName: "salah",
      password: "111111",
      fonction: "Demandeur",
      sexe: "M.",
    },
  ]);
  // const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };
  const navigate = useNavigate();
  const handleEditRow = (idx) => {
    const selectedRow = rows[idx];
    const { id, email, nom, prenom, userName, password, fonction, sexe } = selectedRow;
    navigate('/updateUser', {
      state: {
        id,
        email,
        nom,
        prenom,
        userName,
        password,
        fonction,
        sexe,
      }
    });
  };
  const [rowsEB, setRowsEB] = useState([
    {
      id: "1",
      objet: "1",
      agence: "reda@gmail.com",
      observation: "bouamoud",
      prog_nonProg: "reda",
      caution: "reda",
      estimation: "111111",
      modePassation: "Demandeur",
      secteur: "M.",
      qualification: "M.",
    },
    {
      id: "2",
      objet: "1",
      agence: "reda@gmail.com",
      observation: "bouamoud",
      prog_nonProg: "reda",
      caution: "reda",
      estimation: "111111",
      modePassation: "Demandeur",
      secteur: "M.",
      qualification: "M.",
    },
    {
      id: "3",
      objet: "1",
      agence: "reda@gmail.com",
      observation: "bouamoud",
      prog_nonProg: "reda",
      caution: "reda",
      estimation: "111111",
      modePassation: "Demandeur",
      secteur: "M.",
      qualification: "M.",
    },
  ]);
  // const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRowEB = (targetIndex) => {
    setRows(rowsEB.filter((_, idx) => idx !== targetIndex));
  };
  const handleEditRowEB = (idx) => {
    const selectedRow = rowsEB[idx];
    const { id, objet, agence, observation, prog_nonProg, caution, estimation, modePassation, secteur, qualification } = selectedRow;
    navigate('/updateUser', {
      state: {
        id, 
        objet, 
        agence, 
        observation, 
        prog_nonProg, 
        caution, 
        estimation, 
        modePassation, 
        secteur, 
        qualification,
      }
    });
  };
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/main' element={<MainAdmin />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path="/listUsers" element={<ListUsers rows={rows} columns={Object.keys(rows[0])} deleteRow={handleDeleteRow} editRow={handleEditRow} />} />
        <Route path="/listEB" element={<ListEB rows={rowsEB} columns={Object.keys(rowsEB[0])} deleteRow={handleDeleteRowEB} editRow={handleEditRowEB} />} />
        <Route path='/updateUser' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/createEB' element={<CreateEB />}></Route>
      </Routes>
    </div>
  );
}

export default App;
