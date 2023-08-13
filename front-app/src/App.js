import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from "react";

import LoginForm from "./components/SignIn/SignIn";

import MainAdmin from './components/admin/main/main';
import CreateUser from './components/admin/createUser/createUser';
import ListUsers from './components/admin/listUsers/listUsers';
import UpdateUser from './components/admin/updateUser/updateUser';
import Settings from './components/admin/settings/settings';
import Dashboard from './components/admin/dashboard/dashboard';

import Maindem from './components/demandeur/main/main';
import ListEB from './components/demandeur/listEB/listEB';
import CreateEB from './components/demandeur/createEB/createEB';
import UpdateEB from './components/demandeur/updateEB/updateEB';
import ListOperations from './components/demandeur/listEB/listOperations';
import UpdateOp from './components/demandeur/updateEB/updateOp';
import ListFiles from './components/demandeur/listEB/listFiles';
import SettingsD from './components/demandeur/settings/settings';
import DashboardD from './components/demandeur/dashboard/dashboard';
import AddOperation from './components/demandeur/createEB/addOperation';
import View from './components/demandeur/listEB/view';

import Maindti from './components/dti/main/main';
import CreateEBDti from './components/dti/createEB/createEB';
import ListEBDti from './components/dti/listEB/listEB';
import UpdateEBDti from './components/demandeur/updateEB/updateEB';
import ListOperationsDti from './components/dti/listEB/listOperations';
import UpdateOpDti from './components/dti/updateEB/updateOp';
import ListFilesDti from './components/dti/listEB/listFiles';
import SettingsDti from './components/dti/settings/settings';
import DashboardDti from './components/dti/dashboard/dashboard';
import AddOperationDti from './components/dti/createEB/addOperation';
import ViewDti from './components/dti/listEB/view';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>

        <Route path='/admin/main' element={<MainAdmin />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path="/listUsers" element={<ListUsers/>} />
        <Route path='/updateUser/:id' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/settings' element={<Settings />}></Route>

        <Route path='/demandeur/main' element={<Maindem />}></Route>
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
        
        <Route path='/dti/main' element={<Maindti />}></Route>
        <Route path='/createEBDti' element={<CreateEBDti />}></Route>
        <Route path="/listEBDti" element={<ListEBDti/>} />
        <Route path='/updateEBDti/:id' element={<UpdateEBDti />}></Route>
        <Route path="/listOperationsDti/:id" element={<ListOperationsDti/>} />
        <Route path='/updateOperationDti/:id' element={<UpdateOpDti />}></Route> 
        <Route path='/addOperationDti/:id' element={<AddOperationDti/>}></Route>
        <Route path='/dashboardEBDti' element={<DashboardDti />}></Route>
        <Route path='/settingsEBDti' element={<SettingsDti />}></Route>
        <Route path='/viewDti/:id' element={<ViewDti/>}></Route>
        <Route path='/listFilesDti/:id' element={<ListFilesDti/>}></Route>
      </Routes>
    </div>
  );
}
export default App;