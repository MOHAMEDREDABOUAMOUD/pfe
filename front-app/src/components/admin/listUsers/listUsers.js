import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listUsers.css";
import Sidebar from "../sidebar/sideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setRows(u);
    const c = Object.keys(u[0]);
    setColumns(c);
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
  
  // ...
  
  // Sorting Logic
  let sortedRows = [...rows];
  if (sortBy) {
    sortedRows.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      // Convert values to numbers if applicable
      const aValueAsNumber = isNaN(aValue) ? aValue : parseFloat(aValue);
      const bValueAsNumber = isNaN(bValue) ? bValue : parseFloat(bValue);
  
      if (sortAsc) {
        return aValueAsNumber - bValueAsNumber; // Ascending sort for numbers
      } else {
        return bValueAsNumber - aValueAsNumber; // Descending sort for numbers
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
    await axios.post("/deleteUser", { id: rows[idx]["immatricule"] });
    getRows();
  }
  const navigate = useNavigate();
  const editRow = async (idx) => {
    navigate(`/updateUser/${rows[idx]["immatricule"]}`);
  }

  return (
    <div className="table-wrapper">
      <Sidebar />
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
              Sexe {sortBy === columns[7] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
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
                <td>{row.sexe}</td>
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
  );
};

export default ListUsers;
