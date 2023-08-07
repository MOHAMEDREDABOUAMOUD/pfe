import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/sideBar";
import axios from "axios";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("informations");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.post("/getCurrentUserData", { id: 0 });
        setEmail(userData.data["email"]);
        setNom(userData.data["nom"]);
        setPrenom(userData.data["prenom"]);
        setUserName(userData.data["login"]);
        setPassword(userData.data["pwd"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInformationsSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/updateSettingsIP", { email: email, nom: nom, prenom: prenom});
  };

  const handleSecuriteSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/updateSettingsS", { login: userName, pwd: password});
  };

  return (
    <div className="container mt-5">
      <Sidebar />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "informations" ? "active" : ""
            }`}
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
            <form onSubmit={handleInformationsSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        )}

        {activeTab === "securite" && (
          <div className="tab-pane fade show active">
            <h3>Sécurité</h3>
            <form onSubmit={handleSecuriteSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
