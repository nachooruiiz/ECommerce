import React, { useState, useEffect } from "react";

const Resenas = ({ productId, token }) => {
  const [resena, setResena] = useState("");
  const [resenas, setResenas] = useState([]);
  const [totalResenas, setTotalResenas] = useState(0);

  // Cargar las reseñas al montar el componente
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
  }, [productId]); // Dependencia de productId para actualizar las reseñas cuando cambie

  // Enviar una nueva reseña
  const enviarResena = async () => {
    if (!resena.trim()) {
      alert("Por favor, escribe una reseña.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7261/api/Review/CreateReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({
          Comment: resena,
          productId: productId,
          DateCreated: new Date() 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Añadir la nueva reseña a la lista
        setResenas((prevResenas) => [
          ...prevResenas,
          { Comment: resena, productId, DateCreated: new Date() }
        ]);
        setTotalResenas((prevTotal) => prevTotal + 1);
        setResena(""); // Limpiar la caja de texto
        alert(data.message || "Reseña enviada con éxito.");
      } else {
        setResena(""); // Limpiar la caja de texto
        console.error("Error al enviar la reseña");
        alert("Ocurrió un error al enviar la reseña. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div>
      <h2>Deja tu reseña</h2>
      <textarea
        value={resena}
        onChange={(e) => setResena(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Escribe tu reseña aquí..."
      ></textarea>
      <br />
      <button onClick={enviarResena}>Enviar Reseña</button>
      <p>Total de Reseñas: {totalResenas}</p>

      <h3>Reseñas</h3>
      {resenas.length > 0 ? (
        <ul>
          {resenas.map((r, index) => (
            <li key={index}>
              <p><strong>Usuario:</strong> {token}</p>
              <p>{r.Comment}</p>
              <p><em>{new Date(r.DateCreated).toLocaleString()}</em></p>
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
