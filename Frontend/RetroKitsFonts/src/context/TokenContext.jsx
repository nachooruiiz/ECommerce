import { createContext, useContext, useEffect, useState } from "react";

// Creación del contexto
const TokenContext = createContext

export const useToken = () => {
    return useContext(TokenContext)
}

export const TokenProvider = ({ children }) => {
    
    const [token, setToken] = useState("")

    useEffect(() => {
        const TokenGuardado = localStorage.getItem("token")

        if (TokenGuardado) {
            setToken(TokenGuardado)

        }
     }, [])

    return (
        <TokenContext.Provider value = {{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}