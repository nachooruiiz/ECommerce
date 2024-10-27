import "../css/HeaderStyles.css";

export function Header() {
  return (
    <header>
      <div className="arriba-header">Envios 24/48 horas en la península</div>
      <img className="img-header" src="" alt="x" />
      <nav className="nav-principal">
        <div>Sobre nosotros</div>
        <div>Catálogo</div>
        <div>Contacto</div>
      </nav>
      <nav className="nav-icons">
        <div>
          <span id="iconos">
            <img src="nut_icon_159951.png" alt="" />
          </span>
        </div>
        <div>x</div>
        <div>x</div>
      </nav>
      <button className="button-lenguage">
        <span id="texto-lenguage">Español</span> <span>▼</span>
      </button>
    </header>
  );
}
