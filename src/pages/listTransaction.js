import React,{useState} from "react";
import "../styles/transaction.css"
import "../styles/payment.css"
import Navbar from "../components/navbar";
import { Container, Row, Col, ListGroup, InputGroup } from 'reactstrap';
import Footer from "../components/footer";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Table } from 'reactstrap';
import { useHistory } from 'react-router';

function Transaction(){
    const [modalList, setModalList] = useState(false);
    // const[statusPay, setStatusPay] = useState("Waiting Approvement");
    // const[action,setAction] = useState("waitingApprovement");
    const[put , setPut] = useState({id: null,title:null,trip:null,username:null,phone:null,status:null,qty:null,total:null})
    const history = useHistory();
     const toggleList = (r) => { 
        console.log(r) 
        var transactions = JSON.parse(localStorage.getItem("transaction"));
        for(var k = 0 ; k < transactions.length ; k++){
            if(transactions[k].id==r-1){
                setPut({
                id: transaction[k].id+1,    
                title : transactions[k].title,
                trip : transactions[k].trip,
                username : transactions[k].username,
                phone : transactions[k].phone,
                status:transactions[k].status,
                qty : transactions[k].qty,
                total : transactions[k].total
            })
            }
        }
        console.log(put)
        setModalList(!modalList);
    }

    const cancelAdmin=(s,name)=>{
        console.log(s)
        var transactions = JSON.parse(localStorage.getItem("transaction"));
        var userss = JSON.parse(localStorage.getItem("users"))
        for(var k = 0 ; k < transactions.length ; k++){
            if(transactions[k].id==s-1){
                transactions[k].status="Cancel"
                transactions[k].class="status-payment-cancel"
            }
        }

        localStorage.setItem("transaction",JSON.stringify(transactions)); 
        setModalList(!modalList);
        history.push("/transactions");  
    }
    const approveAdmin=(s)=>{
        console.log(s)
        var transactions = JSON.parse(localStorage.getItem("transaction"));
        for(var k = 0 ; k < transactions.length ; k++){
            if(transactions[k].id==s-1){
                transactions[k].status="Approve"
                transactions[k].class="status-payment-approve"
            }
        }
        localStorage.setItem("transaction",JSON.stringify(transactions));   
        setModalList(!modalList);
        history.push("/transactions"); 
    }     

    let transaction = JSON.parse(localStorage.getItem("transaction"));
    console.log(transaction)
    let i = 1;
    
    const conditionalButton = () => {
        if(put.status == "Waiting Approve"){
            return(
                <div className="flex-end-payment">      
                    <div className="flex-payment">
                        <div className="cancel-admin" onClick={()=>cancelAdmin(put.id,put.username)}><span className="isi-cancel-admin">Cancel</span></div>      
                        <div className="approve-admin" onClick={()=>approveAdmin(put.id)} ><span className="isi-approve-admin">Approve</span></div>
                    </div>
                </div>
            )
        }
        else if((put.status == "Approve")||(put.status == "Cancel")){
            return(
                <div className="flex-end-payment">      
                    <div className="flex-payment">
                    </div>
                </div>
            )
        }
    }

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
                            {transaction.map((trans)=>(
                                <tr className="body-transaction">
                                    <th scope="row">{trans.id+1}</th>
                                    <td>{trans.username}</td>
                                    <td>{trans.trip}</td>
                                    <td>bca.jpg</td>
                                    <td className={trans.class}>{trans.status}</td>
                                    <td><img src="/search.png" onClick={()=>toggleList(trans.id+1)} style={{cursor:"pointer"}}></img></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    
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
                                          <div className="desc-payment">{put.title}</div>
                                      </div>
                                      <div className="flex-payment">
                                          <div className="desc-fill-payment">{put.trip}</div> 
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
                                          <div className="desc-fill-payment-two"><div className="waiting-payment-button"><span className="waiting-payment">{put.status}</span></div></div>
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
                                      <td className="table-payment">{put.username}</td>
                                      <td className="table-payment">Male</td>
                                      <td className="table-payment">{put.phone}</td>
                                      <td className="qty">Qty</td>
                                      <td className="qty">: {put.qty}</td>
                                      </tr>
                                  </tbody>
                                  <tbody>
                                      <tr>
                                      <th scope="row"></th>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td className="qty">Total</td>
                                      <td className="price-payment">: IDR {put.total}</td>
                                      </tr>
                                  </tbody>
                             </Table>
                             {conditionalButton()}
                            {/* <div className="flex-end-payment">      
                              <div className="flex-payment">
                                <div className="cancel-admin" onClick={()=>cancelAdmin(put.id,put.username)}><span className="isi-cancel-admin">Cancel</span></div>      
                                <div className="approve-admin" onClick={()=>approveAdmin(put.id)} ><span className="isi-approve-admin">Approve</span></div>
                              </div>
                          </div> */}
                        </Modal>
                    
                </Container>
            <Footer/>
        </div>    
    )
}

export default Transaction