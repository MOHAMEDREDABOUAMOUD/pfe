import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp, BsBoxArrowDown, BsFillEyeFill } from "react-icons/bs";
import "./lettreCommission.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo-omrane.png";
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../sidebar/sideBar';
import { SlLogout } from 'react-icons/sl';
import {FaUserTie} from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {IoMdNotifications} from 'react-icons/io';

import Navbar from 'react-bootstrap/Navbar';
import UpdateLettreCommission from "./LettreCommission/updateLettreCpmmission";
const LettreCommission = (props) => {
    const id=props.id;
    const [sortBy, setSortBy] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filters, setFilters] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [ido, setido] = useState(0);
    const [showLettreCommission, setShowLettreCommission] = useState(false);

    
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

    const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`;

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortAsc((prevSortAsc) => !prevSortAsc);
        } else {
            setSortBy(column);
            setSortAsc(true);
        }
    };

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
    //////////////////////////////////////////////////////////////
    const getLettreCommission = async () => {
        try {
            const response = await axios.post("/getLettreCommission", { id: id });
            return [response.data];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getRows = async () => {
        const u = await getLettreCommission();
        console.log(u);
        if (u != null) {
            setRows(u);
        }
        else setRows([]);
        const c = Object.keys(u[0]);
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
    ////////////////////////////////////////////////////////////////
    const renderFilterDropdown = () => {
        if (!showFilterDropdown) return null;

        return (
            <div className="filter-dropdown">
                {columns.map((column) => (
                    <div key={column} className="filter-input">
                        <label>{column}</label>
                        <input
                            type="text"
                            className="input-fil"
                            value={filters[column] || ""}
                            onChange={(e) => handleFilterChange(column, e.target.value)}
                        />
                    </div>
                ))}
                {/* <button onClick={handleFilterRows}>Apply Filters</button> */}
            </div>
        );
    };

    // Sorting Logic
    let sortedRows = rows.slice();
    if (sortBy) {
        sortedRows.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            if (aValue === null || aValue === undefined) {
                return sortAsc ? 1 : -1; // Null or undefined values appear at the end when ascending, and at the beginning when descending
            }
            if (bValue === null || bValue === undefined) {
                return sortAsc ? -1 : 1; // Null or undefined values appear at the beginning when ascending, and at the end when descending
            }

            //   if (sortBy === 'num') {
            //     return sortAsc ? aValue - bValue : bValue - aValue; // Numeric sorting
            //   }

            //   if (sortBy === 'dateEB') {
            //     const aDate = new Date(aValue).getTime();
            //     const bDate = new Date(bValue).getTime();
            //     return sortAsc ? aDate - bDate : bDate - aDate; // Date sorting
            //   }

            if (sortAsc) {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    }


    // Filtering Logic
    Object.keys(filters).forEach((column) => {
        const filterValue = filters[column].toLowerCase();
        sortedRows = sortedRows.filter((row) => {
            if (column === 'num') {
                return row[column].toString().toLowerCase().includes(filterValue);
            } else if (row[column] && typeof row[column] === 'string') {
                return row[column].toLowerCase().includes(filterValue);
            }
            return false; // Exclude rows that don't have the specified column or aren't strings
        });
    });

    const navigate = useNavigate();
    const editRow = (id) => {
        navigate(`/updateCommission/${id}`);
    }
    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Confirmer la suppression de la commission avec l'id " +id);

        if (confirmDelete) {
            await axios.post("/deleteLettreCommission", { id: id });
            getRows();
            alert("la commission a été bien Supprimé");
        } else {
            alert("Suppression annulée");
        }
    }

    const handleLettreCommission = (id) => {
        setido(id);
        setShowLettreCommission(true);
    }
    const handleCloseLettreCommission = () => {
        setShowLettreCommission(false);
    };
    //   const handleFiles = (id) => {
    //     setido(id);
    //     setShowFile(true);
    //   }
    //   const handleOperations = (id) => {
    //     setido(id);
    //     setShowOperation(true);
    //   }
    //   const handleCloseOperation = () => {
    //     setShowOperation(false);
    //   };
    //   const handleCloseFile = () => {
    //     setShowFile(false);
    //   };

    const handleDownload = async (file, fileName) => {
        try {
            //const response = await axios.post("/getFile", { id: id });
            const buffer = new Uint8Array(file);
            const binaryString = buffer.reduce((str, byte) => str + String.fromCharCode(byte), '');
            //console.log(binaryString);
            // Create a Blob from the Uint8Array
            const decodedData = atob(binaryString);
            const uint8Array = new Uint8Array(decodedData.length);
            for (let i = 0; i < decodedData.length; i++) {
                uint8Array[i] = decodedData.charCodeAt(i);
            }
            const blob = new Blob([uint8Array], { type: 'application/octet-stream' });

            // Create a download URL for the Blob
            const downloadUrl = URL.createObjectURL(blob);

            // Create a link element for downloading
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName; // Specify the desired filename
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Clean up by revoking the Blob URL
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div className="table-wrapper">
            <Navbar className="barad">
            <Navbar.Collapse className="justify-content-start">
              <img src={logo} className="imgleft"></img>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace Demandeur</h1>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={currentUser}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={()=>{navigate("/notifications")}}><IoMdNotifications/> Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/">
                <SlLogout/> Exit
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Sidebar />
      </Navbar>
            <center><button onClick={toggleFilterDropdown} className="filter">Filtre</button></center>
            {renderFilterDropdown()}
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("num")}>
                            Id {sortBy === "num" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("numEnvoie")}>
                            num envoie {sortBy === "numEnvoie" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("dateEnvoie")}>
                            date Envoie {sortBy === "dateEnvoie" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("destinataire")} className="expand">
                            destinataire {sortBy === "destinataire" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th>
                            lettre commission
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.num}</td>
                                <td>{row.numEnvoie}</td>
                                <td>{row.dateEnvoie}</td>
                                <td>{row.destinataire}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => handleLettreCommission(row.num)}
                                        />
                                        <BsFillEyeFill
                                            className="edit-btn"
                                            //onClick={() => viewFile(row.num)}
                                        />
                                        <BsBoxArrowDown
                                            className="edit-btn"
                                            onClick={() => handleDownload(row.lettreJournal, row.fileName)}
                                        />
                                    </span>
                                </td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(row.num)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(row.num)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showLettreCommission && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseLettreCommission} />
                    </NavIcon>
                    <UpdateLettreCommission id={ido} />
                </div>
            )}
        </div>
    );
};

export default LettreCommission;
