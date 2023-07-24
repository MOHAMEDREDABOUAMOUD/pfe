import React, { Component } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsArrowDown, BsArrowUp } from "react-icons/bs";
import "./listUsers.css";

class ListUsers extends Component {
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
    const { rows, deleteRow, editRow } = this.props;
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
                ID {sortBy === "id" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("email")} className="expand">
                Email {sortBy === "email" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("nom")}>
                Nom {sortBy === "nom" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("prenom")}>
                Prenom {sortBy === "prenom" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("userName")}>
                UserName {sortBy === "userName" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("password")}>
                Password {sortBy === "password" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("fonction")}>
                Fonction {sortBy === "fonction" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
              <th onClick={() => this.handleSort("sexe")}>
                Sexe {sortBy === "sexe" && (sortAsc ? <BsArrowUp /> : <BsArrowDown />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>{row.id}</td>
                  <td className="expand">{row.email}</td>
                  <td>{row.nom}</td>
                  <td>{row.prenom}</td>
                  <td>{row.userName}</td>
                  <td>{row.password}</td>
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
  }
}

export default ListUsers;
