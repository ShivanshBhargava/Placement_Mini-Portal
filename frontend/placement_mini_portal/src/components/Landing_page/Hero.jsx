import React from "react";
import "./Hero.css";
import Header from "../Header/Header";
import Laptop from "../../assets/Laptop.svg";
import logo from "../../assets/Logo.svg";
import { motion } from "framer-motion";
import LightRays from "../Background/LightRays.jsx";
import Drag from "../Pointer/FollowPointer.jsx";
import GooCursor from "../Pointer/GooCursor.jsx";

function Hero() {
  return (
    <div className="blackbg">
      {/* <Drag/> */}
      <GooCursor style={{height:"0px"}}/>
      <motion.div
       initial={{
          opacity: 0,
          filter: "blur(3vw)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0vw)",
        }}
        transition={{
          duration: 2.3,
          delay: 1.8,
          ease: "easeOut"
        }}
        className="reveal-element"
        style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: '0' }}
      >
        <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: '0' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.1}
            lightSpread={0.8}
            rayLength={1.3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.01}
            className="custom-rays"
          />
        </div>
      </motion.div>
      <div className="hero-grid">

        {/* HEADER */}
        <motion.div
          className="hero-header"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.2,
            duration: 1.7,
            ease: "easeOut",
            type: "spring",
            bounce: 0.3,
          }}
        >
          <Header />
        </motion.div>

        <div className="hero-center">

          {/* LOGO */}
          <motion.img
            className="hero-logo"
            src={logo}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
              clipPath: [
                "inset(0 100% 0 0)",
                "inset(0 0 0 0)",
                "inset(0 0 0 100%)",
              ],
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* LAPTOP */}
          <motion.img
            src={Laptop}
            alt="Laptop"
            className="hero-laptop"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.7,
              duration: 1.7,
              ease: "easeOut",
              type: "spring",
              bounce: 0.3,
            }}
          />

        </div>

        {/* SCROLL */}
        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.7,
            duration: 1.7,
            ease: "easeOut",
            type: "spring",
            bounce: 0.3,
          }}
        >
          <section id="section10" className="demo">
            <a href="#thanks" className="scroll-link">
              <div className="mouse"></div>
              <span className="scroll-text">Scroll</span>
            </a>
          </section>
        </motion.div>      
      </div>
    </div>

  );
}

export default Hero;




