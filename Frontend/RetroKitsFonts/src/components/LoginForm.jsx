import './../css/LoginForm.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  return (
    <div className="containerAll">
      <img className="imagenLogo" src="public/Imagenes/Logo.png" />
      <div className="container">
        <h2>Iniciar Sesion</h2>
        <form>
          <div className="formInput">
            <h3>Usuario </h3>
            <input className="inputForm" type="text"></input>
            <h3>Contraseña </h3>
            <input className="inputForm" type="password"></input>
          </div>
          <div className="buttons">
            <br />
            <button type="submit" className="button-form">
              INICIAR SESIÓN
            </button>
            <hr />
            <Link to="/Register">
              <button className="button-form">REGISTRARSE</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
