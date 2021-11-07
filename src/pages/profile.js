import React, { useContext,useEffect,useState } from 'react';
import Navbar from "../components/navbar";
import "../styles/profile.css"
import { Container, Row, Col } from 'reactstrap';
import Footer from "../components/footer";
import { Table } from 'reactstrap';
import Context, { CartContext } from '../cartContext';
import { API,setAuthToken } from "../config/api";


function Profile() {
    const {isLogin, setLogin} = useContext(CartContext);
    const[histories,setHistories] =useState([])
    const[biodata,setBiodata] =useState([])
    console.log(isLogin);
    const arrayHistory = []
    const getHistory = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const biodata = await API.get("/users")
            const response = await API.get("/transaction")
            setBiodata(biodata.data.data)      
            setHistories(response.data.data)    
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getHistory()
    },[])
    console.log(biodata)
    console.log(histories)

    const button = (aidi) =>{
        if(aidi == "Approve"){
            return "approve-payment-button"
        }
        else if(aidi == "Waiting Approve"){
            return "waiting-approve-buttonn"
        }
        else if(aidi == "Cancel"){
            return "cancel-payment-button"
        }
    }
    const color = (aidi) =>{
        if(aidi == "Approve"){
            return "approve-payment"
        }
        else if(aidi == "Waiting Approve"){
            return "waiting-approve"
        }
        else if(aidi == "Cancel"){
            return "waiting-payment"
        }
    }
   
    return (
      <div style={{ backgroundColor: "#E5E5E5"}}>  
        <Navbar/>
        <div>
        <Container className="center-profile">
        {biodata.filter((user)=>user.email == isLogin.email).map((bio)=>(
            <Row>
                <Col>
                    <div className="square-profile">
                        <div className="flex-between-payment">
                            <div>
                                <h3 className="personal-info">Personal Info</h3>
                                <div className="flex-profile">
                                    <img src="logoProfile.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{bio.fullname}</p>
                                        <p className="description-profile">fullname</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoPesan.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{bio.email}</p>
                                        <p className="description-profile">email</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoPhone.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{bio.phone}</p>
                                        <p className="description-profile">Mobile Phone</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoLocation.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{bio.address}</p>
                                        <p className="description-profile">Address</p>
                                    </div>
                                </div> 
                            </div>
                            <img src="zyan.PNG" className="zyan"></img>
                        </div>
                        <div className="flex-end-payment">
                            <button className="button-changeprofile">Change Photoprofile</button>
                        </div>
                    </div>
                </Col>
            </Row>
          ))}
        </Container>
        <Container>
            <p className="history-profile">History</p>
            {histories.filter((user)=>user.user.email == isLogin.email).map((htr)=>(
                <Row>
                    <Col>
                        <div className="square-payment">
                            <div className="flex-between-payment">
                                <div><img src="deweTours.png" className="dewe-payment"></img></div>
                                <div className="booking-payment">Booking</div>
                            </div>
                            <div className="flex-end-payment">
                                <p className="date-payment">Saturday, 22 July 2020</p>
                            </div>
                            <div className="flex-between-payment">
                                <div>
                                    <div className="flex-payment">
                                        <div className="desc-payment">{htr.trip.title}</div>
                                    </div>
                                    <div className="flex-payment">
                                         <div className="desc-fill-payment">france</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-payment"></div>
                                        <div className="trip-payment">Date Trip</div>
                                        <div className="trip-payment">Duration</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-fill-payment"></div>
                                        <div className="trip-fill-payment">{htr.trip.dateTrip}</div>
                                        <div className="trip-fill-payment">{htr.trip.day} Day {htr.trip.night} Night</div>
                                    </div>
                                    <div className="flex-payment-marginTop">
                                        <div className="desc-payment-two"></div>
                                        <div className="trip-payment-two">Accomodation</div>
                                        <div className="trip-payment-two">Transportation</div>
                                    </div>
                                    <div className="flex-payment">
                                    <div className="trip-fill-payment-two"></div>
                                        <div className="trip-fill-payment-two">{htr.trip.accomodation}</div>
                                        <div className="trip-fill-payment-two">{htr.trip.transportation}</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="desc-fill-payment-two"><div className={button(htr.status)}><span className={color(htr.status)}>{htr.status}</span></div></div>
                                    </div>
                                </div>
                                <div><img src="barcode.PNG" className="bukti-payment"></img></div>
                            </div>
                            <Table style={{marginTop:"20px"}}>
                                <tbody>
                                    <tr>
                                    <th>No</th>
                                    <th>Fullname</th>
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <th scope="row" className="table-payment">1</th>
                                    <td className="table-payment">{htr.user.fullname}</td>
                                    <td className="table-payment">Male</td>
                                    <td className="table-payment">{htr.user.phone}</td>
                                    <td className="qty">Qty</td>
                                    <td className="qty">{htr.counterQty}</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="qty">Total</td>
                                    <td className="price-payment">: IDR {htr.total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row> 
          ))} 
        </Container>
        </div> 
        <Footer/>
      </div>
    )
  }
  
  export default Profile;