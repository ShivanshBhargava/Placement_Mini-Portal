// App.jsx
import React from "react";
import './Header.css';
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import logo from '../../assets/Logo.svg';
import { motion } from "framer-motion"


function Header() {
  const name = "World";

  return (
        <div className="Header">
            
            <div style={{width:"14vw", display:"flex"}}>
            <motion.img src={logo}
            whileHover={{
              scale: 1.1,
              opacity: 0.6,
              transition: { duration: 0.1, ease: "easeOut" },
            }}
            alt="My Logo"
            className="Logo"
            transition={{
              duration: 0.2,
              ease: "easeInOut", 
            }}/>
            </div>
            <Navigation className="Nav"/>
            <AuthButtons className="Butt"/>
        </div>
  );
}

export default Header;
