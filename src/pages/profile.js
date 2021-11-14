import React, { useContext,useEffect,useState } from 'react';
import Navbar from "../components/navbar";
import "../styles/profile.css"
import { Container, Row, Col,Modal } from 'reactstrap';
import Footer from "../components/footer";
import { Table } from 'reactstrap';
import Context, { CartContext } from '../cartContext';
import { API,setAuthToken } from "../config/api";


function Profile() {
    const {isLogin, setLogin} = useContext(CartContext);
    const[histories,setHistories] =useState([])
    const[biodata,setBiodata] =useState([])
    const[photo, setPhoto] = useState(null);
    const [modal, setModal] = useState(false);
    const [countries, setCountries] = useState([]);
    const toggle = () => setModal(!modal);
    
    const changePhoto = async (e) => {
        setPhoto(e.target.files[0]);
        toggle()
    }
    console.log(isLogin)
    const handleChangePhoto = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
    
            const formData = new FormData()
            formData.set("photo", photo);
            const responsePhoto = await API.patch(`/users/${aidi}`,formData,config)
            console.log(responsePhoto.data)

            const biodata = await API.get("/users")
            const response = await API.get("/transaction")
            setBiodata(biodata.data.data)      
            setHistories(response.data.data)
            toggle()
           
        } catch (error) {
            console.log(error)
        }
    }

    console.log(isLogin);
    const arrayHistory = []
    const getHistory = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const biodata = await API.get("/users")
            const response = await API.get("/transaction")
            const responseCountry = await API.get("/country")   
            setBiodata(biodata.data.data)      
            setHistories(response.data.data)    
            setCountries(responseCountry.data.data) 
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
        else if(aidi == "Waiting payment"){
            return "waiting-payment-button"
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
            return "cancel-payment"
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
    const rupiahFormat = (value) => {
        var	reverse = value.toString().split('').reverse().join(''),
        ribuan 	= reverse.match(/\d{1,3}/g);
        ribuan	= ribuan.join(',').split('').reverse().join('');
        return ribuan
    }
    const [stat,setStat] =useState("Approve")
    const [image,setImage] = useState("barcode.PNG")
    const getStatus = (status) => {
        if(status=="Approve"){
             setStat("Approve")
             setImage("barcode.PNG")
        }
        else if(status=="Waiting-Approve"){
            setStat("Waiting Approve")
            setImage("nobar.png")
        }
        else if(status=="Waiting-payment"){
             setStat("Waiting payment")
             setImage("nobar.png")
        }
        else if(status=="Cancel"){
             setStat("Cancel")
             setImage("nobar.png")
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
                                <div className="flex-profile-end">
                                    <img src="logoLocation.png" className="logo-profile"></img>
                                    <div>
                                        <p className="fill-profile">{bio.address}</p>
                                        <p className="description-profile">Address</p>
                                    </div>
                                </div> 
                            </div>
                            <img src={bio.photo} className="zyan"></img>
                        </div>
                        <div className="flex-end-payment">
                            <div className="flex-kolom">
                                <label className="button-changeprofile" ><input type="file" className="filePhoto" onChange={changePhoto}/>Change Photoprofile</label>
                            </div>
                        </div>
                        <Modal isOpen={modal}  className="modal-change">
                            <div className="modal-verif">
                                <div className="modal-keterangan">Are you sure change your Photo Profile ?</div>
                            </div>    
                            <div className="modal-title-center">
                                <button className="modal-buttons" onClick={()=>handleChangePhoto(bio.id)}>Submit PhotoProfile</button>
                                <button className="modal-buttons" onClick={()=>toggle()}>Cancel</button>
                            </div>        
                        </Modal>
                    </div>
                </Col>
            </Row>
          ))}
        </Container>
        <Container>
            <p className="history-profile">History</p>
            <div className="flex-status">
                <div className="flex-status-approve" onClick={()=>getStatus("Approve")}>Approve</div>
                <div className="flex-status-waiting-approve" onClick={()=>getStatus("Waiting-Approve")}>Waiting Approve</div>
                <div className="flex-status-waiting-payment" onClick={()=>getStatus("Waiting-payment")}>Waiting Payment</div>
                <div className="flex-status-cancel" onClick={()=>getStatus("Cancel")}>Cancel</div>
            </div>
            {histories.filter((user)=>(user.user.email == isLogin.email)&&(user.status == stat)).length == 0 ? (
             <div className="square-payment"><img src="nodata.jpg" style={{marginLeft:"170px"}}></img></div>): 
            histories.filter((user)=>(user.user.email == isLogin.email)&&(user.status == stat)).map((htr)=>(
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
                                         <div className="desc-fill-payment">{getCountry(htr.trip.idCountry)}</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-payment"></div>
                                        <div className="trip-payment">Date Trip</div>
                                        <div className="trip-payment-second">Duration</div>
                                    </div>
                                    <div className="flex-payment">
                                        <div className="trip-fill-payment"></div>
                                        <div className="trip-fill-payment">{htr.trip.dateTrip}</div>
                                        <div className="trip-fill-payment-second">{htr.trip.day} Day {htr.trip.night} Night</div>
                                    </div>
                                    <div className="flex-payment">
                                         <div className="desc-fill-payment-two"><div className={button(htr.status)}><span className={color(htr.status)}>{htr.status}</span></div></div>
                                    </div>
                                    <div className="flex-payment-marginTop">
                                        <div className="desc-payment-two"></div>
                                        <div className="trip-payment-two">Accomodation</div>
                                        <div className="trip-payment-two">Transportation</div>
                                    </div>
                                    <div className="flex-payment">
                                    <div className="trip-fill-payment-two"></div>
                                        <div className="trip-fill-payment-two">{htr.trip.accomodation}</div>
                                        <div className="trip-fill-payment-second">{htr.trip.transportation}</div>
                                    </div>
                                </div>
                                <div><img src={image} className="bukti-payment"></img></div>
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
                                    <td className="table-payment">{htr.user.fullname}</td>
                                    <td className="table-payment">{htr.user.address}</td>
                                    <td className="table-payment">{htr.user.phone}</td>
                                    <td className="qty">Qty</td>
                                    <td className="qty">{htr.total/htr.trip.price}</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="qty">Total</td>
                                    <td className="price-payment">: IDR {rupiahFormat(htr.total)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>))
        }
        </Container>
        </div> 
        <Footer/>
      </div>
    )
  }
  
  export default Profile;