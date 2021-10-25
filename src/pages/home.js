import React from "react";
import "../components/jumbotron.css"
import Background from "../background.png"
import Logo from "../components/logo"
import Button from "../components/button"
import PhotoProfile from "../components/photoProfile"
import Cards from "../components/cards";
import Data from "../components/data";
import Footer from "../components/footer";


function home() {
  return (
    <div>
      <div className="background-jumbotron" style ={{backgroundImage : `url(${Background})`}}> 
           <Logo/>
           <Button/>
           {/* <PhotoProfile/> */}
           <h2 className="explore">Explore</h2>
           <p className="expression">your amazing city together</p>
           <p className="search-expression">Find Great Places to Holiday</p>
           <input className="search"></input>
           <button className="search-button">Search</button>
      </div>
      <Cards/>
      <Data/>
      <Footer/>
    </div>
  )
}

export default home;
