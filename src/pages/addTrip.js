import React, { useState,useContext } from 'react';
import Navbar from "../components/navbar";
import "../styles/addTrip.css"
import { Container, Row, Col } from 'reactstrap';
import Footer from "../components/footer";
import { useHistory } from 'react-router';

const addTrip = () => {
    return(
        <div style={{ backgroundColor: "#E5E5E5"}}>
            <Navbar/>      
                <Container>
                    <h2 className="title-home-addTrip-trip">Add Trip</h2>
                    <form style={{marginLeft:"30px"}}>
                        <label className="label-addTrip">Title Trip</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Country</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Accomodaion</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Transporation</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Eat</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <input type="text" className="day-night"></input><span className="d-n">Day</span>
                        <input type="text" className="day-night"></input><span className="d-n">Night</span><br></br>
                        <label className="label-addTrip">Date Trip</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Price</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Quota</label><br></br>
                        <input type="text" className="input-addTrip"></input>
                        <label className="label-addTrip">Description</label><br></br>
                        <textarea className="input-addTrip-description"></textarea>
                        <label className="label-addTrip">Image</label><br></br>
                        <input type="text" className="day-night"></input>
                        <div className="display-center">
                            <button className="button-trp"><p className="isi-button-trp">Add Trip</p></button>
                        </div>
                    </form>
                </Container>
            <Footer/>
        </div>
    )
}

export default addTrip