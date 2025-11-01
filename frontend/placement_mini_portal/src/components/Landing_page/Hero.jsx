// App.jsx
import React from "react";
import './Hero.css';
import Header from "../Header/Header";
import Laptop from '../../assets/Laptop.svg'
import logo from '../../assets/Logo.svg'
import { motion } from "framer-motion"



function Hero() {
  const ball = {
    width: 100,
    height: 100,
    backgroundColor: "#5686F5",
    borderRadius: "50%",
}
  return (
    <div>
      <div className="blackbg">
          <Header/>
          <motion.img
            src={logo}

            style={{
              width: "50vw",
              height: "auto",
              margin: "auto",
              zIndex: 1,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0], // fade in → stay → fade out
              scale: [0.8, 1, 1, 0.8], // zoom in → stay → zoom out
            }}
            transition={{
              duration: 2, // total time (in seconds)
              times: [0, 0.3, 0.7, 1], // timing of keyframes
              ease: "easeInOut",
            }}
          />
          <motion.img
          src={Laptop}
          alt="Laptop"
          className="Laptop"
          style={{
            marginTop:"10vh",
            zIndex: 2,
            position: "absolute",
          }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay:1.7,
            duration: 1.7,
            ease: "easeOut",
            type: "spring",
            bounce: 0.3,
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
