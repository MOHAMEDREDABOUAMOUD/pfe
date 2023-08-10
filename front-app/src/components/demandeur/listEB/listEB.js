import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listEB.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/sideBar";

const ListEB = () => {
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({});
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

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
    try {
      const response = await axios.post("/getEBs", { id: "1" });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRows = async () => {
    const u = await getEBs();
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
  const renderFilterDropdown = () => {
    if (!showFilterDropdown) return null;

    return (
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
    );
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
    sortedRows = sortedRows.filter((row) =>
      row[column].toLowerCase().includes(filterValue)
    );
  });
  const navigate=useNavigate();
  const editRow=(id)=>{
    navigate(`/updateEB/${id}`);
  }
  const deleteRow= async (id)=>{
    await axios.post("/deleteEB", { id: id });
    getRows();
  }
  const handleFiles=(id)=>{
    navigate(`/listFiles/${id}`);
  }
  const handleOperations=(id)=>{
    navigate(`/listOperations/${id}`);
  }

  return (
    <div className="table-wrapper">
    <Sidebar/>
      <button onClick={toggleFilterDropdown}>Filter Rows</button>
      {renderFilterDropdown()}
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort(columns[0])}>
              Id {sortBy === columns[0] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[1])}>
              Objet {sortBy === columns[1] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[2])}>
              Agence {sortBy === columns[2] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[3])} className="expand">
              Observation {sortBy === columns[3] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[4])}>
              Prog_nonProg {sortBy === columns[4] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[5])}>
              Classe {sortBy === columns[5] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[6])}>
              Caution {sortBy === columns[6] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[7])}>
              Estimation {sortBy === columns[7] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[8])}>
              Date EB {sortBy === columns[8] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[9])}>
              Mode de Passation {sortBy === columns[9] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[10])}>
              Qualification {sortBy === columns[10] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[11])}>
              Secteur {sortBy === columns[11] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[12])}>
              Operations {sortBy === columns[12] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
            <th onClick={() => handleSort(columns[13])}>
              Files {sortBy === columns[13] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
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
    </div>
  );
};

export default ListEB;
