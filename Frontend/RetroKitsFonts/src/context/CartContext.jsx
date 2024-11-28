// CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { TokenContext } from './TokenContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const { token } = useContext(TokenContext)
  const localCart = JSON.parse(localStorage.getItem('cart')) || [];

  function handleSetCarrito(newCarrito){
    setCarrito(newCarrito)
  }

  // Función para cargar el carrito desde el backend o localStorage
  const cargarCarrito = async () => {
    if (token == null) {
      // Usuario no autenticado
      setCarrito(localCart);
    } else {
      // Usuario autenticado
      try {
        const response = await fetch('https://localhost:7261/api/Cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCarrito(data.items);
        } else {
          console.error('Error al cargar el carrito.');
        }
      } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
      }
    }
  };

  useEffect(() => {
    if (token){
      console.log("useEffect de cargar carrito")
      cargarCarrito();
    }else{
      setCarrito([])
    }
    
  }, [token]);

  // Función para agregar al carrito
  const agregarAlCarrito = async (producto, cantidad) => {
    try {
      const response = await fetch("https://localhost:7261/api/Cart/AddItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: producto.productId, quantity: cantidad }), // Corrige esto
      });
  
      if (response.ok) {
        setMensaje("Producto añadido al carrito con éxito.");
      } else {
        const data = await response.json();
        setMensaje(data.message || "Error al añadir producto al carrito.");
      }
    } catch (error) {
      console.log(error);
      setMensaje("Error al conectar con el servidor.");
    }
    



    // Actualizar el carrito localmente
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.productId === producto.productId && item.size === producto.size
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.productId === producto.productId && item.size === producto.size
            ? { ...item, quantity: item.quantity + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, quantity: cantidad }];
      }
    });
  };

  // Función para actualizar la cantidad
  const actualizarCantidad = async (productId, size, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productId, size);
      return;
    }

    // Actualizar en el backend si es necesario
    if (token) {
      try {
        const response = await fetch('https://localhost:7261/api/Cart/UpdateItem', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, size, quantity: nuevaCantidad }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setMensaje(errorData.message || 'Error al actualizar la cantidad.');
        }
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        setMensaje('No se pudo conectar con el servidor.');
      }
    }

    // Actualizar el carrito localmente
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: nuevaCantidad }
          : item
      )
    );
  };

  // Función para eliminar del carrito
  const eliminarDelCarrito = async (productId, size) => {
    // Actualizar en el backend si es necesario
    if (token) {
      try {
        const response = await fetch(
          `https://localhost:7261/api/Cart/RemoveItem/${productId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setMensaje(errorData.message || 'Error al eliminar el producto.');
        }
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        setMensaje('No se pudo conectar con el servidor.');
      }
    }

    // Actualizar el carrito localmente
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  // Función para vaciar el carrito
  const vaciarCarrito = async () => {
    // Actualizar en el backend si es necesario
    if (token) {
      try {
        const response = await fetch('https://localhost:7261/api/Cart/ClearCart', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          setMensaje(data.message || 'Error al vaciar el carrito.');
        }
      } catch (error) {
        setMensaje('Error al conectar con el servidor.');
      }
    }

    // Actualizar el carrito localmente
    setCarrito([]);
  };

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        cargarCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        mensaje,
        setMensaje,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
