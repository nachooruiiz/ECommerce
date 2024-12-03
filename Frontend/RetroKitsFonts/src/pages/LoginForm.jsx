import './../css/FormStyle.css';
import './../css/estilosReusables.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { TokenContext } from '../context/TokenContext';
import { LOGIN, SYNC_CART } from '../config.js'

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [succes, setSucces] = useState('');
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const auth = useContext(TokenContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucces('');

    try {
      // Inicia sesión
      const response = await fetch(LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

        console.log(response)
      if (!response.ok) {
        setError("Usuario o contraseña incorrectos.");
        return;
      }

      const token = await response.text();
      localStorage.setItem('token', token);
      auth.setToken(token)

      // Verifica el carrito desde el contexto
      if (!cart || !cart.carrito || cart.carrito.length === 0) {
        console.log("Carrito local vacío o no inicializado");
        setSucces(`Bienvenido ${email}`);
        localStorage.removeItem('localCart'); // Elimina el carrito local
        navigate("/");
      } else {
        console.log("Sincronizando carrito...");
        
        const carritoParaSincronizar = cart.carrito.map(producto => ({
          ProductId: producto.productId, 
          Quantity: producto.quantity
        }));

        const syncResponse = await fetch(SYNC_CART, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(carritoParaSincronizar)
        });
        
        
        if (!syncResponse.ok) {
          throw new Error("Error al sincronizar el carrito.");

        }else{
          console.log("carrito sincronizado")
          //cart.cargarCarrito()
          console.log("Carrito cogido del back");
          localStorage.removeItem('localCart'); // Elimina el carrito local después de la sincronización
          setSucces(`Bienvenido ${email}`);
          navigate("/");
        }

        
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="containerAll">
      <img className="imagenLogo" src="/Imagenes/Logo.png" alt="Logo" />
      <div className="container">
        <h2>Iniciar Sesión</h2>
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
