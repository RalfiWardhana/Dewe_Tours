import React, { useState,useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./button.css";
import { useHistory } from 'react-router';
import PhotoProfile from "./photoProfile"
import Context, { CartContext } from '../cartContext';
import{API} from "../config/api"


const ModalExamples = () =>{
      const {isLogin, setLogin} = useContext(CartContext);
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);

      const [modals, setModals] = useState(false);
    
      const toggles = () => setModals(!modals);
      const login = false

      const history = useHistory();
      const logIn = () => {
          history.push("/profiles")
      }

      const[form,setForm]= useState({
        fullname:"",
        email:"",
        password:"",
        phone:"",
        address:"",
       })
      const handleChange = (e) => {
        setForm({...form,[e.target.name]:e.target.value})
      }

      const[formLogin, setFromLogin] = useState({
          emailLogin:"",
          passwordLogin:""
      })
 
      const handleChangeLogin = (e) => {
          setFromLogin({...formLogin,[e.target.name]:e.target.value})
      }    
             
      const logins = async () =>{
        try{
            const config ={
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            if((formLogin.emailLogin == "") && (formLogin.passwordLogin == "")){
                history.push("/")
                toggle()
            }
            else{
                const body = JSON.stringify(formLogin)
                console.log(body)
                const response = await API.post("/login",body,config)
                console.log(response)
                if(response.data.status == "success"){
                    if(response.data.data.status == "user"){
                        localStorage.setItem("email",formLogin.emailLogin)
                        localStorage.setItem("token",response.data.data.token)
                        setLogin({islog:true,email:localStorage.getItem('email'),isadmin:false,isAuth:localStorage.getItem('token') ? true : false});
                        history.push("/")
                    }
                    else if(response.data.data.status == "admin"){
                        localStorage.setItem("email",formLogin.emailLogin)
                        localStorage.setItem("token",response.data.data.token)
                        localStorage.setItem("isAdmin",response.data.data.status)
                        setLogin({islog:true,email:localStorage.getItem('email'),isadmin:true,isAuth:localStorage.getItem('token') ? true : false});
                        history.push("/transactions")
                        console.log(isLogin)
                    }
                
                }
            }
        }catch(error){
            console.log(error)
            }
        
      }

      const push = async() => {
        try{
            const config ={
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            if((form.email == "") && (form.password == "") && (form.phone == "") && (form.address == "") && (form.fullname=="")){
                history.push("/")
                toggles()
            }
            else{
                const body = JSON.stringify(form)
                console.log(config)
                const response = await API.post("/register",body,config)
                console.log(response)
                if(response.data.status == "success"){
                    history.push("/")
                    setModals(!modals)
                }
            }
        }catch(error){
            console.log(error)
            }
        
        }   

        const register = () => {
             toggles()
        }
    

    if(isLogin.isAuth==false){
        return (
            <>
               <button className="login" onClick={toggle}>Login</button>   
                <Modal isOpen={modal}  className="modal-login">
                <div className="login-title-center">
                    <div className="login-title">Login</div>
                </div>    
                <p className="login-email">Email</p>
                <div className="login-title-center">
                    <input className="login-email-input" name="emailLogin" value={formLogin.emailLogin} onChange={(e)=>handleChangeLogin(e)}></input>
                </div>
                <p className="login-password">Password</p>
                <div className="login-title-center">
                    <input type="password" className="login-password-input" name="passwordLogin" value={formLogin.passwordLogin} onChange={(e)=>handleChangeLogin(e)}></input>
                </div>
                <div className="login-title-center">
                    <button className="login-buttons" onClick={logins} >Login</button>
                </div>
                <div className="login-title-center">
                    <p className="login-register">Don't have an account ? <span style={{cursor:"pointer"}} onClick={()=>register()}>click Here</span></p>
                </div>          
                </Modal>
               
    
    
               <button className="register" onClick={toggles}>Register</button>
               <Modal isOpen={modals}  className="modal-login">
                <div className="login-title-center">
                    <div className="login-title">Register</div>
                </div>    
                <p className="login-email">Fullname</p>
                <div className="login-title-center">
                    <input className="login-email-input" name="fullname" value={form.fullname} onChange={(e)=>handleChange(e)}></input>
                </div>
                <p className="login-password">Email</p>
                <div className="login-title-center">
                    <input className="login-password-input" name="email"value={form.email} onChange={(e)=>handleChange(e)}></input>
                </div>
                <p className="login-password">Password</p>
                <div className="login-title-center">
                    <input type="password" className="login-password-input" name="password" value={form.password} onChange={(e)=>handleChange(e)}></input>
                </div>
                <p className="login-password">Phone</p>
                <div className="login-title-center">
                    <input className="login-password-input" name="phone" value={form.phone} onChange={(e)=>handleChange(e)}></input>
                </div>
                <p className="login-password">Address</p>
                <div className="login-title-center">
                    <input className="login-password-input" name="address" value={form.address} onChange={(e)=>handleChange(e)}></input>
                </div>
                <div className="login-title-center">
                    <button className="login-buttons" onClick={push}>Register</button>
                </div>
                </Modal>
    
            </>
        )
    }

        else if(isLogin.isAuth==true){
            return(
                <>
                <PhotoProfile/>
                </>
            )
        }
    
 
}

export default ModalExamples;

export const isAdmin = () => {
    if (localStorage.getItem('isAdmin')) return true;
    return false;
}