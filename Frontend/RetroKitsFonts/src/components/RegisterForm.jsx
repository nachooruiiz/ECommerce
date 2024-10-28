import './../css/RegiterFormStyle.css'
import { Link } from "react-router-dom";

export default function RegisterForm() {
    return (
      <div className="containerAll">
        <img  className="imagenLogo" src="public\Imagenes\Logo.png" />
        <div className="container">
        <h2>Registrate</h2>
            <form>
                <div className="formInput">  
                    <h3>Nombre usuario *</h3>
                    <input className="inputForm" type="text"></input>
                    <h3>Contraseña *</h3>
                    <input className="inputForm" type="password"></input>
                    <h3>Repetir contraseña *</h3>
                    <input className="inputForm" type="password"></input>
                    <h3>Direccion *</h3>
                    <input className="inputForm" type="text"></input>
                    <h3>Fecha de nacimiento</h3>
                    <input className="inputForm" type="date"></input>
                </div>
                <div className="buttons">
                <br/>
                <Link to="LoginForm"><button className="button-form">INICIAR SESION</button></Link>
                <hr/>
                <button type="submit" className="button-form">REGISTRARSE</button>
                </div>
            </form>
        </div>
        </div> 
    );
}
