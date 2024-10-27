import '../css/HeaderStyles.css'

export function Header() {
    return (
        <header> 
            <div className='arriba-header'>Envios 24/48 horas en la península</div>
            <img className="img-header" src="" alt="La imagen no se puede cargar"/>
            <nav className='nav-principal'>
                <div>Sobre nosotros</div>
                <div>Catálogo</div>
                <div>Contacto</div>
            </nav>
            <nav className='nav-icons'>
                <div>Icono de tuerca (administrador)</div>
                <div>Icono de carrito</div>
                <div>Icono de usuario</div>
            </nav>
            <button className='button-lenguage'>Español (inoco)</button>
        </header>
    );
}