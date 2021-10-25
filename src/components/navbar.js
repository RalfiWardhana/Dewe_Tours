import "./navbar.css"
import Background from "../navbar.png"
import Logo from "./logo"
import Button from "./button"
import PhotoProfile from "./photoProfile"
import { getAllByPlaceholderText } from "@testing-library/dom";
import { useState } from "react";

import Home from '../pages/home';
import DetailTour from '../pages/detailTour';
import Payment from '../pages/payment';
import Profile from '../pages/profile';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";

const Navbar = () =>{
 
        return(
            <div className="background" style ={{backgroundImage : `url(${Background})`}}> 
             <Logo/>
             <Button/>
           </div>
        ) 
   

}

export default Navbar;