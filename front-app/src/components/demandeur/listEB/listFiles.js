import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp, BsFillEyeFill, BsBoxArrowDown } from "react-icons/bs";
import "./listEB.css";
import "./listFiles.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListFiles = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({});
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  //////////////////////////////////////////////////////////////
  const getFiles = async () => {
    try {
      const response = await axios.post("/getFiles", { id: id });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getRows = async () => {
    const u = await getFiles();
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

  const deleteRow = async (id) => {
    await axios.post("/deleteFile", { id: id });
    getRows();
  }

  // const editRow=(id)=>{
  //     navigate(`/updateFile/${id}`);
  // }

  const handleDownload = async (id) => {
    const r = await axios.post("/getFile", { id: id });
    // Convert base64 string to Uint8Array
    const base64FileData = r.data["piece"]["data"];
    const uint8Array = new Uint8Array(atob(base64FileData).split('').map(char => char.charCodeAt(0)));

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });

    // Create a download URL for the Blob
    const downloadUrl = URL.createObjectURL(blob);

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'filename.txt'; // Specify the desired filename
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(downloadUrl);

  };

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
              Name {sortBy === columns[1] && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.num}</td>
                <td>{row.libelle}</td>

                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="edit-btn"
                      id="delete"
                      onClick={() => deleteRow(row.num)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                    // onClick={() => editRow(idEB, idxEB, row.id, idx)}
                    />
                    <BsFillEyeFill
                      className="edit-btn"
                    // onClick={() => editRow(idEB, idxEB, row.id, idx)}
                    />
                    <BsBoxArrowDown
                      className="edit-btn"
                      onClick={() => handleDownload(row.num)}
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

export default ListFiles;