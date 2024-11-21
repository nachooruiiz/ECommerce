import React, { useEffect, useState } from "react";
import "./../css/Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token")

  const cargarCarrito = async () => {
    
    try {
      const response = await fetch("https://localhost:7261/api/Cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCarrito(data);
        console.log(data)
          console.log(carrito)
      } else {
        console.error("Error al cargar el carrito.");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
    }
  };

  const actualizarCantidad = async (productId, nuevaCantidad) => {
    try {
      const response = await fetch(
        "https://localhost:7261/api/Cart/UpdateQuantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: nuevaCantidad }),
        }
      );

      if (response.ok) {
        setMensaje("Cantidad actualizada con éxito.");
        cargarCarrito();
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || "Error al actualizar la cantidad.");
      }
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  const eliminarDelCarrito = async (productId) => {
    try {
      const response = await fetch(
        `https://localhost:7261/api/Cart/RemoveItem/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMensaje("Producto eliminado del carrito con éxito.");
        cargarCarrito();
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || "Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  const vaciarCarrito = async () => {
    try {
      const response = await fetch("https://localhost:7261/api/Cart/ClearCart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMensaje("Carrito vaciado con éxito.");
        setCarrito([]);
      } else {
        const data = await response.json();
        setMensaje(data.message || "Error al vaciar el carrito.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <button onClick={vaciarCarrito} className="boton-vaciar">
        Vaciar Carrito
      </button>

      {carrito.length > 0 ? (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              <p>
                <strong>{item.nombre}</strong> - {item.precio}€ x {item.cantidad}
              </p>
              <input
                type="number"
                min="1"
                max={item.stock}
                defaultValue={item.cantidad}
                onBlur={(e) =>
                  actualizarCantidad(item.productId, parseInt(e.target.value))
                }
              />
              <button onClick={() => eliminarDelCarrito(item.productId)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes productos en tu carrito.</p>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Carrito;
