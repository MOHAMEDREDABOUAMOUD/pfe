import React, { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp, BsFillEyeFill, BsBoxArrowDown } from "react-icons/bs";
import "./listEB.css";
import "./listFiles.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from '../sidebar/sideBar';

const ListFilesDti = () => {
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
    if(u!=null){
      setRows(u);
    }
    else {
      setRows([]);
    }
    const c = Object.keys(u[0]);
    if(c!=null){
      setColumns(c);
    }
    else{
      setColumns([]);
    }
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
  if (rows.length > 0 && sortBy) {
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
  if (rows.length > 0) {
    Object.keys(filters).forEach((column) => {
      const filterValue = filters[column].toLowerCase();
      sortedRows = sortedRows.filter((row) => row[column].toLowerCase().includes(filterValue));
    });
  }

  const deleteRow = async (id) => {
    await axios.post("/deleteFile", { id: id });
    getRows();
  }

  // const editRow=(id)=>{
  //     navigate(`/updateFile/${id}`);
  // }

  const handleDownload = async (id) => {
    try {
      const response = await axios.post("/getFile", { id: id });
      const buffer = new Uint8Array(response.data["piece"].data);
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
      link.download = response.data["fileName"]; // Specify the desired filename
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by revoking the Blob URL
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const navigate = useNavigate();
  const viewFile=async(id)=>{
    navigate(`/viewDti/${id}`);
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
                      onClick={() => viewFile(row.num)}
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

export default ListFilesDti;