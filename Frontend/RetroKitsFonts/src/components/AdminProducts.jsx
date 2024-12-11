import React, { useState, useEffect } from "react";
import './../css/AdminDashboard.css'

// Definir las URLs de las APIs
const GET_PRODUCTS = "https://localhost:7261/api/Product";
const ADD_PRODUCT = "https://localhost:7261/api/product/AddProduct";  // La URL debe coincidir con la del backend
const UPDATE_PRODUCT = `https://localhost:7261/api/Product/UpdateProduct/`;


export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    imageUrl: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GET_PRODUCTS, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error al obtener los productos");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Manejar agregar producto
  const handleAddProduct = async () => {
    try {
      const response = await fetch(ADD_PRODUCT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]); // Añadir el nuevo producto a la lista
        alert("Producto añadido exitosamente.");
        setNewProduct({ name: "", price: 0, description: "", stock: 0, imageUrl: "" }); // Limpiar el formulario
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // Manejar actualización de un producto
  const handleUpdateProduct = async (productId) => {
    try {
      const response = await fetch(`${UPDATE_PRODUCT}${productId}`, {

        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(product => product.id === productId ? updatedProduct : product)); // Actualizar el producto en la lista
        alert("Producto actualizado exitosamente.");
        setEditProduct(null); // Cerrar el formulario de edición
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="admin-products">
      <h2>Gestión de Productos</h2>

      {/* Formulario de añadir producto */}
      <div className="add-product-form">
        <h3>Añadir Producto</h3>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          //value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          //value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          //value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button onClick={handleAddProduct}>Añadir Producto</button>
      </div>

      {/* Mostrar formulario de edición si hay un producto seleccionado */}
      {editProduct && (
        <div className="edit-product-form">
          <h3>Editar Producto</h3>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          <button onClick={() => handleUpdateProduct(editProduct.id)}>Actualizar Producto</button>
          <button onClick={() => setEditProduct(null)}>Cancelar</button>
        </div>
      )}

      {/* Listado de productos */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => { setEditProduct(product); setNewProduct({ name: product.name, price: product.price, description: product.description, stock: product.stock, imageUrl: product.imageUrl }); }}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
