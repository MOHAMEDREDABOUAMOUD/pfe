import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Slidebar.css';

import { Link } from 'react-router-dom';

function SlideBar() {
  useEffect(() => {
    // Function to toggle the lock state of the sidebar
    const toggleLock = () => {
      setSidebarLocked(!sidebarLocked);
    };

    // Function to hide the sidebar when the mouse leaves
    const hideSidebar = () => {
      if (sidebarHoverable) {
        setSidebarClosed(true);
      }
    };

    // Function to show the sidebar when the mouse enters
    const showSidebar = () => {
      if (sidebarHoverable) {
        setSidebarClosed(false);
      }
    };

    // Function to show and hide the sidebar
    const toggleSidebar = () => {
      setSidebarClosed(!sidebarClosed);
    };

    // If the window width is less than 800px, close the sidebar and remove hoverability and lock
    const handleWindowResize = () => {
      if (window.innerWidth < 800) {
        setSidebarClosed(true);
        setSidebarLocked(false);
        setSidebarHoverable(false);
      } else {
        setSidebarHoverable(true);
      }
    };

    const sidebar = document.querySelector(".sidebar");
    const sidebarLockBtn = document.querySelector("#lock-icon");

    // Adding event listeners to buttons and sidebar for the corresponding actions
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebar.addEventListener("mouseleave", hideSidebar);
    sidebar.addEventListener("mouseenter", showSidebar);

    window.addEventListener("resize", handleWindowResize);

    // Clean up event listeners on component unmount
    return () => {
      sidebarLockBtn.removeEventListener("click", toggleLock);
      sidebar.removeEventListener("mouseleave", hideSidebar);
      sidebar.removeEventListener("mouseenter", showSidebar);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const [sidebarClosed, setSidebarClosed] = useState(window.innerWidth < 800);
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [sidebarHoverable, setSidebarHoverable] = useState(window.innerWidth >= 800);

  return (
    
    <>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hoverable Sidebar Menu HTML CSS & JavaScript</title>
      <link rel="stylesheet" href="style.css" />
      <link
        flex
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <nav className={`sidebar ${sidebarLocked ? "locked" : ""} ${sidebarClosed ? "close" : ""}`}>
        <div className="logo_items flex">
          <span className="nav_image">
            <img src={require('../images/logo-omrane.png')} alt="logo_img" />
          </span>
          <span className="logo_name">Al Omrane</span>
          <i className={`bx ${sidebarLocked ? "bx-lock-open-alt" : "bx-lock-alt"}`} id="lock-icon" title="Unlock Sidebar"></i>
          <i className="bx bx-x" id="sidebar-close"></i>
        </div>
        <div className="menu_container">
          <div className="menu_items">
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Dashboard</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-home-alt"></i>
                  <span>Overview</span>
                </Link>
              </li>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-grid-alt"></i>
                  <span>All Projects</span>
                </Link>
              </li>
            </ul>
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Editor</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bxs-magic-wand"></i>
                  <span>Magic Build</span>
                </Link>
              </li>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-folder"></i>
                  <span>New Projects</span>
                </Link>
              </li>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-cloud-upload"></i>
                  <span>Upload New</span>
                </Link>
              </li>
            </ul>
            <ul className="menu_item">
              <div className="menu_title flex">
                <span className="title">Setting</span>
                <span className="line"></span>
              </div>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-flag"></i>
                  <span>Notice Board</span>
                </Link>
              </li>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-award"></i>
                  <span>Award</span>
                </Link>
              </li>
              <li className="item">
                <Link to="#" className="link flex">
                  <i className="bx bx-cog"></i>
                  <span>Setting</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar_profile flex">
            <span className="nav_image">
              <img src={require('../images/logo-omrane.png')} alt="logo_img" />
            </span>
            <div className="data_text">
              <span className="name">Mohammed Raji</span><br/>
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
