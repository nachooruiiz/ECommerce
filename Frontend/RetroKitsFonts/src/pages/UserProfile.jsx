import React, { useState, useEffect, useContext } from "react";
import "./../css/UserProfile.css";
import UserOrders from "../components/UserOrders";
import { SHOW_CURRENT_USER, CHANGE_USER_INFO } from "../config";
import { TokenContext } from "../context/TokenContext";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        addres: "",    
        password: "",
        birthday: "",
      });
    const { token } = useContext(TokenContext)
    const { logOut } = useContext(TokenContext);

    // Fetch user data on component load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(SHOW_CURRENT_USER, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    console.log(user)
                    setNewUserData(userData); // Inicializar los datos editables
                } else {
                    console.error("Error al obtener los datos del usuario");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
            }
        };
        fetchUser();

    }, []);

    // Función para actualizar los datos del usuario
    const handleUpdateUser = async () => {
        if (!user || !newUserData) return;
        
        try {
            console.log("Enviando solicitud PUT...");
            const response = await fetch(`${CHANGE_USER_INFO}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserData), // Enviar los nuevos datos del usuario
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Actualizar el estado con los nuevos datos
                alert("Datos del usuario actualizados exitosamente.");
            } else {
                const contentType = response.headers.get("Content-Type");
                let message = "";

                if (contentType && contentType.includes("application/json")) {
                    const errorResponse = await response.json();
                    message = errorResponse?.message || "Error desconocido.";
                } else {
                    message = await response.text();
                }

                console.error("Error al actualizar el usuario:", message);
                alert(message);
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
    };

    if (!user) {
        return <div>Cargando datos del usuario...</div>;
    }

    return (
        <div className="user-profile-wrapper">
            <div className="user-profile-container">
                <div className="user-header">
                    {/* Contenedor de la imagen */}
                    <div className="user-image-container">
                        <img
                            src={user.profileImage || "/Imagenes/avatar_generico.png"}
                            alt="Avatar del usuario"
                            className="user-avatar"
                        />
                    </div>

                    {/* Contenedor de la información del usuario */}
                    <div className="user-info-container">
                        <h1 className="user-name">{"Hola, " + user.name || "Nombre no disponible"}</h1>

                        <div className="user-field">
                            <strong>Nombre:</strong>
                            <div className="editable">
                                <input
                                    type="text"
                                    value={newUserData.name || ""}
                                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="user-field">
                            <strong>Correo:</strong>
                            <div className="editable">
                                <input
                                    type="email"
                                    value={newUserData.email || ""}
                                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="user-field">
                            <strong>Dirección:</strong>
                            <div className="editable">
                                <input
                                    type="text"
                                    value={newUserData.address || ""}
                                    onChange={(e) => setNewUserData({ ...newUserData, addres: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="user-field">
                            <strong>Contraseña:</strong>
                            <div className="editable">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={newUserData.password || ""}
                                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                                />
                                <button
                                    className="edit-button"
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                                >
                                    {isPasswordVisible ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        <div className="user-field">
                            <strong>Fecha de nacimiento:</strong>
                            <div className="editable">
                                <input
                                    className="inputForm"
                                    type="date"
                                    value={newUserData.birthday || ""}
                                    onChange={(e) => setNewUserData({ ...newUserData, birthday: e.target.value})}
                                />
                            </div>
                        </div>

                        <UserOrders />
                    </div>
                </div>

                {/* Botón para actualizar */}
                <div className="user-actions">
                    <button className="user-action-button" onClick={handleUpdateUser}>
                        Guardar cambios
                    </button>
                    <button
                        className="user-action-button"
                        onClick={() => {
                            logOut();
                            window.location.href = "/login";
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
