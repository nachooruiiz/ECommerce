import './../css/estilosReusables.css';
import './../css/home.css';
import Carrusel from '../components/Carrusel';
import ProductosHome from '../components/ProductosHome';


export default function HomePage() {

  return (
    <div>
      {/* Sección del Carrusel */}
      <Carrusel />
      {/* Productos Destacados */}
      <ProductosHome />
    </div>
  );
}
