import React,{useState,useEffect} from "react";
import "../styles/transaction.css"
import "../styles/payment.css"
import Navbar from "../components/navbar";
import { Container, Row, Col, ListGroup, InputGroup } from 'reactstrap';
import Footer from "../components/footer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';
import { useHistory } from 'react-router';
import { API,setAuthToken } from "../config/api";

function Transaction(){
    const [modalList, setModalList] = useState(false);
    const[put , setPut] = useState({id: null,title:null,trip:null,username:null,phone:null,status:null,qty:null,total:null})
    const history = useHistory();
    const[list, setList]= useState([])
    const[detail,setDetail]=useState([])
    const[test,setTest] = useState(false)
    const[cancel,setCancel]=useState([])
    const [countries, setCountries] = useState([]);

     const toggleList = async (aidi) => { 
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token) 
            const responseDetail = await API.get("/transaction/"+aidi)
            console.log(responseDetail.data.data)
            setDetail(responseDetail.data.data)  

            setTest(true)
            
        } catch (error) {
            console.log(error)
        }
        setModalList(!modalList); 
     }

     const getHistory = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const response = await API.get("/transaction")
            const responseCountry = await API.get("/country")  
            setList(response.data.data) 
            setCountries(responseCountry.data.data)    
        } catch (error) {
            console.log(error)
        }
    }
    const handleStatus = (status) => {
        if(status=="Approve"){
            return "status-payment-approve"
        }
        else if(status=="Waiting Approve"){
            return "status-payment-pending"
        }
        else if((status=="Waiting payment")||(status=="Cancel")){
            return "status-payment-cancel"
        }
    }

    const handleApprove = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("status","Approve")
            const responseUpdate = await API.patch("/transaction/"+aidi,formData,config)

            const response = await API.get("/transaction")
            setList(response.data.data)
          
        } catch (error) {
            console.log(error)
        }
        setModalList(!modalList); 
    }

    const handleCancel = async (aidi,total,price,idTripp) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("status","Cancel")
            formData.set("counterQty","0")
            const responseUpdate = await API.patch("/transaction/"+aidi,formData,config)
            
            const getTrip= await API.get(`/trip/${idTripp}`)
            console.log(getTrip.data.data[0]);

            let startFill = parseInt(getTrip.data.data[0].filledQuota)
            let lastFill = startFill - (total/price)
            console.log(lastFill)

            const formDatas = new FormData()
            formDatas.set("filledQuota", lastFill);
            const responseTrip = await API.patch(`/trip/${idTripp}`,formDatas,config)
            console.log(responseTrip.data.data)

            const response = await API.get("/transaction")
            setList(response.data.data)
          
        } catch (error) {
            console.log(error)
        }
        setModalList(!modalList); 
    }



    useEffect(()=>{
        getHistory()
        toggleList()
    },[])
    let i = 1
    console.log(list)
    console.log(detail)
    
    const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }
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
        else if(aidi == "Waiting payment"){
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
        else if(aidi == "Waiting payment"){
            return "waiting-payment"
        }
    }
    const getCountry = (aidi) => {
        for(let i = 0 ; i < countries.length ; i++){
            if(countries[i].id == aidi){
                return countries[i].name
            }
        }
    }
    if(test == false){
        return(
            <div>
                <Navbar/>
                    <Container>
                        <p className="title-transaction">Incoming Transaction</p>
                        <Table striped>
                            <thead>
                                <tr className="header-transaction">
                                    <th>No</th>
                                    <th>Users</th>
                                    <th>Trips</th>
                                    <th>Bukti Transfer</th>
                                    <th>Status Payment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            <tbody> 
                            {list.map((lst)=>(       
                                    <tr className="body-transaction">
                                        <th scope="row">{i++}</th>
                                        <td>{lst.user.fullname}</td>
                                        <td>{lst.trip.title}</td>
                                        <td><a href={lst.attachment} target="_blank">{lst.attachment}</a></td>
                                        <td className={handleStatus(lst.status)}>{lst.status}</td>
                                        <td><img src="/search.png" style={{cursor:"pointer"}} onClick={()=>toggleList(lst.id)}></img></td>
                                    </tr>
                              ))}       
                          </tbody>              
                        </Table>
                    </Container>
                <Footer/>
            </div>    
        )    
    }
    else if(test == true){
    return(
        <div>
            <Navbar/>
                <Container>
                    <p className="title-transaction">Incoming Transaction</p>
                    <Table striped>
                        <thead>
                            <tr className="header-transaction">
                                <th>No</th>
                                <th>Users</th>
                                <th>Trips</th>
                                <th>Bukti Transfer</th>
                                <th>Status Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody> 
                        {list.map((lst)=>(       
                                <tr className="body-transaction">
                                    <th scope="row">{i++}</th>
                                    <td>{lst.user.fullname}</td>
                                    <td>{lst.trip.title}</td>
                                    <td><a href={lst.attachment} target="_blank">{lst.attachment}</a></td>
                                    <td className={handleStatus(lst.status)}>{lst.status}</td>
                                    <td><img src="/search.png" style={{cursor:"pointer"}} onClick={()=>toggleList(lst.id)}></img></td>
                                </tr>
                          ))}       
                        </tbody>
                       
                    </Table>
                    {detail.map((dtl)=>(
                        <Modal size="lg" style={{maxWidth: '1000px', width: '100%'}}  isOpen={modalList} toggle={()=>toggleList()}>
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
                                          <div className="desc-payment">{dtl.trip.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{getCountry(dtl.trip.idCountry)}</div> 
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-payment"></div>  
                                          <div className="trip-payment">Date Trip</div>
                                          <div className="trip-payment-second">Duration</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="trip-fill-payment"></div>
                                          <div className="trip-fill-payment">{dtl.trip.dateTrip}</div>
                                          <div className="trip-fill-payment-second-modal">{dtl.trip.day} Day {dtl.trip.night} Night</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment-two"><div className={button(dtl.status)}><span className={color(dtl.status)}>{dtl.status}</span></div></div>
                                      </div>
                                      <div className="flex-payment-marginTop">
                                          <div className="desc-payment-two"></div>
                                          <div className="trip-payment-two">Accomodation</div>
                                          <div className="trip-payment-two">Transportation</div>
                                      </div>
                                      <div className="flex-payment">
                                      <div className="trip-fill-payment-two"></div>
                                          <div className="trip-fill-payment-two">{dtl.trip.accomodation}</div>
                                          <div className="trip-fill-payment-second-modal">{dtl.trip.transportation}</div>
                                      </div>
                                  </div>
                                  {dtl.status == "Waiting payment" ? (
                                  null
                                  ):
                                  <div>
                                    <img src={dtl.attachment} className="bukti-payment"></img>
                                    <p className="upload-proof" >upload payment proof</p>
                                  </div>}       
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
                                      <td className="table-payment">{dtl.user.fullname}</td>
                                      <td className="table-payment">{dtl.user.address}</td>
                                      <td className="table-payment">{dtl.user.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {dtl.total/dtl.trip.price}</td>
                                      </tr>
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {rupiahFormat(dtl.total)}</td>
                                      </tr>
                                  </tbody>
                             </Table>
                            
                              <div className="flex-end-payment"> 
                              {dtl.status == "Waiting Approve" ? (    
                                <div className="flex-payment">
                                <div className="cancel-admin"><span className="isi-cancel-admin" onClick={()=>handleCancel(dtl.id,dtl.total,dtl.trip.price,dtl.trip.id)}>Cancel</span></div>      
                                  <div className="approve-admin" ><span className="isi-approve-admin" onClick={()=>handleApprove(dtl.id)}>Approve</span></div>
                                </div>
                                ):null}
                             </div>
                            
                        </Modal>  
                    ))}
                </Container>
            <Footer/>
        </div>    
    )
  }
}

export default Transaction