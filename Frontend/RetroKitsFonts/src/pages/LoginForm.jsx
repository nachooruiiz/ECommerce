import './../css/FormStyle.css';
import './../css/estilosReusables.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [succes, setSucces] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7261/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      console.log(response)
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        setSucces(`Bienvenido ${email}`);
        navigate("/"); 
      } else if (response.ok == false){
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="containerAll">
      <img className="imagenLogo" src="/Imagenes/Logo.png" />
      <div className="container">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={handleSubmit}>
          <div className="formInput">
            <h3>Correo Electrónico</h3>
            <input
              className="inputForm"
              type="text"
              placeholder='Usuario@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3>Contraseña</h3>
            <input
              className="inputForm"
              type="password"
              placeholder='··········'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="buttons">
            <br />
            <button type="submit" className="button-form">
              INICIAR SESIÓN
            </button>
            <hr />
            <Link to="/register">
              <button className="button-form">REGISTRARSE</button>
            </Link>
          </div>
          {error && <p className='error'>{error}</p>}
          {succes && <p className='succes'>{succes}</p>}
        </form>
      </div>
    </div>
  );
}
