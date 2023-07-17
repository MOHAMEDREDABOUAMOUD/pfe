import React, { Component } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./listUsers.css";

class ListUsers extends Component {
  render() {
    const { rows, deleteRow, editRow } = this.props;

    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th className="expand">email</th>
              <th>nom</th>
              <th>prenom</th>
              <th>userName</th>
              <th>password</th>
              <th>fonction</th>
              <th>sexe</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
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