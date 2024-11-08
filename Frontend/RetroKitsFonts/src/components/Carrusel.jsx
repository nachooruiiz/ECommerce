import imagen1 from "/Imagenes/C1.jpg";
import imagen2 from "/Imagenes/C2.jpg";
import imagen3 from "/Imagenes/C3.jpg";
import './../css/home.css';
import React, { useState, useEffect } from 'react';

export default function Carrusel(){
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

  return(
    <>
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
      <hr />
    </>
  )
  
}