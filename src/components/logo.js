import React, {useContext} from "react";
import "./logo.css"
import Logo from "../photo/logo.png"
import Elips from "../photo/bawah logo.png"
import Summer from "../photo/summer.png"
import { useHistory } from 'react-router';
import Context, { CartContext } from '../cartContext';


const Logos = () =>{
    const {isLogin, setLogin} = useContext(CartContext);
    const history = useHistory();
    const home = () => {
        if((isLogin.isadmin == false)||(isLogin.islog==false)){
            history.push("/")
        }
        else{
           history.push("/transactions") 
        }
        
    }
    return (
        <>
           <img className="logo" src ="/dt.png" onClick={home}></img>
           {/* <img className="logo" src ={Logo} onClick={home}></img>
           <img className="elips" src ={Elips} ></img>
           <img className="summer" src ={Summer} ></img>  */}
        </>
    )
}

export default Logos;