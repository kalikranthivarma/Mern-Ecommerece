import { useState,createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [seller,setSeller]=useState("")
    function login(data){
        setSeller(data.seller)
        localStorage.setItem("token",data.token)
    }
    function logout(){
        localStorage.removeItem("token")
        setSeller(null)
    }
    return (
        <AuthContext.Provider value={{seller,login,logout}}>
            {children}
        </AuthContext.Provider>

    )
}