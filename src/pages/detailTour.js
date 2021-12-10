import React, { useState,useContext,useEffect } from 'react';
import Navbar from "../components/navbar";
import "../styles/detailTour.css"
import { Container, Row, Col } from 'reactstrap';
import Footer from "../components/footer";
import { useHistory } from 'react-router';
import {useParams} from "react-router-dom";
import DataTrip from "../detailTrip.json";
import Context, { CartContext } from '../cartContext';
import { API,setAuthToken } from "../config/api";


function Detail() {
    const history = useHistory();
    const params = useParams()
    const {isLogin, setLogin} = useContext(CartContext);
    console.log(isLogin)
    const emailStay = isLogin.email
   
    
    const[count, setCount] = useState(0)
    const plus = (quot,fill) => {
        let sisa = quot - fill
        if(count < sisa){
            setCount(count+1)
        }
        else{
            setCount(count)
        }
       
    }
    const minus = () => {
        if(count >0){
        setCount(count-1)
        }
    }
  
      const[trip,setTrip] =useState([])
      const [messages, setMessage] = useState([]); 
    
      const getTrip = async() => {
          try {
              const token = localStorage.getItem("token");
              setAuthToken(token)
              const response = await API.get("/trip/"+params.id)
              const responseTransaction = await API.get("/transaction")
              setTrip(response.data.data)
              setMessage(responseTransaction.data.data)
          } catch (error) {
              console.log(error)
          }
      }
      useEffect(()=>{
          getTrip()
      },[])
      console.log(trip)
      
      const arrayUser = []
      const Change = async ()=>{
        if(isLogin.isAuth == false ){
            history.push("/")
        } 
        else{ 
            try{
                const token = localStorage.getItem("token");
                setAuthToken(token)
                const config ={
                    headers:{
                        "Content-Type" : "application/json"
                    }
                }
                const payment= { 
                        counterQty : 0,
                        total: trip[0].price*count ,
                        status: "Waiting payment",
                        attachment:"",
                        idTrip:params.id 
                }     
                const body = JSON.stringify(payment)
            
                const response = await API.post("/transaction",body,config)
                const users = await API.get("/users")

                for(let i = 0 ; i < users.data.data.length ; i++){
                    if(users.data.data[i].email == isLogin.email){
                        arrayUser.push(users.data.data[i])
                    }
                }
               
                setLogin({islog:true, email:emailStay, idTrip:params.id ,idTransaction:response.data.data.id, qty:count, total:trip[0].price*count, name:arrayUser[0].fullname, phone:arrayUser[0].phone, address:arrayUser[0].address, isadmin:false,isAuth:isLogin.isAuth})
                if(response.status == 200){
                    history.push("/payments")
                    console.log(isLogin)
                }
            }catch(error){
                console.log(error)
                }
          }
      }
      const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }
  

  return (
    <div>
      <Navbar/>
      <div className="body-detail">
      {trip.map((trp)=>(
            <Container>
                  <Row>
                      <Col><h2 className="title">{trp.title}</h2></Col>
                  </Row>
                  <Row>
                      <Col><p className="location-detail">{trp.country.name}</p></Col>
                  </Row>
                  <Row style={{marginBottom:"50px"}}>
                      <Col><img src={trp.image[3]} width="98%" height="400px"></img></Col>
                  </Row>
                  <Row>
                      <Col><img src={trp.image[0]} width="330px" height="170px"></img></Col>
                      <Col><img src={trp.image[1]} width="330px" height="170px"></img></Col>
                      <Col><img src={trp.image[2]} width="330px" height="170px"></img></Col>
                  </Row>
                  <Row>
                      <Col><p className="info-trip">Information Trip</p></Col>
                  </Row>
                  <Row>
                      <Col className="details">Accomodation</Col>
                      <Col className="details">Transportation</Col>
                      <Col className="details">Eat</Col>
                      <Col className="details">Duration</Col>
                      <Col className="details">Date Trip</Col>
                  </Row>
                  <Row>
                      <Col>
                          <div className="jcc">
                              <div><img src="/hotel.PNG" height="70%" ></img></div>
                              <div><p className="details-list">{trp.accomodation}</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/aeroplane.PNG" height="70%" ></img></div>
                              <div><p className="details-list">{trp.transportation}</p></div>
                          </div>
                      </Col>
                      <Col>
                           <div className="jcc">   
                              <div><img src="/eats.PNG" height="70%" ></img></div>
                              <div><p className="details-list">{trp.eat}</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/clock.PNG" height="70%"></img></div>
                              <div><p className="details-list">{trp.day} Days {trp.night} Night</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/date.PNG" height="70%"></img></div>
                              <div><p className="details-list">{trp.dateTrip}</p></div>
                          </div>
                      </Col>      
                  </Row>
                  <Row>
                      <Col><p className="info-trip">Description</p></Col>
                  </Row>
                  <Row>
                      <Col><p className="details">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p></Col>
                  </Row>
                  <div className="flex-detail">
                      <Row style={{width:"365px"}}>
                          <Col className="price-detail">IDR {rupiahFormat(trp.price)}</Col><Col className="person-detail">/Person</Col>
                      </Row>
                      <Row>
                          <Col><img src="/negatif.PNG" onClick={minus}></img></Col><Col className="person-detail">{count}</Col><Col><img src="/positif.PNG" onClick={()=>plus(trp.quota,trp.filledQuota)}></img></Col>
                      </Row>
                  </div>
                  {isLogin.isadmin == false ? (  
                  <>    
                  <div className="flex-border">
                      <Row>
                          <Col className="person-detail">Total :</Col>
                      </Row>
                      <Row>
                          <Col className="price-detail">IDR {rupiahFormat(trp.price * count)}</Col>
                      </Row>
                  </div>
                  <div className="flex-end">
                       <button className="button-book" onClick={Change}>Book Now</button>
                  </div>
                  </>):<div style={{paddingBottom:"30px"}}></div>} 
                  
            </Container>
      ))}
    </div>   
      <Footer/>
</div>
  )
}

export default Detail;