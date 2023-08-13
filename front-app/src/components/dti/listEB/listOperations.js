import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listEB.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from '../sidebar/sideBar';

const ListOperationsDti = () => {
    const { id } = useParams();
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
        navigate(`/addOperationDti/${id}`);
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
    let sortedRows = rows.slice();
    if (sortBy) {
        sortedRows.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
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
        sortedRows = sortedRows.filter((row) => row[column].toLowerCase().includes(filterValue));
    });

    const deleteRow=async(id)=>{
        await axios.post("/deleteOperation", { id: id });
        getRows();
    }
    const editRow=(id)=>{
        navigate(`/updateOperationDti/${id}`);
    }

    return (
        <div className="table-wrapper">
            <Sidebar/>
            <button onClick={toggleFilterDropdown}>Filter Rows</button>
            {showFilterDropdown && (
                <div className="filter-dropdown">
                    {columns.map((column) => (
                        <div key={column} className="filter-input">
                            <label>{column}</label>
                            <input
                                type="text"
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
                        <th onClick={() => this.handleSort(columns[1])}>
                            Agence {sortBy === columns[1] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[2])} className="expand">
                            Imputation {sortBy === columns[2] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[3])}>
                            nature projet {sortBy === columns[3] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[4])}>
                            Operation {sortBy === columns[4] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[5])}>
                            programme {sortBy === columns[5] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[6])}>
                            Situation {sortBy === columns[6] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[7])}>
                            Superficie {sortBy === columns[7] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort(columns[8])}>
                            type projet {sortBy === columns[8] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.code}</td>
                                <td>{row.agence}</td>
                                <td>{row.imputation}</td>
                                <td>{row.natureProjet}</td>
                                <td>{row.operation}</td>
                                <td>{row.programme}</td>
                                <td>{row.situation}</td>
                                <td>{row.superficie}</td>
                                <td>{row.typeProjet}</td>
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
                <button type="submit" class="btn btn-primary" onClick={() => { handleAddOp() }}>add</button>
            </div>
        </div>
    );
};

export default ListOperationsDti;

