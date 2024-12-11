import React, { useState, useEffect, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { GET_USER_ORDERS } from "../config";

const UserOrders = () => {
  const [ orders, setOrders ] = useState([])
  const { token } = useContext(TokenContext)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(GET_USER_ORDERS, {
                    method: "GET",
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok){
                    const getOrders = await response.json()
                    setOrders(getOrders.order)
                    console.log("esto es el getorder",getOrders)
                }else{
                    console.error("no se pudo obtener los pedidos del usuario")
                }
                
            }catch{
                console.log("error")
            }
        }
        fetchOrders()
    }, [])

    useEffect(() => {
        console.log("Pedidos actualizados:", orders); // Se ejecuta cuando 'orders' cambia
      }, [orders]); 
    
  return (
    <div>
        <strong>Pedidos:</strong>
        <div>
            {orders && orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.OrderId}>
                    <p>Pedido ID: {order.OrderId}</p>
                    <p>Total: {order.TotalAmount}</p>
                    <p>Fecha: {new Date(order.OrderDate).toLocaleDateString()}</p>
                    <ul>
                        {order.Items.map((item) => (
                        <li key={item.ProductId}>
                            {item.ProductName} - Cantidad: {item.Quantity} - Precio: {item.ProductPrice}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))
            ) : (
                <p>No se han realizado pedidos todavía</p>
            )}
        </div>
    </div>
  );
};

export default UserOrders;