import React, { useState } from "react";
import './Navbar.css'
// import Mukul from './Logo..jpg'
function Navbar() {
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState(false);

  const toggleFileDropdown = () => {
    setIsFileDropdownOpen(!isFileDropdownOpen);
  };

  return (
    <div className="navbar">
    <div className="navbar-logo">
        {/* <img src={Mukul} alt="Logo"/> */}
    </div>
    <div className="navbar-menu">
        <div className="navbar-menu-button">File ▾
            <div className="navbar-menu-dropdown">
                <a href="#">New</a>
                <a href="#">Save</a>
                <a href="#">Save As </a>
                
            </div>
        </div>
    </div>
    <div className="navbar-buttons">
        <button className="navbar-button">Undo</button>
        <button className="navbar-button">Redo</button>
        <button className="navbar-button">Clear</button>
        <button className="navbar-button">Export</button>
        <button className="navbar-button">Import</button>
    </div>
    <div className="navbar-right">
        <button className="navbar-button">Tutriols</button>
        <button className="navbar-button">Help</button>
    </div>
</div>
  );
}

export default Navbar;
