import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp, BsBoxArrowDown, BsFillEyeFill } from "react-icons/bs";
import "./listAO.css";
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
import Journal from "./journal";
import EB from "./eb";
import LettreCommission from "./lettreCommission";
import UpdateAvis from "./Avis/updateAvis";

const ListAODti = () => {
    const [sortBy, setSortBy] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filters, setFilters] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
`;

    const [showJournal, setShowJournal] = useState(false);
    const [showEB, setShowEB] = useState(false);
    const [showLettreCommission, setShowLettreCommission] = useState(false);
    const [ido, setido] = useState(0);
    const [showUpdateAvis, setShowUpdateAvis] = useState(false);

    const handleButtonClick = () => {
        setShowJournal(true);
    };

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
    const getAOs = async () => {
        try {
            const response = await axios.post("/getAllAOs", { id: "1" });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getRows = async () => {
        const u = await getAOs();
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
    // const editRow = (id) => {
    //     navigate(`/updateAO/${id}`);
    // }

    //   const deleteRow = async (id) => {
    //     await axios.post("/deleteEB", { id: id });
    //     getRows();
    //   }
    const handleEB = (id) => {
        setido(id);
        setShowEB(true);
    }
    const handleJournal = (id) => {
        setido(id);
        setShowJournal(true);
    }
    const handleCloseJournal = () => {
        setShowJournal(false);
    };
    const handleCloseEB = () => {
        setShowEB(false);
    };
    const handleLettreCommission = (id) => {
        setido(id);
        setShowLettreCommission(true);
    }
    const handleCloseLettreCommission = () => {
        setShowLettreCommission(false);
    };
    const handleUpdateAvis = (id) => {
        setido(id);
        setShowUpdateAvis(true);
    }
    const handleCloseUpdateAvis = () => {
        setShowUpdateAvis(false);
    };
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
    // const viewFile=async(id)=>{
    //   navigate(`/viewAO/${id}`);
    // }

    return (
        <div className="table-wrapper">
                    <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace DTI</h1>
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
            <Sidebar />
            <center><button onClick={toggleFilterDropdown} className="filter">Filter Rows</button></center>
            {renderFilterDropdown()}
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("num")}>
                            Id {sortBy === "num" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("etat")}>
                            Etat {sortBy === "etat" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("dateOuverturePlis")}>
                            Date OP {sortBy === "dateOuverturePlis" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("heureOuverturePlis")} className="expand">
                            Heure OP {sortBy === "heureOuverturePlis" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("datePublicationPortail")}>
                            date PP {sortBy === "datePublicationPortail" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("dateEntreDM")}>
                            date entre dm {sortBy === "dateEntreDM" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("dateAchevementTravauxCommission")}>
                            date ATC {sortBy === "dateAchevementTravauxCommission" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th>
                            Avis
                        </th>
                        <th>
                            EB
                        </th>
                        <th>
                            Journal
                        </th>
                        <th>
                            Lettre commission
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.num}</td>
                                <td>{row.etat}</td>
                                <td>{row.dateOuverturePlis}</td>
                                <td>{row.heureOuverturePlis}</td>
                                <td>{row.datePublicationPortail}</td>
                                <td>{row.dateEntreDM}</td>
                                <td>{row.dateAchevementTravauxCommission}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => handleUpdateAvis(row.num)}
                                        />
                                        <BsFillEyeFill
                                            className="edit-btn"
                                            //onClick={() => viewFile(row.num)}
                                        />
                                        <BsBoxArrowDown
                                            className="edit-btn"
                                            onClick={() => handleDownload(row.avis, row.fileName)}
                                        />
                                    </span>
                                </td>
                                <td>
                                    <BsFillEyeFill
                                        className="edit-btn"
                                        onClick={() => handleEB(row.numEB)}
                                    />
                                </td>
                                <td>

                                    <BsFillEyeFill
                                        className="edit-btn"
                                        onClick={() => handleJournal(row.num)}
                                    />
                                </td>
                                <td>

                                    <BsFillEyeFill
                                        className="edit-btn"
                                        onClick={() => handleLettreCommission(row.numLettreCommission)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showJournal && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseJournal} />
                    </NavIcon>
                    <Journal id={ido} />
                </div>
            )}
            {showEB && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseEB} />
                    </NavIcon>
                    <EB id={ido} />
                </div>
            )}
            {showUpdateAvis && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseUpdateAvis} />
                    </NavIcon>
                    <UpdateAvis id={ido} />
                </div>
            )}
            {showLettreCommission && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseLettreCommission} />
                    </NavIcon>
                    <LettreCommission id={ido} />
                </div>
            )}
        </div>
    );
};

export default ListAODti;