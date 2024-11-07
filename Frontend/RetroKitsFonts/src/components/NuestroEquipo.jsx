// NuestroEquipo.jsx
import React from 'react';
import './../css/AboutUs.css';

export default function NuestroEquipo() {
  return (
    <div className="nuestroEquipo">
      <h3>Nuestro Equipo</h3>
      <div className="imagenesNosotros">
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 1" />
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 2" />
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 3" />
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 4" />
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 5" />
        <img src="/Imagenes/avatar_generico.png" id="nosotros" alt="Miembro del equipo 6" />
      </div>
    </div>
  );
}
