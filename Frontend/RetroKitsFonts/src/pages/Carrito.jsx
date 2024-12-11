import React, { useContext } from 'react';
import './../css/Carrito.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { TokenContext } from '../context/TokenContext';
import { API_BASE_URL } from '../config';

const Carrito = () => {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useContext(CartContext);

  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

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

  const handleTramitarPedido = () => {
    if (token) {
      navigate('/Checkout');
    } else {
      alert('Debes iniciar sesión para tramitar tu pedido.');
      navigate('/login');
    }
  };

  return (
    <div className="carrito-layout">
      <div className="productos-carrito">
        <h2>Carrito de Compras</h2>
        {carrito.length > 0 ? (
          carrito.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="producto">
              <img
                src={`${API_BASE_URL}${item.imageUrl}`}
                className="imagen-producto-carrito"
                alt={item.name}
              />

              <div>
                <p className="nombre-producto">{item.name} - {item.price}€</p>
                <p>Cantidad: {item.quantity}</p>
                <div className="counter">
                  <button
                    onClick={() => actualizarCantidad(item.productId, Math.max(item.quantity - 1, 1))}
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
                    onClick={() => actualizarCantidad(item.productId, Math.min(item.quantity + 1, item.stock))}
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
        <button onClick={handleTramitarPedido} className="ver-carrito-btn">
          Tramitar Pedido
        </button>
        <button onClick={vaciarCarrito} className="eliminar-btn">
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default Carrito;
