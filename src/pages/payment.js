import React, { useState,useContext } from 'react';
import Navbar from "../components/navbar";
import "../styles/payment.css"
import { Container, Row, Col,Modal } from 'reactstrap';
import Footer from "../components/footer";
import { Table } from 'reactstrap';
import Context, { CartContext } from '../cartContext';
import { useHistory } from 'react-router';


function Payment() {
    const history = useHistory();
    const {isLogin, setLogin} = useContext(CartContext);
    const [payApprove,setApprove] = useState(false);
    const [modal, setModal] = useState(false);

    let payUser = JSON.parse(localStorage.getItem("users"));
    let arrayPay = []
    payUser.forEach((usr)=>{
        if(usr.email == isLogin.email){
            arrayPay.push(usr)
        }
    })
    console.log(isLogin.email)
    console.log(arrayPay[0].trip[arrayPay[0].trip.length-1])
    const closeToggle = () =>{
        setModal(!modal);
    }
    const pay = () => {
        setApprove(true);
        setModal(!modal);
        let transaction;
        if(localStorage.getItem("transaction") == null){
            transaction = [];
        }
        else{
            transaction= JSON.parse(localStorage.getItem("transaction"));
        } 

        transaction.push({
            id:transaction.length,
            username : arrayPay[0].username,
            phone: arrayPay[0].phone,
            title:arrayPay[0].trip[arrayPay[0].trip.length-1].title,
            trip: arrayPay[0].trip[arrayPay[0].trip.length-1].location,
            class:"status-payment-pending",
            status:"Waiting Approve",
            qty:arrayPay[0].trip[arrayPay[0].trip.length-1].qty,
            total:arrayPay[0].trip[arrayPay[0].trip.length-1].price
        })
        localStorage.setItem("transaction",JSON.stringify(transaction));
        history.push("/payments")
    }
    if(payApprove == false){
        return (
            <div>
              <Navbar/>
              <Container>
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
                                          <div className="desc-payment">{arrayPay[0].trip[arrayPay[0].trip.length-1].title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{arrayPay[0].trip[arrayPay[0].trip.length-1].location}</div> 
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
                                          <div className="desc-fill-payment-two"><div className="waiting-payment-button"><span className="waiting-payment">Waiting payment</span></div></div>
                                      </div>
                                  </div>
                                  <div><img src="bukti-payment.PNG" className="bukti-payment"></img></div>
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
                                      <td className="table-payment">{arrayPay[0].username}</td>
                                      <td className="table-payment">Male</td>
                                      <td className="table-payment">{arrayPay[0].phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {arrayPay[0].trip[arrayPay[0].trip.length-1].qty}</td>
                                      </tr>
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {arrayPay[0].trip[arrayPay[0].trip.length-1].price}</td>
                                      </tr>
                                  </tbody>
                              </Table>
                          </div>
                          <div className="flex-end-payment">
                              <button className="payment-success" onClick={pay}>Pay</button>
                          </div>
                      </Col>
                  </Row>
              </Container>
              <Footer/>
            </div>
          )
    }
    else if(payApprove==true){
        return (
            <div>
              <Navbar/>
              <Container>
                  <Modal size="lg" style={{maxWidth: '800px', width: '100%'}}  isOpen={modal}>
                    <div onClick={closeToggle} className="alert-success-pay">Your Payment Will be Confirmed within 1 x 24 Hours To see orders just waiting</div>         
                  </Modal>
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
                                          <div className="desc-payment">{arrayPay[0].trip[arrayPay[0].trip.length-1].title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{arrayPay[0].trip[arrayPay[0].trip.length-1].location}</div> 
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
                                          <div className="desc-fill-payment-two"><div className="waiting-approve-buttonss"><span className="approve-paymentss">Waiting Approve</span></div></div>
                                      </div>
                                  </div>
                                  <div><img src="bukti-payment.PNG" className="bukti-payment"></img></div>
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
                                      <td className="table-payment">{arrayPay[0].username}</td>
                                      <td className="table-payment">Male</td>
                                      <td className="table-payment">{arrayPay[0].phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {arrayPay[0].trip[arrayPay[0].trip.length-1].qty}</td>
                                      </tr>
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {arrayPay[0].trip[arrayPay[0].trip.length-1].price}</td>
                                      </tr>
                                  </tbody>
                              </Table>
                          </div>
                          <div className="flex-end-payment">
                          </div>
                      </Col>
                  </Row>
              </Container>
              <Footer/>
            </div>
          )
    }
    
  }
  
  export default Payment;