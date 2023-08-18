import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from "react";

import LoginForm from "./components/SignIn/SignIn";
import ForgotPassword from './components/forgot_password/forgot';

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
import UpdateEBDti from './components/dti/updateEB/updateEB';
import ValidateEBDti from './components/dti/ValidateEB/validateEB';
import ListOperationsDti from './components/dti/listEB/listOperations';
import UpdateOpDti from './components/dti/updateEB/updateOp';
import ListFilesDti from './components/dti/listEB/listFiles';
import SettingsDti from './components/dti/settings/settings';
import DashboardDti from './components/dti/dashboard/dashboard';
import AddOperationDti from './components/dti/createEB/addOperation';
import ViewDti from './components/dti/listEB/view';

import MainCM from './components/CM/main/main';
import ListEBCM from './components/CM/listEB/listEB';
import UpdateEBCM from './components/CM/updateEB/updateEB';
import ValidateEBCM from './components/CM/ValidateEB/validateEB';
import ListOperationsCM from './components/CM/listEB/listOperations';
import UpdateOpCM from './components/CM/updateEB/updateOp';
import ListFilesCM from './components/CM/listEB/listFiles';
import SettingsCM from './components/CM/settings/settings';
import DashboardCM from './components/CM/dashboard/dashboard';
import AddOperationCM from './components/CM/addOperation/addOperation';
import ViewCM from './components/CM/listEB/view';

import MainDM from './components/DM/main/main';
import ListEBDM from './components/DM/listEB/listEB';
// import UpdateEBDM from './components/DM/updateEB/updateEB';
import ValidateEBDM from './components/DM/ValidateEB/validateEB';
import CreateAO from './components/DM/ValidateEB/createAO';
import ListOperationsDM from './components/DM/listEB/listOperations';
import UpdateOpDM from './components/DM/updateOp/updateOp';
import ListFilesDM from './components/DM/listEB/listFiles';
import SettingsDM from './components/DM/settings/settings';
import DashboardDM from './components/DM/dashboard/dashboard';
import AddOperationDM from './components/DM/addOperation/addOperation';
import ViewDM from './components/DM/listEB/view';

import DashboardAll from './components/admin/dashboard/dashboard_all';
import DashboardAllDM from './components/demandeur/dashboard/dashboard_all';
import DashboardAllDTI from './components/dti/dashboard/dashboard_all';
import DashboardAllCM from './components/CM/dashboard/dashboard_all';
import DashboardAllDMM from './components/DM/dashboard/dashboard_all';

import ListAO from './components/demandeur/listAO/listAO';
import ListAODti from './components/dti/listAO/listAO';
import ListAOCM from './components/CM/listAO/listAO';
import ListAODM from './components/DM/listAO/listAO';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/forgotpass' element={<ForgotPassword />}></Route>

        <Route path='/admin/main' element={<MainAdmin />}></Route>
        <Route path='/createUser' element={<CreateUser />}></Route>
        <Route path="/listUsers" element={<ListUsers/>} />
        <Route path='/updateUser/:id' element={<UpdateUser />}></Route>
        <Route path='/dashboard' element={<DashboardAll />}></Route>
        <Route path='/settings' element={<Settings />}></Route>

        <Route path='/demandeur/main' element={<Maindem />}></Route>
        <Route path='/createEB' element={<CreateEB />}></Route>
        <Route path="/listEB" element={<ListEB/>} />
        <Route path='/updateEB/:id' element={<UpdateEB />}></Route>
        <Route path="/listOperations" element={<ListOperations/>} />
        <Route path='/updateOperation/:id' element={<UpdateOp />}></Route> 
        <Route path='/addOperation/:id' element={<AddOperation/>}></Route>
        <Route path='/dashboardEB' element={<DashboardAllDM />}></Route>
        <Route path='/settingsEB' element={<SettingsD />}></Route>
        <Route path='/view/:id' element={<View/>}></Route>
        <Route path='/listFiles/:id' element={<ListFiles/>}></Route>
        <Route path='/listAO' element={<ListAO/>}></Route>
        
        <Route path='/dti/main' element={<Maindti />}></Route>
        <Route path='/createEBDti' element={<CreateEBDti />}></Route>
        <Route path="/listEBDti" element={<ListEBDti/>} />
        <Route path='/updateEBDti/:id' element={<UpdateEBDti />}></Route>
        <Route path='/validateEBDti/:id' element={<ValidateEBDti />}></Route>
        <Route path="/listOperationsDti/:id" element={<ListOperationsDti/>} />
        <Route path='/updateOperationDti/:id' element={<UpdateOpDti />}></Route> 
        <Route path='/addOperationDti/:id' element={<AddOperationDti/>}></Route>
        <Route path='/dashboardEBDti' element={<DashboardAllDTI />}></Route>
        <Route path='/settingsEBDti' element={<SettingsDti />}></Route>
        <Route path='/viewDti/:id' element={<ViewDti/>}></Route>
        <Route path='/listFilesDti/:id' element={<ListFilesDti/>}></Route>
        <Route path='/listAODti' element={<ListAODti/>}></Route>

        <Route path='/CM/main' element={<MainCM />}></Route>
        <Route path="/listEBCM" element={<ListEBCM/>} />
        <Route path='/updateEBCM/:id' element={<UpdateEBCM />}></Route>
        <Route path='/validateEBCM/:id' element={<ValidateEBCM />}></Route>
        <Route path="/listOperationsCM/:id" element={<ListOperationsCM/>} />
        <Route path='/updateOperationCM/:id' element={<UpdateOpCM />}></Route> 
        <Route path='/addOperationCM/:id' element={<AddOperationCM/>}></Route>
        <Route path='/dashboardEBCM' element={<DashboardAllCM />}></Route>
        <Route path='/settingsEBCM' element={<SettingsCM />}></Route>
        <Route path='/viewCM/:id' element={<ViewCM/>}></Route>
        <Route path='/listFilesCM/:id' element={<ListFilesCM/>}></Route>
        <Route path='/listAOCM' element={<ListAOCM/>}></Route>
        
        <Route path='/DM/main' element={<MainDM />}></Route>
        <Route path="/listEBDM" element={<ListEBDM/>} />
        {/* <Route path='/updateEBDM/:id' element={<UpdateEBDM />}></Route> */}
        <Route path='/validateEBDM/:id' element={<ValidateEBDM />}></Route>
        <Route path='/createAODM/:id' element={<CreateAO />}></Route>
        <Route path="/listOperationsDM/:id" element={<ListOperationsDM/>} />
        <Route path='/updateOperationDM/:id' element={<UpdateOpDM />}></Route> 
        <Route path='/addOperationDM/:id' element={<AddOperationDM/>}></Route>
        <Route path='/dashboardEBDM' element={<DashboardAllDMM />}></Route>
        <Route path='/settingsEBDM' element={<SettingsDM />}></Route>
        <Route path='/viewDM/:id' element={<ViewDM/>}></Route>
        <Route path='/listFilesDM/:id' element={<ListFilesDM/>}></Route>
        <Route path='/listAODM' element={<ListAODM/>}></Route>

      </Routes>
    </div>
  );
}
export default App;