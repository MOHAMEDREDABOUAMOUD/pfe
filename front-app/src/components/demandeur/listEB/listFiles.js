import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp, BsFillEyeFill, BsBoxArrowDown } from "react-icons/bs";
import "./listEB.css";
import "./listFiles.css"
import { Link, useParams } from "react-router-dom";

const ListOperations = ({ rows, columns, deleteRow, editRow }) => {
    const { idEB, idxEB } = useParams();
    const [sortBy, setSortBy] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [filters, setFilters] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        // Use idEB and idxEB to get the correct rows data.
        // For example, use them to filter the data and set it in the component state.
        //alert(idEB + " " + idxEB);
        const selectedRowsData = rows[parseInt(idxEB)].files;
        setSelectedRows(selectedRowsData);
    }, [idEB, idxEB, rows]);

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
    let sortedRows = selectedRows.slice();
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

    return (
        <div className="table-wrapper">
            <button onClick={toggleFilterDropdown}>Filter Rows</button>
            {showFilterDropdown && (
                <div className="filter-dropdown">
                    {columns.map((column) => (
                        <div key={column} className="filter-input">
                            <label>{column}</label>
                            <input
                                type="text"
                                value={filters[column] || ""}
                                onChange={(e) => this.handleFilterChange(column, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("id")}>
                            Id {sortBy === "id" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                        <th onClick={() => this.handleSort("agence")}>
                            Name {sortBy === "agence" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                
                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="edit-btn"
                                            id="delete"
                                            onClick={() => deleteRow(idEB, idxEB, row.id, idx)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(idEB, idxEB, row.id, idx)}
                                        />
                                        <BsFillEyeFill
                                            className="edit-btn"
                                            onClick={() => editRow(idEB, idxEB, row.id, idx)}
                                        />
                                        <BsBoxArrowDown
                                            className="edit-btn"
                                            onClick={() => editRow(idEB, idxEB, row.id, idx)}
                                        />
                                        
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListOperations;

