import '../css/FooterStyles.css'

export function Footer() {
    return (
        <footer>
            <img className="img-footer" src="" alt="La imagen no se puede cargar"/>
            <nav className='nav-footer'>
                <div>
                    <h3>Sobre nosotros</h3>
                    <p>Quienes somos</p>
                    <p>Qué hacemos</p>
                </div>
                <div>
                    <h3>Políticas</h3>
                    <p>Aviso de privacidad</p>
                    <p>Política de coockies</p>
                    <p>Área legal</p>
                </div>
                <div>
                    <h3>Nuestras ligas</h3>
                    <p>adfasdf</p>
                </div>
            </nav>
            <nav className='nav-icons'>
                <p>Síguenos en:</p>
                <div>Redes sociales</div>
            </nav>
        </footer>
    );
}