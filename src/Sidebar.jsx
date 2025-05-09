import React from "react";
import { FaHome, FaUser, FaBus, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import szeLogo from "./assets/sze_logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <div className="menu-item logo-container">
          <img src={szeLogo} alt="SZE Logó" className="sidebar-logo" />
        </div>
        <Link to="/" className="menu-item">
          <FaHome size={24} />
        </Link>
        <Link to="/profile" className="menu-item">
          <FaUser size={24} />
        </Link>
        <Link to="/holiday" className="menu-item">
            <FaCalendarAlt size={24} />
        </Link>
        <Link to="/munkabajaras" className="menu-item">
          <FaBus size={24} />
        </Link>
      </div>

      <div className="sidebar-bottom">
        <a href="#" className="menu-item">
          <FaSignOutAlt size={24} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
