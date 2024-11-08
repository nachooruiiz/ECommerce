// SobreNosotros.jsx
import React from 'react';
import './../css/AboutUs.css';

export default function SobreNosotros() {
  return (
    <div className="sobreNosotros">
      <img src="/Imagenes/Reunion_IMG.jpg" id="sobreNosotrosIMG" alt="Imagen sobre nosotros" />
      <div className="texto1">
        <h2>Sobre nosotros</h2>
        <hr />
        <p>
          En Retrokits, vivimos y respiramos la pasión por el fútbol y el amor
          por la historia detrás de cada camiseta. Nos especializamos en
          ofrecer una colección exclusiva de camisetas vintage de fútbol, cada
          una con su propia historia y encanto. Nuestro objetivo es conectar a
          los fanáticos con los momentos legendarios de sus equipos y jugadores
          favoritos, reviviendo la nostalgia de aquellos partidos inolvidables.
        </p>
        <p>
          Somos más que una tienda de camisetas; somos una comunidad de
          entusiastas que comparte el mismo respeto y admiración por las raíces
          del fútbol. Cada prenda en Retrokits es cuidadosamente seleccionada
          para asegurar autenticidad y calidad, ofreciendo a nuestros clientes
          piezas únicas que trascienden el tiempo.
        </p>
        <p>
          ¡Únete a nosotros en este viaje a través de la historia del fútbol y
          lleva contigo un pedazo de su legado!
        </p>
      </div>
    </div>
  );
}
