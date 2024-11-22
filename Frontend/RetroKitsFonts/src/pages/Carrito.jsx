import React, { useEffect, useState } from "react";
import "./../css/Carrito.css";
import { Link } from "react-router-dom";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("token");

  const cargarCarrito = async () => {
    try {
      const response = await fetch("https://localhost:7261/api/Cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCarrito(data.items);
      } else {
        console.error("Error al cargar el carrito.");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
    }
  };

  const actualizarCantidad = async (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      alert("La cantidad debe ser mayor a 0.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://localhost:7261/api/Cart/UpdateItem",
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
        const updatedCarrito = carrito.map((item) =>
          item.productId === productId ? { ...item, quantity: nuevaCantidad } : item
        );
        setCarrito(updatedCarrito);
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

  const calcularTotalProductos = () => {
    return carrito.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  };

  const calcularSubtotal = () => {
    return carrito.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="carrito-layout">
      <div className="productos-carrito">
        <h2>Carrito de Compras</h2>
        {carrito.length > 0 ? (
          carrito.map((item) => (
            <div key={item.productId} className="producto">
              <img
                src={`https://localhost:7261${item.imageUrl}`}
                className="imagen-producto-carrito"
                alt={item.name}
              />
              <div>
                <Link
                  to={`/Catalogo/${item.productId}`}
                  className="descripcion-pedido"
                >
                  <p className="nombre-producto">
                    {item.name} - {item.price}€
                  </p>
                </Link>
                <p>
                  Talla: {item.size} | Cantidad: {item.quantity}
                </p>
                <div className="counter">
                  <button
                    onClick={() =>
                      actualizarCantidad(item.productId, Math.max(item.quantity - 1, 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    readOnly
                  />

                  <button
                    onClick={() =>
                      actualizarCantidad(item.productId, Math.min(item.quantity + 1, item.stock))
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.productId)}
                  className="eliminar-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes productos en tu carrito.</p>
        )}
      </div>
      <div className="tramitar-pedido">
        <h2>Subtotal ({calcularTotalProductos()} productos)</h2>
        <p>{calcularSubtotal().toFixed(2)}€</p>
        <button className="ver-catalogo-btn">Tramitar Pedido</button>
        <button onClick={vaciarCarrito} className="eliminar-btn">
          Vaciar Carrito
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Carrito;
