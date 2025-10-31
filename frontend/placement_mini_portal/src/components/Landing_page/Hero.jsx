// App.jsx
import React from "react";
import './Hero.css';
import Header from "../Header/Header";


function Hero() {
  const name = "World";

  return (
    <div className="blackbg">
        <Header/>
        <h1 className="question">Ready to level up your career?</h1>
    </div>
  );
}

export default Hero;
