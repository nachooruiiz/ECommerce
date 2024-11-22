import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/DetalleDeProducto.css";
import Resenas from "../components/Resenas";
//import { useToken } from "../context/TokenContext";

export default function DetalleDeProducto() {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  //const { token } = useToken();
  const token = localStorage.getItem("token")

  // Estado para productos relacionados (opcional)
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Función para añadir los productos al carrito
  const agregarAlCarrito = async (productId, cantidad) => {
    
    try {
      const response = await fetch("https://localhost:7261/api/Cart/AddItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: cantidad }),
      });
      console.log(response)
      if (response.ok) {
        setMensaje("Producto añadido al carrito con éxito.");
      } else {
        const data = await response.json();
        setMensaje(data.message || "Error al añadir producto al carrito.");
      }
    } catch (error) {
      console.log(error)
      setMensaje("Error al conectar con el servidor.");
    }
  };

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

        // Si deseas obtener productos relacionados
        const relatedUrl = `https://localhost:7261/api/Product/relatedProducts?id_product=${id}`;
        const relatedResponse = await fetch(relatedUrl);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData);
        }
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
    <>
      {/* Contenedor principal */}
      <div className="detalle-producto-container">
        <div className="detalle-producto-contenido">
          {/* Imagen del producto */}
          <div className="detalle-producto-imagen-container">
            <img
              src={`https://localhost:7261${product.imageUrl}`}
              alt={product.name}
              className="detalle-producto-imagen"
            />
          </div>
        </div>

        <div className="detalle-producto-detalles">
          <h1>{product.name}</h1>
          <p className="detalle-producto-precio">{product.price}€</p>
          <p className="detalle-producto-stock">Stock: {product.stock}</p>

          <div className="desplegable-talla">
            <label for="tallas">Talla : </label>
            <select id="tallas" name="tallas" >
              <option value="" disabled selected>Elige una opción</option>
              <option value="XS">XS (Extra Small)</option>
              <option value="S">S (Small)</option>
              <option value="M">M (Medium)</option>
              <option value="L">L (Large)</option>
              <option value="XL">XL (Extra Large)</option>
              <option value="XXL">XXL (2XL)</option>
            </select>
          </div>

          <input
            type="number"
            min="1"
            max={product.stock}
            defaultValue="1"
            id="cantidad"
          />

          <div className="botones-detalle">
            <button 
              className="boton-comprar"
              onClick={() =>
                agregarAlCarrito(
                  product.id,
                  parseInt(document.getElementById("cantidad").value)
                )
              }
            >
              Añadir al carrito
            </button>
            <button className="boton-comprar">Comprar ya</button>
            <p>{mensaje}</p>
          </div>

          <h2>Historia</h2>
          <p className="detalle-producto-descripcion">
            {product.long_description}
          </p>
        </div>
      </div>

      {/* Contenedor de reseñas y productos relacionados */}
      <div className="contenedor-reviews-relacionados">
        {/* Sección de reseñas */}
        <div className="reviews">
        <Resenas productId={product.id} token={token} />
        </div>

        {/* Sección de productos relacionados */}
        <div className="productos-relacionados">
          <h1>Productos relacionados</h1>
          <Link to="./../">
            <div className="imagenes-relacionadas-container">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((relatedProduct) => (
                  <Link
                    to={`/Catalogo/${relatedProduct.id}`}
                    key={relatedProduct.id}
                  >
                    <img
                      className="imagenes-relacionadas"
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                    />
                  </Link>
                ))
              ) : (
                // Si no hay productos relacionados, puedes mostrar algunos por defecto
                <>
                  <img
                    className="imagenes-relacionadas"
                    src="/Imagenes/2.jpg"
                    alt="Producto relacionado 1"
                  />
                  <img
                    className="imagenes-relacionadas"
                    src="/Imagenes/3.jpg"
                    alt="Producto relacionado 2"
                  />
                  <img
                    className="imagenes-relacionadas"
                    src="/Imagenes/4.jpg"
                    alt="Producto relacionado 3"
                  />
                  <img
                    className="imagenes-relacionadas"
                    src="/Imagenes/5.jpg"
                    alt="Producto relacionado 4"
                  />
                </>
              )}
            </div>
          </Link>
        </div>

      </div>
      
    </>
  );
}
