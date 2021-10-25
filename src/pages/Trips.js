import React from "react";
import "../components/jumbotron.css"
import Navbar from "../components/navbar";
import Data from "../components/data";
import Footer from "../components/footer";

function homeTrip() {
    return (
      <div>
        <Navbar/>
        <Data/>
        <Footer/>
      </div>
    )
  }
  
  export default homeTrip;