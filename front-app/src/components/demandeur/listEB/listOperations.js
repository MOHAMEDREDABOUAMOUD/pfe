import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listEB.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from '../sidebar/sideBar';

const ListOperations = ({id}) => {
    const [sortBy, setSortBy] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filters, setFilters] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    //const [selectedRows, setSelectedRows] = useState([]);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    //////////////////////////////////////////////////////////////
    const getOperations = async () => {
        try {
            const response = await axios.post("/getOperations", { id: id });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getRows = async () => {
        const u = await getOperations();
        console.log(u);
        setRows(u);
        const c = Object.keys(u[0]);
        setColumns(c);
        console.log(c);
    };

    useEffect(() => {
        getRows();
    }, []);
    ////////////////////////////////////////////////////////////////

    const navigate = useNavigate();
    const handleAddOp = () => {
        //alert(idEB+" "+idxEB);
        //const { operations } = rowsEB[idxEB];
        navigate(`/addOperation/${id}`);
    };

    // useEffect(() => {
    //     // Use idEB and idxEB to get the correct rows data.
    //     // For example, use them to filter the data and set it in the component state.
    //     //alert(idEB + " " + idxEB);
    //     const selectedRowsData = rows[parseInt(idxEB)].operations;
    //     setSelectedRows(selectedRowsData);
    // }, [idEB, idxEB, rows]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortAsc(!sortAsc);
        } else {
            setSortBy(column);
            setSortAsc(true);
        }
    };

    const toggleFilterDropdown = () => {
        setShowFilterDropdown((prevShow) => !prevShow);
    };

    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [column]: value,
        }));
    };

    const handleFilterRows = () => {
        // Your filtering logic here based on filters
        // You can apply the filters to the rows and update the state accordingly
        // For now, let's just log the filters
        console.log(filters);
    };

    // Sorting Logic
    // Sorting Logic
    let sortedRows = rows.slice();
    if (sortBy) {
        sortedRows.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            // if (sortBy === 'code') {
            //     if (typeof aValue === 'number' && typeof bValue === 'number') {
            //         return sortAsc ? aValue - bValue : bValue - aValue; // Numeric sorting
            //     } else {
            //         return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            //     }
            // }

            if (sortAsc) {
                return aValue.toString().localeCompare(bValue.toString());
            } else {
                return bValue.toString().localeCompare(aValue.toString());
            }
        });
    }


    // Filtering Logic
    Object.keys(filters).forEach((column) => {
        const filterValue = filters[column].toLowerCase();
        sortedRows = sortedRows.filter((row) => {
            return row[column].toString().toLowerCase().includes(filterValue);
            // if (column === 'code') {
            //     return row[column].toString().toLowerCase().includes(filterValue);
            // } else if (row[column] && typeof row[column] === 'string') {
            //     return row[column].toLowerCase().includes(filterValue);
            // }
            // return false; // Exclude rows that don't have the specified column or aren't strings
        });
    });


    const deleteRow = async (id) => {
        const confirmDelete = window.confirm("Confirmer la suppression de l'operation avec l'id " +id);

        if (confirmDelete) {
            await axios.post("/deleteOperation", { id: id });
            getRows();
            alert("l'operation a été bien Supprimé");
        } else {
            alert("Suppression annulée");
        }
    }
    const editRow = (id) => {
        navigate(`/updateOperation/${id}`);
    }

    return (
        <div className="table-wrappero">
            <center><button onClick={toggleFilterDropdown} className="filter">Filtre</button></center>
            {showFilterDropdown && (
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
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort(columns[0])}>
                            Id {sortBy === columns[0] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[1])}>
                            Agence {sortBy === columns[1] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[2])}>
                            Imputation {sortBy === columns[2] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[3])}>
                            Nature Projet {sortBy === columns[3] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[4])}>
                            Operation {sortBy === columns[4] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[5])}>
                            Programme {sortBy === columns[5] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[6])}>
                            Situation {sortBy === columns[6] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[7])}>
                            Superficie {sortBy === columns[7] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => handleSort(columns[8])}>
                            Type Projet {sortBy === columns[8] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.code.toString()}</td>
                                <td>{row.agence.toString()}</td>
                                <td>{row.imputation.toString()}</td>
                                <td>{row.natureProjet.toString()}</td>
                                <td>{row.operation.toString()}</td>
                                <td>{row.programme.toString()}</td>
                                <td>{row.situation.toString()}</td>
                                <td>{row.superficie.toString()}</td>
                                <td>{row.typeProjet.toString()}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(row.code)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(row.code)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="form-group">
                <center>
                <button type="submit" class="btn btn-primary" onClick={() => { handleAddOp() }}>Ajouter</button>
                </center>
            </div>
        </div>
    );
};

export default ListOperations;

