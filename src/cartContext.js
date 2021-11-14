import { createContext, useState } from "react";
import { API,setAuthToken } from "./config/api";

export const CartContext = createContext();

const AuthContext = ({children})=>{
    const[isLogin, setLogin]=useState({islog:localStorage.getItem('token') ? true : false,email:localStorage.getItem('email'),idTrip:null,isadmin:localStorage.getItem('isAdmin') ? true : false,isAuth:localStorage.getItem('token') ? true : false})
    console.log(isLogin);
    return(
        <CartContext.Provider value={{isLogin,setLogin}}>
            {children}
        </CartContext.Provider>
    )
}
export default AuthContext;

