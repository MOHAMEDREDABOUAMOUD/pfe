import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import "./dashboard.css";
import logo from "./logo-omrane.png";
import Sidebar from "../sidebar/sideBar";
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';


const Dashboard = () => {
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

  return (
    <div className="dashboard-all">
      <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace Admin</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Mohammed Raji"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1"><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <SlLogout/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <div className="dashboard">
      <Sidebar/>
      <div className="dashboard-item">
        <h2>Number of Users: {numberOfUsersData}</h2>
      </div>

      <div className="dashboard-item">
        <h2>Number of EB Created by Year</h2>
        <Doughnut data={ebData} options={doughnutOptions} />
      </div>

      <div className="dashboard-item">
        <h2>Number of Marché Lancer cette année</h2>
        <div>
          <label htmlFor="yearFilter">Select Year:</label>
          <select id="yearFilter" value={selectedYear} onChange={handleYearFilter}>
            <option value="All">All</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* Add more options for other years */}
          </select>
        </div>
        <Bar data={marcheData} options={barOptions} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
