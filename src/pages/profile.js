import React, { useContext } from 'react';
import Navbar from "../components/navbar";
import "../styles/profile.css"
import { Container, Row, Col } from 'reactstrap';
import Footer from "../components/footer";
import { Table } from 'reactstrap';
import Context, { CartContext } from '../cartContext';

function Profile() {
    const {isLogin, setLogin} = useContext(CartContext);
    let user = JSON.parse(localStorage.getItem("users"));
    let arrayProfile = []
    user.forEach((usr)=>{
        if(usr.email == isLogin.email){
            arrayProfile.push(usr)
        }
    })
    console.log(arrayProfile[0].trip)
   
    return (
      <div style={{ backgroundColor: "#E5E5E5"}}>  
        <Navbar/>
        <Container className="center-profile">
            <Row>
                <Col>
                    <div className="square-profile">
                        <div className="flex-between-payment">
                            <div>
                                <h3 className="personal-info">Personal Info</h3>
                                <div className="flex-profile">
                                    <img src="logoProfile.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{arrayProfile[0].username}</p>
                                        <p className="description-profile">fullname</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoPesan.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{arrayProfile[0].email}</p>
                                        <p className="description-profile">email</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoPhone.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{arrayProfile[0].phone}</p>
                                        <p className="description-profile">Mobile Phone</p>
                                    </div>
                                </div> 
                                <div className="flex-profile">
                                    <img src="logoLocation.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">Komplek KIG E3/18, Bekasi</p>
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
        </Container>
        <Container>
            <p className="history-profile">History</p>
            {arrayProfile[0].trip.map((list)=>(
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
                                        <div className="desc-payment">{list.title}</div>
                                    </div>
                                    <div className="flex-payment">
                                         <div className="desc-fill-payment">{list.location}</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-payment"></div>
                                        <div className="trip-payment">Date Trip</div>
                                        <div className="trip-payment">Duration</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-fill-payment"></div>
                                        <div className="trip-fill-payment">26 August 2020</div>
                                        <div className="trip-fill-payment">6 Day 4 Night</div>
                                    </div>
                                    <div className="flex-payment-marginTop">
                                        <div className="desc-payment-two"></div>
                                        <div className="trip-payment-two">Accomodation</div>
                                        <div className="trip-payment-two">Transportation</div>
                                    </div>
                                    <div className="flex-payment">
                                    <div className="trip-fill-payment-two"></div>
                                        <div className="trip-fill-payment-two">Hotels 4 Night</div>
                                        <div className="trip-fill-payment-two">Qatar Airways</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="desc-fill-payment-two"><div className="approve-payment-button"><span className="approve-payment">Approve</span></div></div>
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
                                    <td className="table-payment">{arrayProfile[0].username}</td>
                                    <td className="table-payment">Male</td>
                                    <td className="table-payment">{arrayProfile[0].phone}</td>
                                    <td className="qty">Qty</td>
                                    <td className="qty">{list.qty}</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="qty">Total</td>
                                    <td className="price-payment">: IDR {list.price} </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row> 
            ))}
            
        </Container>
        <Footer/>
      </div>
    )
  }
  
  export default Profile;