import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./eb.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo-omrane.png";
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import Sidebar from '../sidebar/sideBar';
import Operation from '../listEB/listOperations';
import Files from '../listEB/listFiles';
import Nav from 'react-bootstrap/Nav';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {IoMdNotifications} from 'react-icons/io';



const EB = (props) => {
    const id = props.id;
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

    const [showOperation, setShowOperation] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [ido, setido] = useState(0);

    const handleButtonClick = () => {
        setShowOperation(true);
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
    const getEBs = async () => {
        console.log(id);
        try {
            const response = await axios.post("/getEB", { id: id });
            return [response.data];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getRows = async () => {
        const u = await getEBs();
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

            if (sortBy === 'num') {
                return sortAsc ? aValue - bValue : bValue - aValue; // Numeric sorting
            }

            if (sortBy === 'dateEB') {
                const aDate = new Date(aValue).getTime();
                const bDate = new Date(bValue).getTime();
                return sortAsc ? aDate - bDate : bDate - aDate; // Date sorting
            }

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
        navigate(`/updateEB/${id}`);
    }
    const deleteRow = async (id) => {
        await axios.post("/deleteEB", { id: id });
        getRows();
    }
    const handleFiles = (id) => {
        setido(id);
        setShowFile(true);
    }
    const handleOperations = (id) => {
        setido(id);
        setShowOperation(true);
    }
    const handleCloseOperation = () => {
        setShowOperation(false);
    };
    const handleCloseFile = () => {
        setShowFile(false);
    };

    return (
        <div className="table-wrapper">
                        <Navbar className="barad">
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="left">
            <h1 href="#login" className="espacee">Espace DM</h1>
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
                        <th onClick={() => handleSort("Id")}>
                            Id {sortBy === "Id" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Objet")}>
                            Objet {sortBy === "Objet" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Agence")}>
                            Agence {sortBy === "Agence" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Observation")} className="expand">
                            Observation {sortBy === "Observation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("prog/non pog")}>
                            Prog_nonProg {sortBy === "prog/non pog" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Classe")}>
                            Classe {sortBy === "Classe" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Caution")}>
                            Caution {sortBy === "Caution" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Estimation")}>
                            Estimation {sortBy === "Estimation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Date EB")}>
                            Date EB {sortBy === "Date EB" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Mode de passation")}>
                            Mode de Passation {sortBy === "Mode de passation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Qualification")}>
                            Qualification {sortBy === "Qualification" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Secteur")}>
                            Secteur {sortBy === "Secteur" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort("Operations")}>
                            <th onClick={handleButtonClick}>
                                Operations {sortBy === "Operations" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                            </th>
                        </th>
                        <th onClick={() => handleSort("Files")}>
                            Files {sortBy === "Files" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.num}</td>
                                <td>{row.objet}</td>
                                <td>{row.agence}</td>
                                <td>{row.observation}</td>
                                <td>{row.prog_nonprog}</td>
                                <td>{row.classe}</td>
                                <td>{row.caution}</td>
                                <td>{row.estimation}</td>
                                <td>{row.dateEB}</td>
                                <td>{row.modePassation}</td>
                                <td>{row.qualification}</td>
                                <td>{row.secteur}</td>
                                <td><a onClick={() => handleOperations(row.num)}>operations</a></td>
                                <td><a onClick={() => handleFiles(row.num)}>files</a></td>
                                <td className="fit">
                                    <span className="actions">
                                        {/* <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row.num)}
                    /> */}
                                        {row.validerPar === '' && (
                                            <BsFillPencilFill
                                                className="edit-btn"
                                                onClick={() => editRow(row.num)}
                                            />
                                        )}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showOperation && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseOperation} />
                    </NavIcon>
                    <Operation id={ido} />
                </div>
            )}
            {showFile && (
                <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                        <AiIcons.AiOutlineClose onClick={handleCloseFile} />
                    </NavIcon>
                    <Files id={ido} />
                </div>
            )}
        </div>
    );
};

export default EB;