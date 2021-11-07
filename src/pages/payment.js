import React, { useState,useContext,useEffect } from 'react';
import Navbar from "../components/navbar";
import "../styles/payment.css"
import { Container, Row, Col,Modal } from 'reactstrap';
import Footer from "../components/footer";
import { Table } from 'reactstrap';
import Context, { CartContext } from '../cartContext';
import { useHistory } from 'react-router';
import { API,setAuthToken } from "../config/api";


function Payment() {
    const history = useHistory();
    const {isLogin, setLogin} = useContext(CartContext);
    const [payApprove,setApprove] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const handleChange = (e) => {
        setForm(e.target.files[0]);
    }

      
     
    const closeToggle = () =>{
        setModal(!modal);
    }
    const arrayTransaction = []
    const pay = async() => {
        try {
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("attachment", form);
            formData.set("status","Waiting Approve")

            const response = await API.patch(`/transaction/${isLogin.idTransaction}`,formData,config)
            const applyTransaction = await API.get(`/transaction/${isLogin.idTransaction}`)

            console.log(applyTransaction.data.data[0].attachment)
            setLogin({islog:true, email:isLogin.email, idTrip:isLogin.idTrip ,idTransaction:isLogin.idTransaction, qty:isLogin.qty, total:isLogin.total, name:isLogin.name, phone:isLogin.phone, isadmin:false, photo:applyTransaction.data.data[0].attachment})
            setApprove(true);
            setModal(!modal);
            
            history.push("/payments")
        } catch (error) {
            console.log(error)
        }
        
    }

    const[trip,setTrip] =useState([])
      const getPay = async() => {
          try {
              const token = localStorage.getItem("token");
              setAuthToken(token)
              const response = await API.get("/trip/"+isLogin.idTrip)
              setTrip(response.data.data)
          } catch (error) {
              console.log(error)
          }
      }
      useEffect(()=>{
          getPay()
      },[])


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
                              {trip.map((trp)=>(
                              <div className="flex-between-payment">
                                  <div>
                                     <div className="flex-payment">
                                          <div className="desc-payment">{trp.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{trp.country.name}</div> 
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-payment"></div>  
                                          <div className="trip-payment">Date Trip</div>
                                          <div className="trip-payment">Duration</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment"></div>
                                          <div className="trip-fill-payment">{trp.dateTrip}</div>
                                          <div className="trip-fill-payment">{trp.day} Day {trp.night} Night</div>
                                      </div>
                                      <div className="flex-payment-marginTop">
                                          <div className="desc-payment-two"></div>
                                          <div className="trip-payment-two">Accomodation</div>
                                          <div className="trip-payment-two">Transportation</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment-two"></div>
                                          <div className="trip-fill-payment-two">{trp.accomodation}</div>
                                          <div className="trip-fill-payment-two">{trp.transportation}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment-two"><div className="waiting-payment-button"><span className="waiting-payment">Waiting payment</span></div></div>
                                      </div>
                                  </div>
                                  <form><input type="file" onChange={handleChange} id="upload" name="attachment" style={{marginLeft:"80px",marginTop:"80px"}}></input></form>
                              </div>
                               ))}
                              {/* {arrayUser.map((usr)=>( */}
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
                                      <td className="table-payment">{isLogin.name}</td>
                                      <td className="table-payment">Male</td>
                                      <td className="table-payment">{isLogin.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {isLogin.qty}</td>
                                      </tr>  
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {isLogin.total}</td>
                                      </tr>
                                  </tbody>
                              </Table>
                              {/* ))} */}
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
                              {trip.map((trp)=>(
                              <div className="flex-between-payment">
                                  <div>
                                     <div className="flex-payment">
                                          <div className="desc-payment">{trp.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{trp.country.name}</div> 
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-payment"></div>  
                                          <div className="trip-payment">Date Trip</div>
                                          <div className="trip-payment">Duration</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment"></div>
                                          <div className="trip-fill-payment">{trp.dateTrip}</div>
                                          <div className="trip-fill-payment">{trp.day} Day {trp.night} Night</div>
                                      </div>
                                      <div className="flex-payment-marginTop">
                                          <div className="desc-payment-two"></div>
                                          <div className="trip-payment-two">Accomodation</div>
                                          <div className="trip-payment-two">Transportation</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment-two"></div>
                                          <div className="trip-fill-payment-two">{trp.accomodation}</div>
                                          <div className="trip-fill-payment-two">{trp.transportation}</div>
                                      </div>
                                      <div className="flex-payment">
                                      <div className="desc-fill-payment-two"><div className="waiting-approve-buttonss"><span className="approve-paymentss">Waiting Approve</span></div></div>
                                      </div>
                                  </div>
                                  <div>
                                    <img src={isLogin.photo} alt="img payment" className="bukti-payment"></img>
                                  </div>
                              </div>
                               ))}
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
                                      <td className="table-payment">{isLogin.name}</td>
                                      <td className="table-payment">Male</td>
                                      <td className="table-payment">{isLogin.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {isLogin.qty}</td>
                                      </tr>  
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {isLogin.total}</td>
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