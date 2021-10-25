import "./photoProfile.css"
import React, { Fragment, useState,useContext } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {BrowserRouter,Route,Link} from "react-router-dom";
import Context, { CartContext } from '../cartContext';
import { useHistory } from 'react-router';



const LogoProfile = () =>{
    const history = useHistory();
    const {isLogin, setLogin} = useContext(CartContext);


      const logout = ()=>{
          setLogin({islog:false,isadmin:false});
          console.log("pppp")
          history.push("/")
      }
      
    const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggle = () => setDropdownOpen(prevState => !prevState);
    if(isLogin.isadmin==false){
        return (
            <>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-profile">
                        <DropdownToggle caret className="dropdown-toggle">
                        <img className="photo-logo-top" src ="/elips.png"></img>
                        </DropdownToggle>
                        <DropdownMenu>
                            <div className="flex-dropdown">
                                <div><img src="/dropProfile.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/profiles">Profile</Link></div>
                            </div>
                            <div className="flex-dropdown">
                                <div><img src="/dropPay.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/payments">Pay</Link></div>
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
            <>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-profile">
                        <DropdownToggle caret className="dropdown-toggle">
                        <img className="photo-logo-top" src ="/iconAdmin.png"></img>
                        </DropdownToggle>
                        <DropdownMenu>
                            <div className="flex-dropdown">
                                <div><img src="/tripAdmin.PNG" className="logo-dropdown"></img></div>
                                <div className="desc-dropdown"><Link to="/trip">Trip</Link></div>
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

}

export default LogoProfile;