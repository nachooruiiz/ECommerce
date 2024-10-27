import "../css/LoginForm.css"

export function LoginForm() {
    return (
      <div className="containerAll">
        <img  class="imagenLogo" src="public\Imagenes\Logo.png" />
        <div className="container">
        <h2>Iniciar Sesion</h2>
            <form>
                <div className="formInput">  
                    <h2>Usuario *</h2>
                    <input className="inputForm" type="text"></input>
                    <h2>Contraseña *</h2>
                    <input className="inputForm" type="password"></input>
                </div>
                <div className="buttons">
                <br/>
                <button className="button-form">INICIAR SESIÓN</button>
                <hr/>
                <button className="button-form">REGISTRARSE</button>
                </div>
            </form>
        </div>
        </div> 
    );
}