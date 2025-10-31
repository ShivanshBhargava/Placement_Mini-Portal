// App.jsx
import React from "react";
import './Header.css';
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import logo from '../../assets/Logo.svg';


function Header() {
  const name = "World";

  return (
        <div className="Header">
            <div style={{width:"17vw", display:"flex"}}><img src={logo} alt="My logo" className="Logo"/></div>
            <Navigation className="Nav"/>
            <AuthButtons className="Butt"/>
        </div>
  );
}

export default Header;
