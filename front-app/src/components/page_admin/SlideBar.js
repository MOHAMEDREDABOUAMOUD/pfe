import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import './Slidebar.css';
import { Link } from 'react-router-dom';

function SlideBar() {
  useEffect(() => {
    const toggleLock = () => {
      setSidebarLocked(!sidebarLocked);
    };

    const hideSidebar = () => {
      if (sidebarHoverable) {
        setSidebarClosed(true);
      }
    };

    const showSidebar = () => {
      if (sidebarHoverable) {
        setSidebarClosed(false);
      }
    };

    const toggleSidebar = () => {
      setSidebarClosed(!sidebarClosed);
    };

    const handleWindowResize = () => {
      if (window.innerWidth < 800) {
        setSidebarClosed(true);
        setSidebarLocked(false);
        setSidebarHoverable(false);
      } else {
        setSidebarHoverable(true);
      }
    };

    const sidebar = document.querySelector('.sidebar');
    const sidebarLockBtn = document.querySelector('#lock-icon');

    sidebarLockBtn.addEventListener('click', toggleLock);
    sidebar.addEventListener('mouseleave', hideSidebar);
    sidebar.addEventListener('mouseenter', showSidebar);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      sidebarLockBtn.removeEventListener('click', toggleLock);
      sidebar.removeEventListener('mouseleave', hideSidebar);
      sidebar.removeEventListener('mouseenter', showSidebar);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const [sidebarClosed, setSidebarClosed] = useState(() => window.innerWidth < 800);
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHoverable, setSidebarHoverable] = useState(() => window.innerWidth >= 800);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest('.item') !== null) return;
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hoverable Sidebar Menu HTML CSS & JavaScript</title>
      <link rel="stylesheet" href="style.css" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />
      <nav className={`sidebar ${sidebarLocked ? 'locked' : ''} ${sidebarClosed ? 'close' : ''}`}>
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={require('../images/logo-omrane.png')} alt="logo_img" />
          </span>
          <span className="logo_name">Al Omrane</span>
          <i
            className={`bx ${sidebarLocked ? 'bx-lock-open-alt' : 'bx-lock-alt'}`}
            id="lock-icon"
            title="Unlock Sidebar"
          ></i>
          <i className="bx bx-x" id="sidebar-close"></i>
        </div>
        <div className="menu_container">
          <div className="menu_items">
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Accounts</span>
                <span className="line"></span>
              </div>
              <li className={`item ${showDropdown ? 'active' : ''}`}>
                <div className="link flex" onClick={handleDropdownToggle}>
                  <i className="bx bx-home-alt"></i>
                  <span>Gestion d'utilisateur</span>
                  <i className={`bx ${showDropdown ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                </div>
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link to="#" className="link flex">
                        <i className="bx bx-plus"></i>
                        <span>Ajouter</span>
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="#" className="link flex">
                        <i className="bx bx-list-ul"></i>
                        <span>Lister</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="sidebar_profile flex">
            <span className="nav_image">
              <img src={require('../images/logo-omrane.png')} alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name">Mohammed Raji</span>
              <br />
              <span className="email">Rajiiim6@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar flex">
        <i className="bx bx-menu" id="sidebar-open"></i>
        <input type="text" placeholder="Search..." className="search_box" />
      </nav>
    </>
  );
}

export default SlideBar;
