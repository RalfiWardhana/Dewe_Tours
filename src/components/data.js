import React,{useContext} from "react";
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

const Datas = () =>{
    const {isLogin, setLogin} = useContext(CartContext);
    const history = useHistory();
    const addTrip= () =>{
        history.push("/add-trip")
    }
    if(isLogin.isadmin == false){
        return (
            <div className="data">
                <div className="fill">
                <h2 className="title-home">Group Tour</h2>
                <div className="flex">  
                    {Data.map((data)=>(
                        <div className="card-tour">
                            <img src={data.image}></img>
                            <h4 className="data-title"><Link to={`/detail/${data.id}`}>{data.title}</Link></h4>
                            <div className="flex-between">
                                <p className="data-price">{data.price}</p>
                                <p className="data-location">{data.location}</p>
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
            <div className="data-addTrip">
                <div className="fill">
                <div className="flex-between">
                    <h2 className="title-home-addTrip">Income Trip</h2>
                    <button className="button-addTrip" onClick={addTrip}><p className="isi-button-addTrip">Add Trip</p></button>
                </div>    
                <div className="flex">  
                    {Data.map((data)=>(
                        <div className="card-tour">
                            <img src={data.image}></img>
                            <h4 className="data-title"><Link to={`/detail/${data.id}`}>{data.title}</Link></h4>
                            <div className="flex-between">
                                <p className="data-price">{data.price}</p>
                                <p className="data-location">{data.location}</p>
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