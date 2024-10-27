import "../css/LoginForm.css"

export function LoginForm() {
    return (
        <div className="container">
            <img src="" alt="la imagen no se ha podido cargar correctamente"/>
            <form>
                <h2>Usuario *</h2>
                <input type="text"></input>
                <h2>Contraseña *</h2>
                <input type="text"></input>
                <br/>
                <button className="button-form">INICIAR SESIÓN</button>
                <hr/>
                <button>REGISTRARSE</button>
            </form>
        </div>
    );
}