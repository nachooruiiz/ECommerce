import './../css/RegiterFormStyle.css';
import './../css/estilosReusables.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch('https://localhost:7261/api/Auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, address, birthdate })
            });

            if (response.ok) {
                const token = await response.text(); // Recibe el token como texto
                localStorage.setItem('token', token); // Guarda el token en localStorage
                setSucces("Registro completado")
                navigate("/"); // Redirige a la página principal
            } else {
                setError("Error al registrar: " + response.statusText);
            }
        } catch (error) {
            setError("Error al conectar con el servidor");
            console.error(error);
        }
    };

    return (
        <div className="containerAll">
            <img className="imagenLogo" src="public/Imagenes/Logo.png" />
            <div className="container">
                <h2>Registrate</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formInput">
                        <h3>Nombre usuario *</h3>
                        <input
                            className="inputForm"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <h3>Email *</h3>
                        <input
                            className="inputForm"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3>Contraseña *</h3>
                        <input
                            className="inputForm"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <h3>Repetir contraseña *</h3>
                        <input
                            className="inputForm"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <h3>Dirección *</h3>
                        <input
                            className="inputForm"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <h3>Fecha de nacimiento</h3>
                        <input
                            className="inputForm"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>
                    <div className="buttons">
                        <br />
                        <button type="submit" className="button-form">REGISTRARSE</button>
                        <hr />
                        <Link to="/" ><a className='link-login'>Iniciar Sesión</a></Link>
                    </div>
                    {error && <p className='error' >{error}</p>}
                </form>
            </div>
        </div>
    );
}
