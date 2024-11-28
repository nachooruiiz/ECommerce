import { createContext, useContext, useEffect, useState } from "react";

// Creación del contexto
export const TokenContext = createContext()



export const TokenProvider = ({ children }) => {
    
    const [token, setToken] = useState("")

    function logOut(){
        setToken(null)
        localStorage.removeItem("token")
    }

    useEffect(() => {
        const TokenGuardado = localStorage.getItem("token")

        if (TokenGuardado) {
            setToken(TokenGuardado)

        }
     }, [])

    return (
        <TokenContext.Provider value = {{ token, setToken, logOut}}>
            {children}
        </TokenContext.Provider>
    )
}