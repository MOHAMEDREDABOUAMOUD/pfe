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
import Nav from 'react-bootstrap/Nav';
import { BsFilterLeft } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';
import { FaUserTie } from 'react-icons/fa';
import Navbar from 'react-bootstrap/Navbar';
import Journal from "./journal";
import EB from "./eb";
import LettreCommission from "./lettreCommission";
import NavDropdown from 'react-bootstrap/NavDropdown';


import { IoMdNotifications } from 'react-icons/io';
import UpdateAvis from "./Avis/updateAvis";
import { CiMenuKebab } from "react-icons/ci";
import ViewDM from "../listEB/view";

const ListAODM = () => {
    const [sortBy, setSortBy] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filters, setFilters] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openDropdownIdx, setOpenDropdownIdx] = useState(null);
    
  const [showFile, setShowFile] = useState(false);


  const handleFile = (id) => {
    setido(id);
    setShowFile(true);
  }
  const handleCloseFile = () => {
    setShowFile(false);
  };

    const handleDropdownClick1 = (index) => {
        setOpenDropdownIdx(openDropdownIdx === index ? null : index);
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
    const [showUpdateAvis, setShowUpdateAvis] = useState(false);
    const [ido, setido] = useState(0);

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
        let c = Object.keys(u[0]);
        c = c.filter(item => item !== "Avis");
        c = c.filter(item => item !== "numEB");
        c = c.filter(item => item !== "numLettreCommission");
        c = c.filter(item => item !== "fileName");
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
        setido(id);
        setShowUpdateAvis(true);
    }

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
            const buffer = new Uint8Array(file.data);
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
        <center>
            <div className="table-wrapper-dmm">
                <div className='appbare'>
                    <Sidebar />
                    <Nav className='namee'>
                        <NavDropdown
                            className='nama custom-dropdown'

                            title={currentUser}
                        >
                            <NavDropdown.Item onClick={() => { navigate("/notifications") }} className='it'><IoMdNotifications /> Notifications</NavDropdown.Item>
                            <NavDropdown.Item href="/" className='it'>
                                <SlLogout /> Exit
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <center><h1 className='espace_admin'>Espace Division marché</h1></center>
                </div>
                <center><h1 className='titre'>List Appel D'offres</h1></center>
                <span onClick={toggleFilterDropdown} className="search"><BsFilterLeft className="search" /></span>
                {renderFilterDropdown()}
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("num")}>
                                Id {sortBy === "num" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
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
                                    <td>{row.dateOuverturePlis}</td>
                                    <td>{row.heureOuverturePlis}</td>
                                    <td>{row.datePublicationPortail}</td>
                                    <td>{row.dateEntreDM}</td>
                                    <td>{row.dateAchevementTravauxCommission}</td>
                                    <td className="fit">
                                        <div className="dropdown">
                                            <div className="actions">
                                                <CiMenuKebab
                                                    className="dropdown-btn"
                                                    onClick={() => handleDropdownClick1(idx)} // Pass the index here
                                                />
                                            </div>
                                            {openDropdownIdx === idx && ( // Check if the dropdown for this row should be open
                                                <div className="dropdown-content" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                    <BsFillPencilFill
                                                        className="edit-btn"
                                                        onClick={() => handleUpdateAvis(row.num)}
                                                    />
                                                    <BsFillEyeFill
                                                        className="edit-btn"
                                                        onClick={() => handleFile(row.num)}
                                                    />
                                                    <BsBoxArrowDown
                                                        className="edit-btn"
                                                        onClick={() => handleDownload(row.avis, row.fileName)}
                                                    />
                                                </div>
                                            )}
                                        </div>
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
                {showFile && (
                  <div className="overlay">
                    <NavIcon className="close-icon" to='#'>
                      <AiIcons.AiOutlineClose onClick={handleCloseFile} />
                    </NavIcon>
                    <ViewDM id={ido} />
                  </div>
                )}
            </div>
        </center>
    );
};

export default ListAODM;
