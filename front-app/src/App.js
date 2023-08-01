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
import UpdateEB from './components/demandeur/updateEB/updateEB';
import ListOperations from './components/demandeur/listEB/listOperations';
import UpdateOp from './components/demandeur/updateEB/updateOp';
import ListFiles from './components/demandeur/listEB/listFiles';
import SettingsD from './components/demandeur/settings/settings';
import DashboardD from './components/demandeur/dashboard/dashboard';
import MainDemandeur from './components/demandeur/main/main';
import View from './components/demandeur/listEB/view'

function App() {
  const [files, setfiles] = useState([
    {
      id: "1",
      name: "file1.txt",
      content: null,
    },
    {
      id: "2",
      name: "file2.txt",
      content: null,
    },
    {
      id: "3",
      name: "file3.txt",
      content: null,
    },
  ]);
  const handleEditfiles = (idfiles, idxfiles) => {
    const selectedRow = files[idxfiles];
    const { id, name, content } = selectedRow; // Define 'name' and 'content' here
    navigate('/updateEB', {
      state: {
        id,
        name,
        content,
      },
    });
  };
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
      operations: [{
        id: '1',
        agence: '1',
        imputation: '1',
        nature_projet: '1',
        operation: '1',
        programme: '1',
        situation: '1',
        superficie: '1',
        type_projet: '1',
      },
      {
        id: '2',
        agence: '2',
        imputation: '2',
        nature_projet: '2',
        operation: '2',
        programme: '2',
        situation: '2',
        superficie: '2',
        type_projet: '2',
      },],
      files:[
        {
          id: "1",
          name: "file1.txt",
          content: null,
        },
        {
          id: "2",
          name: "file2.txt",
          content: null,
        },
        {
          id: "3",
          name: "file3.txt",
          content: null,
        },
      ]
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
      operations: [{
        id: '3',
        agence: '3',
        imputation: '3',
        nature_projet: '3',
        operation: '3',
        programme: '3',
        situation: '3',
        superficie: '3',
        type_projet: '3',
      },],
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
      operations: [{
        id: '4',
        agence: '4',
        imputation: '4',
        nature_projet: '4',
        operation: '4',
        programme: '4',
        situation: '4',
        superficie: '4',
        type_projet: '4',
      },],
    },
  ]);

  // const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRowEB = (target, targetIndex) => {
    setRowsEB(rowsEB.filter((_, idx) => idx !== targetIndex));
  };
  const handleEditRowEB = (idEB, idxEB) => {
    const selectedRow = rowsEB[idxEB];
    const { id, objet, agence, observation, prog_nonProg, caution, estimation, modePassation, secteur, qualification } = selectedRow;
    navigate('/updateEB', {
      state: {
        id,
        idxEB,
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

  const handleDeleteRowOP = (idEB, idxEB, target, targetIndex) => {
    setRowsEB((prevRowsEB) => {
      const updatedRowsEB = prevRowsEB.map((row) => {
        if (row.id === idEB) {
          return {
            ...row,
            operations: row.operations.filter((_, idx) => idx !== targetIndex),
          };
        }
        return row;
      });
      return updatedRowsEB;
    });
  };
  const handleEditRowOP = (idEB, idxEB, target, targetIndex) => {
    //alert("hi "+idxEB);
    const selectedRow = rowsEB[idxEB].operations[targetIndex];
    const { id,
      agence,
      imputation,
      nature_projet,
      operation,
      programme,
      situation,
      superficie,
      type_projet, } = selectedRow;
    navigate('/updateOp', {
      state: {
        id,
        agence,
        imputation,
        nature_projet,
        operation,
        programme,
        situation,
        superficie,
        type_projet
      }
    });
  };
  const handleFiles = (idEB, idxEB) => {

    navigate(`/listFiles/${idEB}/${idxEB}`);
  };
  const handleOperations = (idEB, idxEB) => {
    //alert(idEB+" "+idxEB);
    //const { operations } = rowsEB[idxEB];
    navigate(`/listOperations/${idEB}/${idxEB}`);
  };
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/admin/main' element={<MainAdmin />}></Route>
        <Route path='/demandeur/main' element={<MainDemandeur />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path="/listUsers" element={<ListUsers rows={rows} columns={Object.keys(rows[0])} deleteRow={handleDeleteRow} editRow={handleEditRow} />} />
        <Route path="/listEB" element={<ListEB rows={rowsEB} columns={Object.keys(rowsEB[0])} handleOperations={handleOperations} handleFiles={handleFiles} deleteRow={handleDeleteRowEB} editRow={handleEditRowEB} />} />
        <Route path="/listOperations/:idEB/:idxEB" element={<ListOperations rows={rowsEB} columns={Object.keys(rowsEB[0].operations[0])} deleteRow={handleDeleteRowOP} editRow={handleEditRowOP} />} />
        <Route path='/updateUser' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/dashboardEB' element={<DashboardD />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/settingsEB' element={<SettingsD />}></Route>
        <Route path='/createEB' element={<CreateEB />}></Route>
        <Route path='/updateEB' element={<UpdateEB />}></Route>
        <Route path='/view' element={<View/>}></Route>
        <Route path='/listFiles/:idEB/:idxEB' element={<ListFiles rows={rowsEB} columns={Object.keys(rowsEB[0].files[0])} />}></Route>
        <Route path='/updateOp' element={<UpdateOp />}></Route> 
      </Routes>
    </div>
  );
}
export default App;