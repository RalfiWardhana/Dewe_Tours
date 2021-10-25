import { createContext, useState } from "react";

export const CartContext = createContext();

const AuthContext = ({children})=>{
    const[isLogin, setLogin]=useState({islog:false,email:null,password:null,isadmin:false})
    console.log(isLogin);
    return(
        <CartContext.Provider value={{isLogin,setLogin}}>
            {children}
        </CartContext.Provider>
    )
}
export default AuthContext;

