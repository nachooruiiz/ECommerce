import destacado1 from "/Imagenes/2.jpg";
import destacado2 from "/Imagenes/3.jpg";
import destacado3 from "/Imagenes/4.jpg";
import liga1 from "/Imagenes/LALIGA.png";
import liga2 from "/Imagenes/PREMIER.png";
import liga3 from "/Imagenes/RESTO-2.png";
import { Link } from "react-router-dom"; // Asegúrate de importar Link
import './../css/home.css';
export default function ProductosHome() {
  const productosDestacados = [destacado1, destacado2, destacado3];
  const ligas = [liga1, liga2, liga3];

  return (
    <>
      <section className="productos-destacados">
        <h2>Productos Destacados</h2>
        <div className="productos-galeria">
          {productosDestacados.map((producto, index) => (
            <img key={index} src={producto} alt={`Producto Destacado ${index + 1}`} />
          ))}
        </div>
        <Link to="/catalogo">
          <button className="ver-catalogo-btn">Ver Catálogo</button>
        </Link>
      </section>

      <section className="productos-destacados">
        <h2>Ligas</h2>
        <div className="productos-galeria">
          {ligas.map((liga, index) => (
            <img key={index} src={liga} alt={`Liga ${index + 1}`} />
          ))}
        </div>
        <Link to="/catalogo">
          <button className="ver-catalogo-btn">Ver Catálogo</button>
        </Link>
      </section>
    </>
  );
}
