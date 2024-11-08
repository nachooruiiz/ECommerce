// AboutUs.jsx
import React from 'react';
import '../css/AboutUs.css'; // Ajusta la ruta de CSS correctamente
import SobreNosotros from '../components/SobreNosotros'; // Ruta hacia el componente
import QueHacemos from '../components/QueHacemos';       // Ruta hacia el componente
import NuestroEquipo from '../components/NuestroEquipo'; // Ruta hacia el componente

export default function AboutUs() {
  return (
    <div className="aboutUsContainer">
      <SobreNosotros />
      <QueHacemos />
      <NuestroEquipo />
    </div>
  );
}
