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
import AddOperation from './components/demandeur/createEB/addOperation';
// import MainDemandeur from './components/demandeur/main/main';
import View from './components/demandeur/listEB/view';
import Sidebar from './components/admin/sidebar/sideBar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path="/listUsers" element={<ListUsers/>} />
        <Route path='/updateUser/:id' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        
        <Route path='/createEB' element={<CreateEB />}></Route>
        <Route path="/listEB" element={<ListEB/>} />
        <Route path='/updateEB/:id' element={<UpdateEB />}></Route>
        <Route path="/listOperations/:id" element={<ListOperations/>} />
        <Route path='/updateOperation/:id' element={<UpdateOp />}></Route> 
        <Route path='/addOperation/:id' element={<AddOperation/>}></Route>
        <Route path='/dashboardEB' element={<DashboardD />}></Route>
        <Route path='/settingsEB' element={<SettingsD />}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/listFiles/:id' element={<ListFiles/>}></Route>
      </Routes>
    </div>
  );
}
export default App;