import React from "react";
import './Hero.css';
import Header from "../Header/Header";
import Laptop from '../../assets/Laptop.svg'
import logo from '../../assets/Logo.svg'
import { motion , useScroll, useTransform} from "framer-motion"
import Threads from '../Background/Threads'



function Hero() {

  return (
    <div>
      <div style={{ width: '100vw', height: '100vh', position: 'absolute' }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      <div className="blackbg">

       
        <motion.div
          style={{ position: "fixed", zIndex: 2 }}
          initial={{ opacity: 0, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay:1.2,
            duration: 1.7,
            ease: "easeOut",
            type: "spring",
            bounce: 0.3,
          }}
        >
          <Header />
        </motion.div>


      {/* LOGO */}
        <motion.img
          src={logo}

          style={{
            width: "50vw",
            height: "auto",
            margin: "auto",
            zIndex: 0,
            marginTop:"30vh",
          }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: [
            "inset(0 100% 0 0)",
            "inset(0 0 0 0)",
            "inset(0 0 0 100%)",
          ], }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.img
          src={Laptop}
          alt="Laptop"
          className="Laptop"
          style={{
            marginTop:"12vh",
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
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay:1.7,
            duration: 1.7,
            ease: "easeOut",
            type: "spring",
            bounce: 0.3,
          }}
        >
        <section id="section10" className="demo" style={{ width: "auto" }}>
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
