import { Link } from "react-router-dom";
import "../css/HeaderStyles.css";

export function Header() {
  return (
    <header>
      {/* Div superior */}
      <div className="arriba-header">Envios 24/48 horas en la península</div>

      {/* Div principal dividido en tres secciones */}
      <div className="contenido-header">
        {/* Sección izquierda: Logo */}
        <div className="header-logo">
          <img className="img-header" src="/Imagenes/Logo.png" alt="Logo" />
        </div>

        {/* Sección central: Navegación principal */}
        <div className="nav-principal">
          <div>Sobre nosotros</div>
          <div>Catálogo</div>
          <div>Contacto</div>
        </div>

        {/* Sección derecha: Selector de idioma e iconos */}
        <div className="header-derecha">
          <select className="button-lenguage">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          <div className="nav-icons-header">
            <div>x</div>
            <div>x</div>
            <Link to="/login">
            <div>x</div>
            </Link>
                     
            
            
          </div>
        </div>
      </div>
    </header>
  );
}
