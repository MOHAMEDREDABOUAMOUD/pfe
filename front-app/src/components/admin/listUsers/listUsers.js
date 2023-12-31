import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listUsers.css";
import Sidebar from "../sidebar/sideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo-omrane.png";
import { SlLogout } from 'react-icons/sl';
import { BsFilterLeft } from 'react-icons/bs';
import { FaUserTie } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { IoMdNotifications } from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';

const ListUsers = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({});
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);


  const toggleFilterDropdown = () => {
    setShowFilterDropdown((prevState) => !prevState);
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  const handleFilterRows = () => {
    // Your filtering logic here based on filters state
    // You can apply the filters to the rows and update the state accordingly
    // For now, let's just log the filters
    console.log(filters);
  };

  const getUsers = async () => {
    try {
      const response = await axios.post("/getUsers", { id: "1" });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRows = async () => {
    console.log("eeeeeeeeeeeeee")
    const u = await getUsers();
    console.log(u);
    if (u != null) {
      setRows(u);
    }
    else {
      setRows([]);
    }
    let c = Object.keys(u[0]);
    c = c.filter(item => item !== "sexe");
    if (c != null) {
      setColumns(c);
    }
    else {
      setColumns([]);
    }
    console.log(c);
  };

  useEffect(() => {
    getRows();
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortAsc((prevSortAsc) => !prevSortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  // Sorting Logic
  let sortedRows = [...rows];
if (sortBy) {
  sortedRows.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === bValue) {
      return 0;
    } else if (aValue === null || aValue === undefined || aValue === "") {
      return sortAsc ? -1 : 1;
    } else if (bValue === null || bValue === undefined || bValue === "") {
      return sortAsc ? 1 : -1;
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      // For numbers, dates, or other types of data
      if (sortAsc) {
        return aValue < bValue ? -1 : 1;
      } else {
        return bValue < aValue ? -1 : 1;
      }
    }
  });
}

  // Filtering Logic
  let filteredRows = sortedRows;
  Object.keys(filters).forEach((column) => {
    const filterValue = filters[column].toString().toLowerCase(); // Convert to string
    filteredRows = filteredRows.filter((row) =>
      row[column].toString().toLowerCase().includes(filterValue) // Convert to string
    );
  });


  const deleteRow = async (idx) => {
    console.log(rows[idx]["immatricule"]);

    const confirmDelete = window.confirm("Confirmer la suppression de l'utilisateur avec l'immatricule " + rows[idx]["immatricule"]);

    if (confirmDelete) {
      await axios.post("/deleteUser", { id: rows[idx]["immatricule"] });
      getRows();
      alert("l'utilisateur a été bien Supprimé");
    } else {
      alert("Suppression annulée");
    }
  }
  const navigate = useNavigate();
  const editRow = async (idx) => {
    navigate(`/updateUser/${rows[idx]["immatricule"]}`);
  }
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

  return (
    <center>
    <div className="table-wrapper-admin">
      <div className='appbare'>
    <Sidebar />
    <Nav className='namee'>
            <NavDropdown
              className='nama custom-dropdown'
              
              title={currentUser}
            >
              <NavDropdown.Item onClick={()=>{navigate("/notifications")}} className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/" className='it'>
                <SlLogout /> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      <center><h1 className='espace_admin'>Espace Admin</h1></center>
    </div>
    <center><h1 className='titre'>List d'utilisateurs</h1></center>
    <span onClick={toggleFilterDropdown} className="search"><BsFilterLeft className="search" /></span>{showFilterDropdown && (
        <div className="filter-dropdown">
          {columns.map((column) => (
            <div key={column} className="filter-input">
              
              <input
                type="text"
                placeholder={column}
                className="input-fil"
                value={filters[column] || ""}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              />
            </div>
          ))}
          {/* <button onClick={handleFilterRows}>Apply Filters</button> */}
        </div>
      )}
      <table className="table">
      <thead>
          <tr>
            <th onClick={() => handleSort(columns[0])}>
              Immatricule {sortBy === columns[0] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[1])} className="expand">
              Email {sortBy === columns[1] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[2])}>
              Nom {sortBy === columns[2] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[3])}>
              Prenom {sortBy === columns[3] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[4])}>
              Login {sortBy === columns[4] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[5])}>
              Pwd {sortBy === columns[5] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[6])}>
              Fonction {sortBy === columns[6] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[7])}>
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredRows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.immatricule}</td>
                <td>{row.email}</td>
                <td>{row.nom}</td>
                <td>{row.prenom}</td>
                <td>{row.login}</td>
                <td>{row.pwd}</td>
                <td>{row.fonction}</td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </center>
  );
};

export default ListUsers;
