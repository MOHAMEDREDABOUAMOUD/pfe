import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from "react";
import MainAdmin from './components/admin/main';
import CreateUser from './components/admin/createUser';
import ListUsers from './components/admin/listUsers';
import UpdateUser from './components/admin/updateUser';
import LoginForm from "./components/SignIn/LoginForm";

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
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/main' element={<MainAdmin/>}></Route>
        <Route path='/createUser' element={<CreateUser/>}></Route>
        <Route path="/listUsers" element={<ListUsers rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />}/>
        <Route path='/updateUser' element={<UpdateUser/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
