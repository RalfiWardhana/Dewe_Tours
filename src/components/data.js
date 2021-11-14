import React,{useContext, useEffect, useState} from "react";
import "./data.css";
import {Link} from "react-router-dom";
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
    const[search,setSearch]= useState({
        fullname:""
       })
    const [messages, setMessage] = useState([]);   
    const getTrips = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const response = await API.get("/trip")
            const responseTransaction = await API.get("/transaction")
            setTrips(response.data.data)
            console.log(response.data.data)
            console.log(responseTransaction.data.data)
            setMessage(responseTransaction.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getTrips()
    },[])

    const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }
    const edits = (aidi) => {
       history.push("/edit-trip/"+aidi)
    }
    const continues = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("filledQuota", 0);
            const response = await API.patch(`/trip/${aidi}`,formData,config)
            console.log(response.data)
            const responseGet = await API.get("/trip")
            setTrips(responseGet.data.data)
        } catch (error) {
            console.log(error)
        }
     }
 
     if(isLogin.isadmin == true){
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
                                <div className="square-quota">{trip.filledQuota}/{trip.quota}</div>
                                {trip.filledQuota == trip.quota ? (  
                                <div className="full-quota">Full Quota</div>
                                ):<img src={trip.image[3]} className="photo-trip"></img>}
                                <h4 className="data-title"><Link to={`/detail/${trip.id}`}className="data-title">{trip.title}</Link></h4>
                                <div className="flex-between-harga">
                                    <p className="data-price">IDR {rupiahFormat(trip.price)}</p>
                                    <p className="data-location">{trip.country.name}</p>
                                </div>
                                {trip.filledQuota == trip.quota ? (  
                                <div className="flex-data-button">
                                    <div className="continue" onClick={()=>edits(trip.id)}>
                                        <span style={{color:"white"}}>
                                            Edit
                                        </span>
                                    </div>
                                    <div className="continue" onClick={()=>continues(trip.id)}>
                                        <span style={{color:"white"}}>
                                            Continue
                                        </span>
                                    </div>
                                </div>    
                                ):<div style={{height:"0px"}}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>     
            
        )
     }
}

export default Datas;