import React from "react";
import './Navigation.css';

function Navigation(){
    return (
        <div className="NavBar">
            <a href="#home">Home</a>
            <a href="#students">Students</a>
            <a href="#employees">Employees</a>
            <a href="#about">AboutUs</a>
        </div>
    )
}

export default Navigation;