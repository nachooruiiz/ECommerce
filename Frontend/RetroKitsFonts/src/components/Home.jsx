import React, { useState, useEffect } from 'react';
import './../css/estilosReusables.css';
import './../css/home.css'
import { Link } from 'react-router-dom';
import imagen1 from "/Imagenes/C1.jpg";
import imagen2 from "/Imagenes/C2.jpg";
import imagen3 from "/Imagenes/C3.jpg";
import destacado1 from "/Imagenes/2.jpg";
import destacado2 from "/Imagenes/3.jpg";
import destacado3 from "/Imagenes/4.jpg";
import liga1 from "/Imagenes/LALIGA.png"
import liga2 from "/Imagenes/PREMIER.png"
import liga3 from "/Imagenes/RESTO-2.png"

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [imagen1, imagen2, imagen3];

  const moveSlide = (direction) => {
    const totalSlides = images.length;
    setCurrentIndex((prevIndex) => (prevIndex + direction + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Sección del Carrusel */}
      <div className="carousel">
        <div 
          className="carousel-slide" 
          style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease' }}
        >
          {images.map((src, index) => (
            <img key={index} src={src} alt={`C ${index + 1}`} />
          ))}
        </div>
        <button className="carousel-btn prev" onClick={() => moveSlide(-1)}>❮</button>
        <button className="carousel-btn next" onClick={() => moveSlide(1)}>❯</button>
      </div>
      <hr></hr>

      <div className="productos-destacados">
        <h1>Productos Destacados</h1>
        <div className="productos-galeria">
          <img src={destacado1} alt="Producto Destacado 1" />
          <img src={destacado2} alt="Producto Destacado 2" />
          <img src={destacado3} alt="Producto Destacado 3" />
        </div>
        <Link to="/catalogo">
          <button className="ver-catalogo-btn">Ver Catálogo</button>
        </Link>
      </div>

      <div className="productos-destacados">
        <h1>Ligas</h1>
        <div className="productos-galeria">
          <img src={liga1} alt="Liga 1" />
          <img src={liga2} alt="Liga 2" />
          <img src={liga3} alt="Liga 3" />
        </div>
        <Link to="/catalogo">
          <button className="ver-catalogo-btn">Ver Catálogo</button>
        </Link>
      </div>
    </div>
  );
}
