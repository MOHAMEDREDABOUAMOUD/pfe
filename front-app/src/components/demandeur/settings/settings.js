import React, { useState } from "react";

const SettingsD = () => {
  const [activeTab, setActiveTab] = useState("informations");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "informations" ? "active" : ""}`}
            onClick={() => handleTabChange("informations")}
          >
            Informations Personnelles
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "securite" ? "active" : ""}`}
            onClick={() => handleTabChange("securite")}
          >
            Sécurité
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === "informations" && (
          <div className="tab-pane fade show active">
            <h3>Informations Personnelles</h3>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" className="form-control" id="nom" />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prenom</label>
                <input type="text" className="form-control" id="prenom" />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        )}

        {activeTab === "securite" && (
          <div className="tab-pane fade show active">
            <h3>Sécurité</h3>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsD;
