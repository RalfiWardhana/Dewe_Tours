import React,{useContext, useEffect, useState} from "react";
import "./data.css";
import Data from "../list.json"
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";
import {useParams} from "react-router-dom";

import Home from '../pages/home';
import DetailTour from '../pages/detailTour';
import Payment from '../pages/payment';
import Profile from '../pages/profile';
import Context, { CartContext } from '../cartContext';
import { useHistory } from 'react-router';
import { API,setAuthToken } from "../config/api";

const Datas = () =>{
    const {isLogin, setLogin} = useContext(CartContext);
    const history = useHistory();
    const addTrip= () =>{
        history.push("/add-trip")
    }
    const[trips,setTrips] =useState([])
    
    const getTrips = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const response = await API.get("/trip")
            setTrips(response.data.data)
            console.log(response.data.data)
            console.log(trips)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getTrips()
    },[])

    if(isLogin.isadmin == false){
        return (
            <div className="data">
                <h2 className="title-home">Group Tour</h2>
                <div className="fill">
                    <div className="flex-evenly">  
                        {trips.map((trip)=>(
                            <div className="card-tour">
                                <img src={trip.image[3]}></img>
                                <h4 className="data-title"><Link to={`/detail/${trip.id}`}>{trip.title}</Link></h4>
                                <div className="flex-between-harga">
                                    <p className="data-price">IDR {trip.price}</p>
                                    <p className="data-location">{trip.country.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>     
        )
     }
     else if(isLogin.isadmin == true){
        return (
            <div className="data">
                 <div className="flex-between">
                    <h2 className="title-home-addTrip">Income Trip</h2>
                    <button className="button-addTrip" onClick={addTrip}><p className="isi-button-addTrip">Add Trip</p></button>
                </div> 
                <div className="fill">
                    <div className="flex-evenly">  
                        {trips.map((trip)=>(
                            <div className="card-tour">
                                <img src={trip.image[3]}></img>
                                <h4 className="data-title"><Link to={`/detail/${trip.id}`}>{trip.title}</Link></h4>
                                <div className="flex-between-harga">
                                    <p className="data-price">IDR {trip.price}</p>
                                    <p className="data-location">{trip.country.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>     
            
        )
     }
}

export default Datas;