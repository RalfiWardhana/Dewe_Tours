import "./photoProfile.css"
import React, { Fragment, useState,useContext,useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {BrowserRouter,Route,Link} from "react-router-dom";
import Context, { CartContext } from '../cartContext';
import { useHistory } from 'react-router';
import { API,setAuthToken } from "../config/api";



const LogoProfile = () =>{
    const history = useHistory();
    const {isLogin, setLogin} = useContext(CartContext);
    const[biodata,setBiodata] =useState([])

      const logout = ()=>{
          localStorage.removeItem("token")
          localStorage.removeItem("isAdmin")
          localStorage.removeItem("email")
          setLogin({islog:false,email:localStorage.getItem('email'),idTrip:null,isadmin:false,isAuth:localStorage.getItem('token') ? true : false});
          console.log("pppp")
          history.push("/")
      }
    
    const [dropdownNotif, setDropdownNotif] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggle = () => setDropdownOpen(prevState => !prevState);
   const toggleNotif = () => setDropdownNotif(prevState => !prevState);

   const getHistory = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const biodata = await API.get("/users")
            setBiodata(biodata.data.data)        
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getHistory()
    },[])

    if(isLogin.isadmin==false){
        return (
            <>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-profile">
                        <DropdownToggle caret className="dropdown-toggle"> 
                        </DropdownToggle>
                        {biodata.filter((user)=>user.email == localStorage.getItem('email')).map((bio)=>(
                            <img className="photo-logo-top" src ={bio.photo} onClick={toggle}></img>
                        ))}
                        <DropdownMenu style={{marginTop:"20px"}}>
                            <div className="flex-dropdown">
                                <div><img src="/dropProfile.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/profiles" className="desc-dropdown">Profile</Link></div>
                            </div>
                            <div className="flex-dropdown">
                                <div><img src="/dropPay.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/payments" className="desc-dropdown">Pay</Link></div>
                            </div>
                            <DropdownItem divider />
                            <div className="flex-dropdown">
                                <div><img src="/dropLogout.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown" onClick={logout}>Logout</div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
            </>
        )
    }
    else if(isLogin.isadmin == true){
        return (
            <div>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-profile"> 
                        <DropdownToggle caret className="dropdown-toggle"> 
                        </DropdownToggle>   
                        <img className="photo-logo-top-admin" src ="/iconAdmin.png" onClick={toggle}></img>
                        <DropdownMenu style={{marginTop:"20px"}}>
                            <div className="flex-dropdown">
                                <div><img src="/tripAdmin.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/trip" className="desc-dropdown">Trip</Link></div>
                            </div>
                            <DropdownItem divider />
                            <div className="flex-dropdown">
                                <div><img src="/dropLogout.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown" onClick={logout}>Logout</div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
            </div>
        )
    }

}

export default LogoProfile;