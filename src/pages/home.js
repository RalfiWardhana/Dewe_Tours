import React,{useContext, useEffect, useState} from "react";
import "../components/jumbotron.css"
import "../components/data.css";
import Cards from "../components/cards";
import Background from "../background.png"
import { useHistory } from 'react-router';
import { API,setAuthToken } from "../config/api";
import Context, { CartContext } from '../cartContext';
import {Link} from "react-router-dom";

function Home() {
  const {isLogin, setLogin} = useContext(CartContext);
    const history = useHistory();
    const addTrip= () =>{
        history.push("/add-trip")
    }
    const[trips,setTrips] =useState([])
    const[search,setSearch]= useState({
        searching:""
       })
    const[resultSearch,setResultSearch]=useState(false)
    const changeSearch = (e) => {
        setSearch({...search,[e.target.name]:e.target.value})
    }   
    const [messages, setMessage] = useState([]);   
    
    const arrayTransaction = []
    const getTrips = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const response = await API.get("/trip")
            const responseTransaction = await API.get("/transaction")
            setTrips(response.data.data)
            setMessage(responseTransaction.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const cari = () => {
       setResultSearch(true)
    }
    const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }

   
  useEffect(()=>{
      getTrips()
},[])


  if(resultSearch==false){  
    return (
      <div>
        <div className="background-jumbotron" style ={{backgroundImage : `url(${Background})`}}> 
            <Logo/>
            <Button/>
            <h2 className="explore">Explore</h2>
            <p className="expression">your amazing city together</p>
            <p className="search-expression">Find Great Places to Holiday</p>
            <input className="search" name="searching" value={search.searching} onChange={(e)=>changeSearch(e)}></input>
            <button className="search-button" onClick={cari}>Search</button>
        </div>
        <Cards/>
        <div className="data">
            <h2 className="title-home">Group Tour</h2>
            <div className="fill">
                <div className="flex-evenly">  
                    {trips.map((trip)=>(
                      <div className="card-tour">
                        <div className="square-quota">{trip.filledQuota}/{trip.quota}</div>
                        {trip.filledQuota == trip.quota ? (  
                        <div className="full-quota">Full Quota</div>
                        ):<img src={trip.image[3]} className="photo-trip"></img>}
                        {trip.filledQuota == trip.quota ? (  
                        <h4 className="data-title">{trip.title}</h4>
                        ):<h4 className="data-title"><Link to={`/detail/${trip.id}`} className="data-title">{trip.title}</Link></h4>} 
                          <div className="flex-between-harga">
                            <p className="data-price">IDR {rupiahFormat(trip.price)}</p>
                            <p className="data-location">{trip.country.name}</p>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>     
        <Footer/>
      </div>
    )
  }
  else if(resultSearch == true){
    return(
      <div>
        <div className="background-jumbotron" style ={{backgroundImage : `url(${Background})`}}> 
            <Logo/>
            <Button/>
            <h2 className="explore">Explore</h2>
            <p className="expression">your amazing city together</p>
            <p className="search-expression">Find Great Places to Holiday</p>
            <input className="search" name="searching" value={search.searching} onChange={(e)=>changeSearch(e)}></input>
            <button className="search-button" onClick={cari}>Search</button>
        </div>
        <Cards/>
        <div className="data">
            <h2 className="title-home">Group Tour</h2>
            <div className="fill">
                <div className="flex-evenly">  
                    {trips.filter((carii)=>carii.title.toLowerCase().includes(search.searching) || carii.country.name.toLowerCase().includes(search.searching.toLowerCase())).map((trip)=>(
                      <div className="card-tour">
                        <div className="square-quota">{trip.filledQuota}/{trip.quota}</div>
                        {trip.filledQuota == trip.quota ? (  
                        <div className="full-quota">Full Quota</div>
                        ):<img src={trip.image[3]} className="photo-trip"></img>}
                        <h4 className="data-title"><Link to={`/detail/${trip.id}`} className="data-title">{trip.title}</Link></h4>
                          <div className="flex-between-harga">
                            <p className="data-price">IDR {rupiahFormat(trip.price)}</p>
                            <p className="data-location">{trip.country.name}</p>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>     
        <Footer/>
      </div>
    )
  }
}

export default Home;
