import React, { useContext } from "react";
import "../css/CarritoModal.css";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { API_BASE_URL } from "../config";


const CarritoModal = ({ isOpen, onClose }) => {
  const { carrito, actualizarCantidad, eliminarDelCarrito } = useContext(CartContext);

  // Calcular el subtotal
  const subtotal = carrito.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    const itemQuantity = parseInt(item.quantity);
    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
      return total;
    }
    return total + itemPrice * itemQuantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="carrito-modal-overlay" onClick={onClose}>
      <div
        className="carrito-modal"
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
      >
        
        <h2>Tu Carrito</h2>
        {carrito.length > 0 ? (
          <>
            {carrito.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="producto-modal">
                <img
                  src={`${API_BASE_URL}${item.imageUrl}`}
                  alt={item.name}
                  className="imagen-producto-modal"
                />
                <div className="producto-detalles">
                  <Link to={`/Catalogo/${item.productId}`}>
                    <p>{item.name}</p>
                  </Link>
                  <p>Precio: {item.price}€</p>
                  {/* <p>Talla: {item.size}</p> */}
                  <div className="counter">
                    <button
                      onClick={() =>
                        actualizarCantidad(item.productId/*, item.size*/, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                    />

                    <button
                      onClick={() =>
                        actualizarCantidad(item.productId/*, item.size*/, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => eliminarDelCarrito(item.productId/*, item.size*/)}
                    className="eliminar-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            {/* Subtotal */}
            <div className="subtotal-modal">
              <p>Subtotal: {subtotal.toFixed(2)}€</p>
            </div>
            {/* Botón para ir al carrito */}
            <div className="boton-ir-carrito">
              <Link to="/Carrito">
                <button className="ver-carrito-btn" onClick={onClose}>
                  Ver Carrito
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;