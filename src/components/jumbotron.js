import React from "react";
import "./jumbotron.css"
import Background from "../background.png"
import Logo from "./logo"
import Button from "./button"


const jumbotron = () =>{
    return (
        <div className="background-jumbotron" style ={{backgroundImage : `url(${Background})`}}> 
           <Logo/>
           <Button/>
           <h2 className="explore">Explore</h2>
           <p className="expression">your amazing city together</p>
           <p className="search-expression">Find Great Places to Holiday</p>
           <input className="search"></input>
           <button className="search-button">Search</button>
        </div>
    )
}

export default jumbotron;