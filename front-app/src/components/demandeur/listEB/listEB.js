import React, { Component } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listEB.css";
import { Link } from "react-router-dom";

class ListEB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: null,
      sortAsc: true,
      filters: {},
      showFilterDropdown: false,
    };
  }

  handleSort = (column) => {
    const { sortBy, sortAsc } = this.state;
    if (sortBy === column) {
      this.setState({ sortAsc: !sortAsc });
    } else {
      this.setState({ sortBy: column, sortAsc: true });
    }
  };

  toggleFilterDropdown = () => {
    this.setState((prevState) => ({
      showFilterDropdown: !prevState.showFilterDropdown,
    }));
  };

  handleFilterChange = (column, value) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [column]: value,
      },
    }));
  };
  handleFilterRows = () => {
    // Your filtering logic here based on this.state.filters
    // You can apply the filters to the rows and update the state accordingly
    // For now, let's just log the filters
    console.log(this.state.filters);
  };

  renderFilterDropdown() {
    const { showFilterDropdown, filters } = this.state;
    const { columns } = this.props;

    if (!showFilterDropdown) return null;

    return (
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
        {/* <button onClick={this.handleFilterRows}>Apply Filters</button> */}
      </div>
    );
  }

  render() {
    const { rows, handleOperations, handleFiles, deleteRow, editRow } = this.props;
    const { sortBy, sortAsc, filters } = this.state;

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

    return (
      <div className="table-wrapper">
        <button onClick={this.toggleFilterDropdown}>Filter Rows</button>
        {this.renderFilterDropdown()}
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.handleSort("id")}>
                Id {sortBy === "id" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("objet")}>
                Objet {sortBy === "objet" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("observation")} className="expand">
                Observation {sortBy === "observation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("caution")}>
                Caution {sortBy === "caution" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("estimation")}>
                Estimation {sortBy === "estimation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("prog_nonProg")}>
                Prog_nonProg {sortBy === "prog_nonProg" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("agence")}>
                Agence {sortBy === "agence" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("modePassation")}>
                ModePassation {sortBy === "modePassation" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("secteur")}>
                Secteur {sortBy === "secteur" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("qualification")}>
                Qualification {sortBy === "qualification" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("operations")}>
                Operations {sortBy === "operations" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("files")}>
                Files {sortBy === "files" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>{row.id}</td>
                  <td>{row.objet}</td>
                  <td>{row.agence}</td>
                  <td>{row.observation}</td>
                  <td>{row.prog_nonProg}</td>
                  <td>{row.caution}</td>
                  <td>{row.estimation}</td>
                  <td>{row.modePassation}</td>
                  <td>{row.secteur}</td>
                  <td>{row.qualification}</td>
                  <td><a onClick={()=>handleOperations(row.id, idx)}>operations</a></td>
                  <td><a onClick={()=>handleFiles(row.id, idx)}>files</a></td>
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(row.id, idx)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(row.id, idx)}
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
  }
}

export default ListEB;
