import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"

// Creación del contexto
export const TokenContext = createContext()



export const TokenProvider = ({ children }) => {
    
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")

    function logOut(){
        setToken(null)
        setRole(null)
        localStorage.removeItem("token")
    }

    useEffect(() => {
        const TokenGuardado = localStorage.getItem("token")

        if (TokenGuardado) {
            setToken(TokenGuardado)
            getRole(TokenGuardado)
        }
     }, [])

    function getRole(token){
        const decodedToken = jwtDecode(token)
        setRole(decodedToken.role)
    }
    return (
        <TokenContext.Provider value = {{ token, setToken, logOut, role}}>
            {children}
        </TokenContext.Provider>
    )
}