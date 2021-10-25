import React, { useState,useContext } from 'react';
import Navbar from "../components/navbar";
import "../styles/detailTour.css"
import { Container, Row, Col } from 'reactstrap';
import Footer from "../components/footer";
import { useHistory } from 'react-router';
import {useParams} from "react-router-dom";
import DataTrip from "../detailTrip.json";
import Context, { CartContext } from '../cartContext';


function Detail() {
    const history = useHistory();
    const params = useParams()
    const {isLogin, setLogin} = useContext(CartContext);

    const[count, setCount] = useState(0)
    const plus = () => {
        setCount(count+1)
    }
    const minus = () => {
        if(count >0){
        setCount(count-1)
        }
    }

    
      const Change = ()=>{
        if(isLogin.islog == false ){
            history.push("/")
        } 
        else{ 
            let users = JSON.parse(localStorage.getItem("users"));
            users.forEach((usr)=>{
                if(isLogin.email == usr.email){
                    usr.trip.push({
                        title : DataTrip[params.id-1].title,
                        location : DataTrip[params.id-1].location,
                        qty: count,
                        price: parseInt(DataTrip[params.id-1].price) * count,
                    })
                    localStorage.setItem("users",JSON.stringify(users))           
                }
            })
            history.push("/payments")
          }
      }
   


  return (
    <div>
      <Navbar/>
      <div className="body-detail">
            <Container>
                  <Row>
                      <Col><h2 className="title">{DataTrip[params.id-1].title}</h2></Col>
                  </Row>
                  <Row>
                      <Col><p className="location-detail">{DataTrip[params.id-1].location}</p></Col>
                  </Row>
                  <Row style={{marginBottom:"50px"}}>
                      <Col><img src={`/${DataTrip[params.id-1].imageOne}`} width="98%" height="400px"></img></Col>
                  </Row>
                  <Row>
                      <Col><img src="/aus1.png"></img></Col>
                      <Col><img src="/aus2.png"></img></Col>
                      <Col><img src="/aus3.png"></img></Col>
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
                              <div><p className="details-list">Hotel 4 Night</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/aeroplane.PNG" height="70%" ></img></div>
                              <div><p className="details-list">Qatar Airways</p></div>
                          </div>
                      </Col>
                      <Col>
                           <div className="jcc">   
                              <div><img src="/eats.PNG" height="70%" ></img></div>
                              <div><p className="details-list">Included as itinerary</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/clock.PNG" height="70%"></img></div>
                              <div><p className="details-list">6 Days 4 Night</p></div>
                          </div>
                      </Col>
                      <Col>
                          <div className="jcc">
                              <div><img src="/date.PNG" height="70%"></img></div>
                              <div><p className="details-list">26 August 2020</p></div>
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
                          <Col className="price-detail">IDR {DataTrip[params.id-1].price}</Col><Col className="person-detail">/Person</Col>
                      </Row>
                      <Row>
                          <Col><img src="/positif.PNG" onClick={plus}></img></Col><Col className="person-detail">{count}</Col><Col><img src="/negatif.PNG" onClick={minus}></img></Col>
                      </Row>
                  </div>
                  <div className="flex-border">
                      <Row>
                          <Col className="person-detail">Total :</Col>
                      </Row>
                      <Row>
                          <Col className="price-detail">IDR { parseInt(DataTrip[params.id-1].price) * count}</Col>
                      </Row>
                  </div>
                  <div className="flex-end">
                      <button className="button-book" onClick={Change}>Book Now</button>
                  </div>
            </Container>
    </div>   
      <Footer/>
</div>
  )
}

export default Detail;