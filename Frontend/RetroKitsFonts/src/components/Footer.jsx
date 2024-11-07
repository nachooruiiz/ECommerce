import '../css/FooterStyles.css';

export function Footer() {
    return (
        <footer>
            {/* Logo fuera del contenedor central para superponerlo */}
            <div className="containerImg">
                <img className="img-footer" src="/Imagenes/Logo.png" alt="La imagen no se puede cargar"/>
            </div>

            {/* Contenedor central con las secciones de enlaces */}
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

            {/* Área inferior para "Síguenos en:" y los iconos sociales */}
            <nav className="nav-icons">
                <p>Síguenos en:</p>
                <div className="social-icons">
                    <img src="public/Imagenes/facebook.png" alt="Facebook" />
                    <img src="public/Imagenes/twitter.png" alt="Twitter" />
                    <img src="public/Imagenes/instagram.png" alt="Instagram" />
                    <img src="public/Imagenes/linkedin.png" alt="LinkedIn" />
                    <img src="public/Imagenes/youtube.png" alt="YouTube" />
                </div>
            </nav>
        </footer>
    );
}
