import "../css/FooterStyles.css";

export function Footer() {
  return (
    <footer>
      <div className="containerImg">
        <img
          className="img-footer"
          src="/Imagenes/Logo.png"
          alt="La imagen no se puede cargar"
        />
      </div>

      <div className="footer-center">
        <nav className="nav-footer">
          <div>
            <h3>Sobre nosotros</h3>
            <p>Quienes somos</p>
            <p>Qué hacemos</p>
          </div>
          <div>
            <h3>Políticas</h3>
            <p>Aviso de privacidad</p>
            <p>Política de cookies</p>
            <p>Área legal</p>
          </div>
          <div>
            <h3>Nuestras ligas</h3>
            <p>Aviso de privacidad</p>
            <p>Política de cookies</p>
            <p>Área legal</p>
          </div>
        </nav>
      </div>

      <nav className="nav-icons">
        <p>Síguenos en:</p>
        <div className="social-icons">
          <i className="sprite sprite-Instagram"></i>
          <i className="sprite sprite-WhatsApp"></i>
          <i className="sprite sprite-X"></i>
          <i className="sprite sprite-tiktok"></i>
          <i className="sprite sprite-youtube"></i>
        </div>
      </nav>
    </footer>
  );
}
