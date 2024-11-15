import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/DetalleDeProducto.css";

export default function DetalleDeProducto() {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `https://localhost:7261/api/Product/mostrarproduct?id_product=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!product) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className="detalle-producto-container">
      <img src={product.imageUrl} alt={product.name} className="detalle-producto-imagen" />
      <h1>{product.name}</h1>
      <p className="detalle-producto-descripcion">{product.description}</p>
      <p className="detalle-producto-precio">{product.price}€</p>
    </div>
  );
}
