import './../css/estilosReusables.css';
import './../css/estilosGenerales.css'
import "./Home_module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
    return (
        <div className='main'>
            <a name="arriba"></a>
            <a href="#arriba">
                <img
                    src="Imagenes/flecha.png"
                    width="50px"
                    class="flecha"
                />
            </a>
            <div className='carrusel'>
                <h2>AQUÍ VA EL CARRUSEL</h2>
                <img alt='aquí va la imagen'/>
                <div>X</div>
                <div>X</div>
                <div>X</div>
            </div>
            <hr/>
            <div className='colecciones'>
                <h2>PRODUCTOS DESTACADOS</h2>
                <div className='containerTarjetas'>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                </div>
                <button className='button-general'>Ver más</button>
            </div>
            <hr/>
            <div className='colecciones'>
                <h2>NUESTRAS LIGAS</h2>
                <div className='containerTarjetas'>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                    <div>
                        <img src="" alt="la imagen no puede cargar"></img>
                    </div>
                </div>
                <button className='button-general'>Ver más</button>
            </div>
        </div>
    );
}
