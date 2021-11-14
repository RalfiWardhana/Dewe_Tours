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
    const [transactions, setTransactions] = useState([]);
    const [transac, setTransac] = useState([]);
    const [countries, setCountries] = useState([]);
    const handleChange = (e) => {
        setForm(e.target.files[0]);
    }
     
    const closeToggle = () =>{
        setModal(!modal);
    }


    const getTransactions = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const response = await API.get("/transaction")
            const responseCountry = await API.get("/country")  
            setTransactions(response.data.data) 
            setCountries(responseCountry.data.data)    
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getTransactions()
    },[])   
    console.log(transactions)

    const getCountry = (aidi) => {
        for(let i = 0 ; i < countries.length ; i++){
            if(countries[i].id == aidi){
                return countries[i].name
            }
        }
    }

    const pay = async(aidi,total,price,aidiTrip) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("attachment", form);
            formData.set("status","Waiting Approve")
            formData.set("counterQty",total/price)
            const response = await API.patch(`/transaction/${aidi}`,formData,config)

            const applyTransaction = await API.get(`/transaction/${aidi}`)

            const getTrip= await API.get(`/trip/${aidiTrip}`)

            let startFill = parseInt(getTrip.data.data[0].filledQuota)
            let lastFill = startFill + (total/price)

            const formDatas = new FormData()
            formDatas.set("filledQuota", lastFill);
            const responseTrip = await API.patch(`/trip/${aidiTrip}`,formDatas,config)

            setTransac(applyTransaction.data.data[0])
            setLogin({islog:true, email:isLogin.email, idTrip:isLogin.idTrip ,idTransaction:isLogin.idTransaction, qty:isLogin.qty, total:isLogin.total, name:isLogin.name, phone:isLogin.phone, isadmin:false, photo:applyTransaction.data.data[0].attachment,isAuth:isLogin.isAuth})
            setApprove(true);
            setModal(!modal);
            
            history.push("/payments")
        } catch (error) {
            console.log(error)
        }   
    }
      const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }

    if(payApprove == false){
        return (
            <div>
              <Navbar/>
              <Container>
              {transactions.filter((statusUser)=>(statusUser.status=="Waiting payment")&&(statusUser.user.email == isLogin.email)).length == 0 ? (   
                 <div className="square-payment"><img src="nodata.jpg" style={{marginLeft:"170px"}}></img></div>):  
              transactions.filter((statusUser)=>(statusUser.status=="Waiting payment")&&(statusUser.user.email == isLogin.email)).reverse().map((trans)=>(
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
                                          <div className="desc-payment">{trans.trip.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{getCountry(trans.trip.idCountry)}</div> 
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-payment"></div>  
                                          <div className="trip-payment">Date Trip</div>
                                          <div className="trip-payment-second">Duration</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment"></div>
                                          <div className="trip-fill-payment">{trans.trip.dateTrip}</div>
                                          <div className="trip-fill-payment-second">{trans.trip.day} Day {trans.trip.night} Night</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment-two"><div className="waiting-payment-button"><span className="waiting-payment">Waiting payment</span></div></div>
                                      </div>
                                      <div className="flex-payment-marginTop">
                                          <div className="desc-payment-two"></div>
                                          <div className="trip-payment-two">Accomodation</div>
                                          <div className="trip-payment-two">Transportation</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment-two"></div>
                                          <div className="trip-fill-payment-two">{trans.trip.accomodation}</div>
                                          <div className="trip-fill-payment-second">{trans.trip.transportation}</div>
                                      </div>
                                  </div>
                                  <form>
                                      <div style={{width:"170px",height:"35px", padding:"5px 5px 5px 7px", backgroundColor:"#FFAF00", marginLeft:"-220px",marginTop:"70px",borderRadius:"5px",cursor:"pointer"}}>
                                             <label style={{color:"white",cursor:"pointer"}}>
                                            <input type="file" onChange={handleChange} id="upload" name="attachment" style={{marginLeft:"0px",marginTop:"0px",display:"none"}}>
                                            </input>Upload Your Payemnt
                                            </label>
                                      </div>
                                </form>
                              </div>
                    
                              <Table style={{marginTop:"20px"}}>
                                  <tbody>
                                      <tr>
                                      <th>No</th>
                                      <th>Fullname</th>
                                      <th>Address</th>
                                      <th>Phone</th>
                                      <th></th>
                                      <th></th>
                                      </tr>
                                  </tbody>
                                  <tbody>               
                                      <tr>
                                      <th scope="row" className="table-payment">1</th>
                                      <td className="table-payment">{trans.user.fullname}</td>
                                      <td className="table-payment">{trans.user.address}</td>
                                      <td className="table-payment">{trans.user.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {trans.total/trans.trip.price}</td>
                                      </tr>  
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {rupiahFormat(trans.total)}</td>
                                      </tr>
                                  </tbody>
                              </Table>
                          </div>
                          <div className="flex-end-payment">
                              <button className="payment-success" onClick={()=>pay(trans.id,trans.total,trans.trip.price,trans.trip.id)}>Pay</button>
                          </div>         
                      </Col>
                  </Row>
                 ))}    
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
                              {/* {trip.map((trp)=>( */}
                              <div className="flex-between-payment">
                                  <div>
                                     <div className="flex-payment">
                                          <div className="desc-payment">{transac.trip.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{getCountry(transac.trip.idCountry)}</div> 
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-payment"></div>  
                                          <div className="trip-payment">Date Trip</div>
                                          <div className="trip-payment-second">Duration</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment"></div>
                                          <div className="trip-fill-payment">{transac.trip.dateTrip}</div>
                                          <div className="trip-fill-payment-second">{transac.trip.day} Day {transac.trip.night} Night</div>
                                      </div>
                                      <div className="flex-payment">
                                           <div className="desc-fill-payment-two"><div className="waiting-approve-buttonss"><span className="approve-paymentss">Waiting Approve</span></div></div>
                                      </div>
                                      <div className="flex-payment-marginTop">
                                          <div className="desc-payment-two"></div>
                                          <div className="trip-payment-two">Accomodation</div>
                                          <div className="trip-payment-two">Transportation</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment-two"></div>
                                          <div className="trip-fill-payment-two">{transac.trip.accomodation}</div>
                                          <div className="trip-fill-payment-second">{transac.trip.transportation}</div>
                                      </div>      
                                  </div>
                                  <div>
                                    <img src={isLogin.photo} alt="img payment" className="bukti-payment"></img>
                                    <p className="upload-proof">upload payment proof</p>
                                  </div>
                              </div>
                               {/* ))} */}
                              <Table style={{marginTop:"20px"}}>
                                  <tbody>
                                      <tr>
                                      <th>No</th>
                                      <th>Fullname</th>
                                      <th>Address</th>
                                      <th>Phone</th>
                                      <th></th>
                                      <th></th>
                                      </tr>
                                  </tbody>
                                  <tbody>
                                  
                                      <tr>
                                      <th scope="row" className="table-payment">1</th>
                                      <td className="table-payment">{transac.user.fullname}</td>
                                      <td className="table-payment">Bekasi Selatan</td>
                                      <td className="table-payment">{transac.user.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {transac.counterQty}</td>
                                      </tr>  
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {rupiahFormat(transac.total)}</td>
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