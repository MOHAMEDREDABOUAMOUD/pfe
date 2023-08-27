import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
 import './dashboard_all.css'
 import './dashboard.css'
 import React, { useState, useEffect } from "react";
 import Sidebar from "../sidebar/sideBar";
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "./logo-omrane.png";
import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

function DashboardAllCM() {
    Chart.register(CategoryScale);
  // Sample data for the dashboard
  const [numberOfUsersData, setNumberOfUsersData] = useState(0);
  const [selectedYear, setSelectedYear] = useState("All");

  const getMarcheDataByYear = (year) => {
    // Sample static data for demonstration
    switch (year) {
      case "All":
        return [25, 35, 30, 40, 20, 50];
      case "2021":
        return [10, 20, 15, 30, 5, 25];
      case "2022":
        return [15, 25, 20, 35, 15, 40];
      case "2023":
        return [20, 30, 25, 45, 25, 60];
      default:
        return [];
    }
  };

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
  
  useEffect(() => {
    // Fetch the number of users from your data source or API
    // For now, I'll simulate the data with a timeout
    setTimeout(() => {
      setNumberOfUsersData(40); // Replace this with your actual data
    }, 1000);
  }, []);

  const ebData = {
    labels: ["Accepted", "Rejected"],
    datasets: [
      {
        data: [40, 10],
        backgroundColor: ["#28A745", "#DC3545"],
        hoverBackgroundColor: ["#28A745", "#DC3545"],
      },
    ],
  };

  const marcheData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Number of Marché",
        data: getMarcheDataByYear(selectedYear), // Replace this function call with your data retrieval logic
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        type: "category", // Specify the type of scale for x-axis
      },
    },
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
  };
  const handleYearFilter = (event) => {
    setSelectedYear(event.target.value);
  };
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <Navbar className="barad">
        <Navbar.Collapse className="justify-content-start">
              <img src={logo} className="imgleft"></img>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace CM</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={currentUser}
              menuVariant="dark"
            >
              <NavDropdown.Item href="/notifications"><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/">
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='fixside'>
      <Sidebar/>
      </div>
        <div className='main-title'>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='tit'>All EB</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1 className='num'>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='tit'>EB non Valider</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1 className='num'>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3 className='tit'>EB valider</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1 className='num'>33</h1>
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
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default DashboardAllCM
