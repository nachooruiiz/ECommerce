import React, { useState, useEffect } from "react";

const Resenas = ({ productId, token }) => {
  const [resena, setResena] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [resenas, setResenas] = useState([]);
  const [totalResenas, setTotalResenas] = useState(0);

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const response = await fetch(`https://localhost:7261/api/Review/review${productId}`);
        if (response.ok) {
          const data = await response.json();
          setResenas(data);
          setTotalResenas(data.length);
        } else {
          console.error("Error al cargar las reseñas");
        }
      } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
      }
    };

    fetchResenas();
  }, [productId]);

  const enviarResena = async () => {
    if (!resena.trim() || estrellas < 1) {
      alert("Por favor, escribe una reseña y elige una calificación.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7261/api/Review/CreateReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Comment: resena,
          Rating: estrellas,
          ProductId: productId,
          DateCreated: new Date(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResenas((prevResenas) => [
          ...prevResenas,
          { name: "Usuario", comment: resena, rating: estrellas },
        ]);
        setTotalResenas((prevTotal) => prevTotal + 1);
        setResena("");
        setEstrellas(0);
      } else {
        console.error("Error al enviar la reseña");
        alert("Ocurrió un error al enviar la reseña. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const seleccionarEstrella = (indice) => {
    setEstrellas(indice + 1); // Actualiza el número de estrellas seleccionadas
  };

  return (
    <div className="reviews">
      <h1>Deja tu reseña</h1>
      <div className="calificacion-estrellas">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`estrella ${index < estrellas ? "seleccionada" : ""}`}
            onClick={() => seleccionarEstrella(index)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="caja-reviews"
        value={resena}
        onChange={(e) => setResena(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Escribe tu reseña aquí..."
      ></textarea>
      <br />
      
      <br />
      <button onClick={enviarResena} className="boton-reviews">
        Enviar Reseña
      </button>

      <h2>Reseñas</h2>
      {resenas.length > 0 ? (
        <ul className="lista-reviews">
          {resenas.map((r, index) => (
            <li key={index} className="review-item">
              <h3 className="review-nombre">{r.name}</h3>
              <p className="review-estrellas">
                {"★".repeat(r.rating)}{" "}
                {"☆".repeat(5 - r.rating)}
              </p>
              <p className="review-comentario">{r.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reseñas todavía.</p>
      )}
    </div>
  );
};

export default Resenas;