import React from "react";
import "./Hero.css";
import Header from "../Header/Header";
import Laptop from "../../assets/Laptop.svg";
import logo from "../../assets/Logo.svg";
import { motion } from "framer-motion";
import LightRays from "../Background/LightRays.jsx";
import GooCursor from "../Cursor/GooCursor.jsx";
import TextonLanding from "./Text.jsx";
import FlipText from "./Rotating.jsx";


function Hero() {

  return (
    <div className="blackbg">
      <GooCursor style={{ height: "0px" }} />
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
          <TextonLanding />
          <motion.div
            style={{
              position: "absolute",
              right: "23vw",
              marginTop: "15vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1.5vh",
              zIndex: 3,
              textShadow: "0.3vw 0.3vw 0.8vw rgba(0, 0, 0, 0.7)",
              whiteSpace: "nowrap",  // prevents wrapping
            }}
            initial={{ opacity: 0, x: "0vw", filter: "blur(12px)" }}
            animate={{ opacity: 1, x: "19vw", filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          >
            {/* ITEM 1 */}
            <div style={{ textAlign: "right" }}>
              <h1
                style={{
                  color: "#beb7b7ff",
                  fontFamily: "Anton",
                  fontSize: "2.2vw",
                  margin: "0"
                }}
              >
                01
              </h1>
              <FlipText
                text="Simple"
                style={{
                  color: "#fcffe8ff",
                  fontSize: "1.8vw",
                  fontFamily: "Roboto, sans-serif",
                  marginLeft: "3vw",
                }}
              />
            </div>

            {/* ITEM 2 */}
            <div style={{ textAlign: "right" }}>
              <h1
                style={{
                  color: "#beb7b7ff",
                  fontFamily: "Anton",
                  fontSize: "2.2vw",
                  margin: 0,
                }}
              >
                02
              </h1>
              <FlipText
                text="Transparent"
                style={{
                  color: "#fcffe8ff",
                  fontSize: "1.8vw",
                  fontFamily: "Roboto, sans-serif",
                  marginLeft: "3vw",
                }}
              />
            </div>

            {/* ITEM 3 */}
            <div style={{ textAlign: "right" }}>
              <h1
                style={{
                  color: "#beb7b7ff",
                  fontFamily: "Anton",
                  fontSize: "2.2vw",
                  margin: 0,
                }}
              >
                03
              </h1>
              <FlipText
                text="Powerful"
                style={{
                  color: "#fcffe8ff",
                  fontSize: "1.8vw",
                  fontFamily: "Roboto, sans-serif",
                  marginLeft: "3vw",
                }}
              />
            </div>

            {/* ITEM 4 */}
            <div style={{ textAlign: "right" }}>
              <h1
                style={{
                  color: "#beb7b7ff",
                  fontFamily: "Anton",
                  fontSize: "2.2vw",
                  margin: 0,
                }}
              >
                04
              </h1>
              <FlipText
                text="Reliable"
                style={{
                  color: "#fcffe8ff",
                  fontSize: "1.8vw",
                  fontFamily: "Roboto, sans-serif",
                  marginLeft: "3vw",
                }}
              />
            </div>

            {/* FINAL SINGLE-LINE TAGLINE */}
            <h1
              style={{
                color: "#fcffe8ff",
                fontFamily: "Yellowtail",
                fontSize: "2vw",
                marginTop: "3vh",
                whiteSpace: "nowrap", // ensures single line
                textAlign: "right",
              }}
            >
              Because Your Future deserves nothing better
            </h1>
          </motion.div>

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
      <motion.div
        className="blue-line"
        initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 1 }}
        transition={{
          delay: 1.7,
          duration: 1.7,
          ease: "easeOut",
          type: "spring",
          bounce: 0.3,
        }}
        style={{
          width: "120%",
          height: "4.5vh",
          backgroundColor: "rgba(0, 255, 255, 0.2)",
          transformOrigin: "right"
        }}
      />
    </div>

  );
}

export default Hero;




