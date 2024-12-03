import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import "../css/Checkout.css";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  // Función para obtener una URL válida de la imagen
  const obtenerImagenUrl = (imageUrl) => {
    if (!imageUrl) return "https://via.placeholder.com/150"; // Imagen por defecto si no hay URL
    return imageUrl.startsWith("http")
      ? imageUrl
      : `https://localhost:7261${imageUrl}`; // Cambia "localhost" por tu dominio real
  };

  // Calcular subtotal
  const calcularSubtotal = () => {
    return carrito
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para realizar el pedido
  const handlePedido = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!formData.nombre || !formData.direccion || !formData.telefono) {
      alert("Por favor, completa todos los datos.");
      return;
    }

    try {
      // Iterar sobre los productos del carrito y enviar cada uno como un pedido
      const promises = carrito.map(async (item) => {
        const response = await fetch("https://localhost:7261/api/Order/AddOrder", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductId: item.productId, // Ajusta según la estructura del carrito
            Quantity: item.quantity,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al realizar el pedido.");
        }
      });

      await Promise.all(promises); // Esperar a que todas las solicitudes terminen

      alert("Pedido realizado correctamente.");
      vaciarCarrito(); // Vaciar el carrito después del pedido
      navigate("/"); // Redirigir al inicio
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
      alert("Hubo un error al procesar el pedido. Por favor, inténtalo de nuevo.");
    }
  };

  return (

    <div className="checkout-layout">
      {/* Columna de datos del cliente */}
      <div className="checkout-column datos-cliente">
        <h2>Introduce tus datos</h2>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </label>
        </form>
      </div>
    
      {/* Columna de productos */}
      <div className="checkout-column resumen-productos">
        <h2>Resumen del Pedido</h2>
        {carrito.length > 0 ? (
          <div>
            {carrito.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="producto-checkout">
                {/* Enlace a los detalles del producto */}
                <Link to={`/Catalogo/${item.productId}`} className="enlace-producto">
                  <img
                    src={obtenerImagenUrl(item.imageUrl)}
                    className="imagen-producto-checkout"
                    alt={item.name || "Producto"}
                  />
                </Link>
                <div>
                  <Link to={`/Catalogo/${item.productId}`} className="enlace-producto">
                    <p>{item.name}</p>
                  </Link>
                  <p>
                    {item.quantity} x {item.price}€ (Talla: {item.size})
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos en tu carrito.</p>
        )}
      </div>
    
      {/* Columna de subtotal y botón */}
      <div className="checkout-column subtotal-column">
        <h3>Subtotal: {calcularSubtotal()}€</h3>
        <button onClick={handlePedido} className="finalizar-compra-btn">
          Hacer Pedido
        </button>
      </div>
    </div>
    
  );
    
};

export default Checkout;
