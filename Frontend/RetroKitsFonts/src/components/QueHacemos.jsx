// QueHacemos.jsx
import React from 'react';
import './../css/AboutUs.css';

export default function QueHacemos() {
  return (
    <div className="queHacemos">
      <div className="texto1">
        <h2>Qué Hacemos</h2>
        <hr className='hr-blanco'/>
        
        <p>
          En Retrokits, nos dedicamos a traer de vuelta la magia de las
          camisetas de fútbol vintage. Rescatamos y seleccionamos con
          dedicación camisetas icónicas de clubes y selecciones de todo el
          mundo, ofreciéndote la oportunidad de revivir momentos históricos y
          sentir la autenticidad de cada época. Cada camiseta cuenta una
          historia, y nuestro trabajo es conservarla y hacerla accesible para
          los verdaderos aficionados al fútbol.
        </p>
        <p>
          Nos esforzamos por mantener un catálogo diverso, que incluye
          camisetas raras, ediciones limitadas y modelos que dejaron huella en
          la memoria futbolística. Desde clásicos de los 70s y 80s hasta
          reliquias de los 90s y principios de los 2000s, nuestra misión es
          brindarte productos de calidad que te conecten con la esencia y el
          estilo de cada década.
        </p>
        <p>
          Más que vender camisetas, en Retrokits ofrecemos una experiencia para
          los fanáticos que, como nosotros, valoran el significado detrás de
          cada prenda.
        </p>
      </div>
      <img src="/Imagenes/4_Camisetas.jpg" id="sobreNosotrosIMG" alt="Imagen que hacemos" />
    </div>
  );
}
