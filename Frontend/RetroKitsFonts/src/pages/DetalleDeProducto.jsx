import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/DetalleDeProducto.css";
import Resenas from "../components/Resenas";

export default function DetalleDeProducto() {
  const { id } = useParams(); // Obtén el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  // Estado para productos relacionados (opcional)
  const [relatedProducts, setRelatedProducts] = useState([]);

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
              src={product.imageUrl}
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
            <div className="botones-detalle">
          <button className="boton-comprar">Añadir al carrito</button>
          <button className="boton-comprar">Comprar ya</button>
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
          <h1>Reseñas</h1>
          {/* Aquí podrías mapear reseñas reales si las obtienes del backend */}
          <h3>Carlos Rueda</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>
            Esta camiseta retro del CD Málaga es simplemente espectacular. La calidad
            del tejido y los detalles vintage la hacen única. Me encanta cómo
            representa la historia del equipo, y cada vez que la uso me siento parte
            de esa gran tradición. Además, es súper cómoda, perfecta tanto para
            llevarla al estadio como para el día a día. ¡Una joya para cualquier
            malaguista!
          </p>

          <h3>Lucía Salas</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>
            "Compré la camiseta retro del CD Málaga para regalarla a mi hermano, que
            es fanático del equipo, ¡y no podría estar más feliz con la compra! Los
            detalles son increíbles, desde el escudo hasta el diseño de las mangas.
            El estilo vintage le da un toque especial y auténtico. Mi hermano está
            encantado, y yo estoy pensando en comprarme una para mí. ¡Totalmente
            recomendada!"
          </p>

          <h3>Manuel Ortega</h3>
          <p>⭐⭐⭐⭐⭐</p>
          <p>
            "Esta camiseta retro del CD Málaga es lo mejor que he añadido a mi
            colección. El diseño clásico me recuerda a los buenos tiempos del club, y
            cada vez que la llevo puesta, los comentarios positivos no faltan. Es
            ideal para cualquier fan que quiera llevar la historia del Málaga CF
            consigo. La recomiendo 100%, tanto por su estilo como por su calidad."
          </p>
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
      <Resenas productId={product.id} token={localStorage.getItem("token")}/>
    </>
  );
}
