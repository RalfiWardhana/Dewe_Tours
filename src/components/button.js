import React, { useState,useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./button.css";
import { useHistory } from 'react-router';
import PhotoProfile from "./photoProfile"
import Context, { CartContext } from '../cartContext';



const ModalExamples = () =>{
      const {isLogin, setLogin} = useContext(CartContext);
             
      function logins(){
            
            
            let user = JSON.parse(localStorage.getItem("users"))
            if(user == undefined){
                setModal(!modal);  
                history.push("/") 
            }
            else{
                console.log(user)
                const email = document.getElementById("emailLogin").value;
                const password =document.getElementById("passwordLogin").value;
            
                user.forEach((usr)=>{
                    if((email == usr.email) && (password == usr.password)){
                        if((email == "admin@gmail.com") && (password == "123")){
                            setLogin({islog:true,email:email,password:password,isadmin:true});
                            console.log(isLogin)
                            history.push("/transactions")
                        }
                        else{
                            setLogin({islog:true,email:email,password:password,isadmin:false});
                            console.log(isLogin)
                            history.push("/profiles")
                        }                       
                    }
                    else{
                    setModal(!modal);  
                    history.push("/") 
                    }
                
                })
            }
                
      }
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);

      const [modals, setModals] = useState(false);
    
      const toggles = () => setModals(!modals);
      const login = false

      const history = useHistory();
      const logIn = () => {
          history.push("/profiles")
      }

      const push = () => {
        let users;
        if(localStorage.getItem("users") == null){
            users = [];
        }
        else{
            users = JSON.parse(localStorage.getItem("users"));
        }  
        if((document.getElementById("email").value == "")&&(document.getElementById("password").value=="")){
            setModals(!modals);
            history.push("/")
        }
        else{
        users.push({
            id:users.length,
            username : document.getElementById("username").value,
            email:document.getElementById("email").value,
            password:document.getElementById("password").value,
            phone:document.getElementById("phone").value,
            trip:[],
        })

            localStorage.setItem("users",JSON.stringify(users));        
            setModals(!modals)
            history.push("/")
        }   
    }


    if(isLogin.islog==false){
        return (
            <>
               <button className="login" onClick={toggle}>Login</button>   
                <Modal isOpen={modal}  className="modal-login">
                <div className="login-title-center">
                    <div className="login-title">Login</div>
                </div>    
                <p className="login-email">Email</p>
                <div className="login-title-center">
                    <input className="login-email-input" id="emailLogin"></input>
                </div>
                <p className="login-password">Password</p>
                <div className="login-title-center">
                    <input type="password" className="login-password-input" id="passwordLogin"></input>
                </div>
                <div className="login-title-center">
                    <button className="login-buttons" onClick={logins}>Login</button>
                </div>
                <div className="login-title-center">
                    <p className="login-register">Don't have an account ? click Here</p>
                </div>          
                </Modal>
               
    
    
               <button className="register" onClick={toggles}>Register</button>
               <Modal isOpen={modals}  className="modal-login">
                <div className="login-title-center">
                    <div className="login-title">Register</div>
                </div>    
                <p className="login-email">Fullname</p>
                <div className="login-title-center">
                    <input className="login-email-input" id="username"></input>
                </div>
                <p className="login-password">Email</p>
                <div className="login-title-center">
                    <input className="login-password-input" id="email"></input>
                </div>
                <p className="login-password">Password</p>
                <div className="login-title-center">
                    <input type="password" className="login-password-input" id="password"></input>
                </div>
                <p className="login-password">Phone</p>
                <div className="login-title-center">
                    <input className="login-password-input" id="phone"></input>
                </div>
                <div className="login-title-center">
                    <button className="login-buttons" onClick={push}>Register</button>
                </div>
                </Modal>
    
            </>
        )
    }

        else if(isLogin.islog==true){
            return(
                <>
                <PhotoProfile/>
                </>
            )
        }
    
 
}

export default ModalExamples;