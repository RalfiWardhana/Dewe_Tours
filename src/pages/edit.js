import React, { useState,useContext,useEffect } from 'react';
import Navbar from "../components/navbar";
import "../styles/addTrip.css"
import "../styles/profile.css"
import { Container, Row, Col,Modal } from 'reactstrap';
import Footer from "../components/footer";
import { useHistory } from 'react-router';
import {useParams} from "react-router-dom";
import { API,setAuthToken } from "../config/api"; 

function Edit() {
const params = useParams()
const history = useHistory()
const[form,appendForm] = useState({
    title:"",
    country:"",
    accomodation:"",
    transportation:"",
    eat:"",
    day:"",
    night:"",
    dateTrip:"",
    price:"",
    quota:"",
    description:"",
    image:""
   }) 
  const getTrip = async() => {
    try {
        const token = localStorage.getItem("token");
        setAuthToken(token)
        const response = await API.get("/trip/"+params.id)
        console.log(response.data.data[0])
        appendForm({
            title:response.data.data[0].title,
            country:response.data.data[0].country.name,
            accomodation:response.data.data[0].accomodation,
            transportation:response.data.data[0].transportation,
            eat:response.data.data[0].eat,
            day:response.data.data[0].day,
            night:response.data.data[0].night,
            dateTrip:response.data.data[0].dateTrip,
            price:response.data.data[0].price,
            quota:response.data.data[0].quota,
            description:response.data.data[0].description,
            image:"",
        })
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    getTrip()
},[])
const handleChange = (e) => {
    appendForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  } 
const add = async(e) => {
    e.preventDefault()

     try {
        e.preventDefault()
         const token = localStorage.getItem("token");
         setAuthToken(token)
         const config ={
             headers:{
                 "Content-Type" : "multipart/form-data"
             }
         }
         const birthday = new Date(form.dateTrip);
         const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const sch = birthday.getDate() + " " + months[birthday.getMonth()] + " " + birthday.getFullYear();
         const formData = new FormData()
         formData.append("title", form.title);
         formData.append("idCountry", parseInt(form.country));
         formData.append("accomodation", form.accomodation);
         formData.append("transportation", form.transportation);
         formData.append("eat", form.eat);
         formData.append("day",parseInt(form.day));
         formData.append("night", parseInt(form.night));
         formData.append("dateTrip", sch);
         formData.append("price",parseInt(form.price));
         formData.append("quota", parseInt(form.quota));
         formData.append("description", form.description);
         formData.append("filledQuota", 0);
         for(let i = 0 ; i < form.image.length; i++){
             formData.append("image",form.image[i])
         }       
         const response = await API.patch("/trip/"+params.id,formData,config)
         console.log(response.data)
         history.push("/trip")
     }catch(error){
         console.error();
     }
 }


   return(
    <div style={{ backgroundColor: "#E5E5E5"}}>
        <Navbar/>      
            <Container>
                <h2 className="title-home-addTrip-trip">Add Trip</h2>
                <form style={{marginLeft:"30px"}} onSubmit={add}>
                    <label className="label-addTrip">Title Trip</label><br></br>
                    <input type="text" className="input-addTrip" name="title" value={form.title} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Country</label><br></br>
                    <select name="country" className="input-addTrip-option" onChange={(e)=>handleChange(e)}>
                        <option value="1">New Zeland</option>
                        <option value="2">Japan</option>
                        <option value="3">South Korea</option>
                        <option value="4">Australia</option>
                        <option value="9">France</option>
                        <option value="10">Italy</option>
                        <option value="11">Spain</option>
                    </select>
                    <label className="label-addTrip">Accomodaion</label><br></br>
                    <input type="text" className="input-addTrip" name="accomodation" value={form.accomodation} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Transporation</label><br></br>
                    <input type="text" className="input-addTrip" name="transportation" value={form.transportation} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Eat</label><br></br>
                    <input type="text" className="input-addTrip" name="eat" value={form.eat} onChange={(e)=>handleChange(e)}></input>
                    <input type="text" className="day-night" name="day" value={form.day} onChange={(e)=>handleChange(e)}></input><span className="d-n">Day</span>
                    <input type="text" className="day-night" name="night" value={form.night} onChange={(e)=>handleChange(e)}></input><span className="d-n">Night</span><br></br>
                    <label className="label-addTrip">Date Trip</label><br></br>
                    <input type="date" className="input-addTrip" name="dateTrip" value={form.dateTrip} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Price</label><br></br>
                    <input type="text" className="input-addTrip" name="price" value={form.price} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Quota</label><br></br>
                    <input type="text" className="input-addTrip" name="quota" value={form.quota} onChange={(e)=>handleChange(e)}></input>
                    <label className="label-addTrip">Description</label><br></br>
                    <textarea className="input-addTrip-description" name="description" value={form.description} onChange={(e)=>handleChange(e)}></textarea>
                    <label className="label-addTrip">Image</label><br></br>
                    <input type="file" onChange={handleChange} name="image" multiple></input>
                    <div className="display-center">
                        <button className="button-trp"><p className="isi-button-trp">Continue Trip</p></button>
                    </div>
                </form>
            </Container>
        <Footer/>
    </div>
)

}

export default Edit;