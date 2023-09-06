import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import './dashboard_all.css'
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sideBar";
import { SlLogout } from 'react-icons/sl';
import { FaCheck, FaTimes, FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import { IoIosFolder, IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

function DashboardAllCM() {
  Chart.register(CategoryScale);

  const [currentSexe, setCurrentSexe] = useState('');
  const [currentNom, setCurrentNom] = useState('');
  const [currentPrenom, setCurrentPrenom] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getCurrentUserData", { id: 0 });
        console.log(userData.data);
        setCurrentNom(userData.data["nom"]);
        setCurrentSexe(userData.data["sexe"]);
        setCurrentPrenom(userData.data["prenom"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    setCurrentUser(currentSexe + " " + currentNom + " " + currentPrenom);
  }, [currentSexe, currentNom, currentPrenom]);

  const [eb, setEb] = useState('');
  const [ebV, setEbV] = useState('');
  const [ebNV, setEbNV] = useState('');
  const [ao, setAo] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getDashboardFigures", { id: 0 });
        setEb(userData.data["eb"]);
        setEbV(userData.data["ebV"]);
        setEbNV(userData.data["ebNV"]);
        setAo(userData.data["ao"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const [dataEB, setDataEB] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getDashboardData", { id: 0 });
        setDataEB(userData.data);
        console.log(dataEB);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const [dataAO, setDataAO] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getDashboardDataAO", { id: 0 });
        setDataAO(userData.data);
        console.log(dataAO);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataEB.length > 0) {
      const newData = dataEB.map((item) => ({
        name: item["month"],
        uv: item["eb_count"],
      }));
      setData(newData);
    }
  }, [dataEB]);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    if (dataAO.length > 0) {
      const newData = dataAO.map((item) => ({
        name: item["month"],
        uv: item["ao_count"],
      }));
      setData2(newData);
    }
  }, [dataAO]);


  return (
    <center>
    <main className='main-container'>
      <div className='appbare'>
        <Nav className='namee'>
          <NavDropdown
            className='nama custom-dropdown'

            title={currentUser}
          >
            <NavDropdown.Item href="/notifications" className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
            <NavDropdown.Item href="/" className='it'>
              <SlLogout /> Exit
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <center><h1 className='espace_admin'>Espace Chef marché</h1></center>
      </div>
      <div className='fixside'>
        <Sidebar />
      </div>
      <div className='main-title'>
      </div>

      <div className='main-cards'>
      <div className='gg'>
        <div className='card'>
          <div className='card-inner'>
            <h3 className='tit'>Expression des besoins creer</h3>
            <IoIosFolder className='card_icon' />
          </div>
          <h1 className='num'>{eb}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className='tit'>EB non Valider</h3>
            <FaTimes className='card_icon' />
          </div>
          <h1 className='num'>{ebNV}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className='tit'>EB valider</h3>
            <FaCheck className='card_icon' />
          </div>
          <h1 className='num'>{ebV}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className='tit'>Les appels d'offre</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1 className='num'>{ao}</h1>
        </div>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" name="nombre d'EB" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="nombre d'ouvertures du plis" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </main>
    </center>
  )
}

export default DashboardAllCM
