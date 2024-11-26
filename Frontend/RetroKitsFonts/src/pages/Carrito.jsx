import React, { useContext } from 'react';
import './../css/Carrito.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Carrito = () => {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    mensaje,
    setMensaje,
  } = useContext(CartContext);

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
            <div key={`${item.productId}-${item.size}`} className="producto">
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
                      actualizarCantidad(
                        item.productId,
                        item.size,
                        Math.max(item.quantity - 1, 1)
                      )
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
                      actualizarCantidad(
                        item.productId,
                        item.size,
                        Math.min(item.quantity + 1, item.stock)
                      )
                    }
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.productId, item.size)}
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
        <button className="ver-carrito-btn">Tramitar Pedido</button>
        <button onClick={vaciarCarrito} className="eliminar-btn">
          Vaciar Carrito
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Carrito;
