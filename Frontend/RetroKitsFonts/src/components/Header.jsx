import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/HeaderStyles.css";
import CarritoModal from "./CarritoModal"; 
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from 'react-router-dom';


export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { logOut } = useContext(TokenContext);
  const { role } = useContext(TokenContext)

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };

  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleIrAlPerfil = () => {
    if (token) {
      // Verifica si el token está presente (esto indica que el usuario está autenticado)
      navigate("/userprofile"); // Redirige a /userprofile si está autenticado
    } else {
      alert("Debes iniciar sesión para acceder a tu perfil."); // Muestra un mensaje de alerta
      navigate("/login"); // Redirige a /login si no está autenticado
    }
  };

  function handlelogOut(event) {
    event.stopPropagation();
    logOut();
  }

  return (
    <>
      <header>
        {/* Div superior */}
        <div className="arriba-header">Envios 24/48 horas en la península</div>

        {/* Div principal dividido en tres secciones */}
        <div className="contenido-header">
          {/* Sección izquierda: Logo */}
          <Link to={"./"}>
            <div className="header-logo">
              <img className="img-header" src="/Imagenes/Logo.png" alt="Logo" />
            </div>
          </Link>

          {/* Sección central: Navegación principal */}
          <div className="nav-principal">
            <Link to={"AboutUs"}>
              <div>Sobre nosotros</div>
            </Link>
            <Link to={"Catalogo"}>
              <div>Catálogo</div>
            </Link>
            <div>Contacto</div>
          </div>

          {/* Sección derecha: Selector de idioma e iconos */}
          <div className="header-derecha">
            <select className="button-lenguage">
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
            <div className="nav-icons-header">
              {/* Primer icono */}
              {role == "Admin" ? (
                <Link to="/AdminDashboard">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Contenido del SVG */}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0351 0.818653C12.4051 0.54388 12.9251 0.415791 13.4361 0.608958C14.5224 1.02025 15.5313 1.62316 16.4181 2.39085C16.8351 2.75239 16.9881 3.28025 16.9421 3.74715C16.8671 4.52499 16.9991 5.27596 17.3621 5.92261C17.6821 6.49798 18.1641 6.95249 18.7521 7.27271L18.9771 7.38634C19.3911 7.57951 19.7591 7.98134 19.8521 8.53605C20.0508 9.71164 20.0508 10.9139 19.8521 12.0895C19.7691 12.5895 19.4621 12.9644 19.0991 13.1752L18.9771 13.2402C18.2871 13.5605 17.7231 14.0563 17.3611 14.7029C16.9991 15.3506 16.8671 16.1006 16.9421 16.8784C16.9871 17.3453 16.8351 17.8742 16.4181 18.2347C15.5313 19.0024 14.5224 19.6053 13.4361 20.0166C13.2039 20.1024 12.9549 20.1281 12.7108 20.0916C12.4668 20.055 12.2351 19.9573 12.0361 19.8069C11.4201 19.3514 10.7231 19.0931 10.0001 19.0931C9.27705 19.0931 8.58005 19.3503 7.96505 19.8069C7.7659 19.9575 7.53406 20.0553 7.28982 20.0918C7.04558 20.1284 6.79639 20.1026 6.56405 20.0166C5.47775 19.6053 4.46878 19.0024 3.58205 18.2347C3.39421 18.07 3.24824 17.8602 3.15691 17.6238C3.06557 17.3874 3.03163 17.1315 3.05805 16.8784C3.13305 16.1006 3.00005 15.3496 2.63805 14.7029C2.30896 14.1251 1.82664 13.6566 1.24805 13.3528L1.02305 13.2392C0.79735 13.136 0.599571 12.9773 0.447029 12.7769C0.294487 12.5764 0.191833 12.3404 0.148054 12.0895C-0.0506534 10.9139 -0.0506534 9.71164 0.148054 8.53605C0.231054 8.03609 0.538054 7.66111 0.901054 7.45039L1.02305 7.38634C1.71305 7.06508 2.27705 6.57029 2.63905 5.92261C3.00005 5.27596 3.13305 4.52499 3.05805 3.74715C3.03163 3.49407 3.06557 3.23816 3.15691 3.00174C3.24824 2.76533 3.39421 2.5556 3.58205 2.39085C4.46878 1.62316 5.47775 1.02025 6.56405 0.608958C6.79625 0.523165 7.04525 0.497421 7.2893 0.533975C7.53334 0.570529 7.76501 0.668269 7.96405 0.818653C8.57905 1.27523 9.27605 1.53244 10.0001 1.53244C10.7241 1.53244 11.4201 1.27523 12.0351 0.818653ZM12.9921 2.646C12.1261 3.23479 11.1051 3.5984 10.0001 3.5984C8.89505 3.5984 7.87405 3.23376 7.00805 2.646C6.31195 2.93639 5.65887 3.32655 5.06805 3.805C5.12805 4.87207 4.92305 5.96703 4.37105 6.95559C3.81805 7.94312 3.00305 8.67344 2.07805 9.15377C1.97281 9.92192 1.97281 10.7016 2.07805 11.4697C3.00305 11.95 3.81805 12.6804 4.37105 13.67C4.92305 14.6565 5.12805 15.7514 5.06805 16.8185C5.65881 17.2973 6.31189 17.6878 7.00805 17.9785C7.87405 17.3897 8.89505 17.0261 10.0001 17.0261C11.1051 17.0261 12.1261 17.3908 12.9921 17.9785C13.6882 17.6881 14.3412 17.298 14.9321 16.8195C14.8721 15.7514 15.0771 14.6565 15.6291 13.6689C16.1811 12.6804 16.9971 11.95 17.9221 11.4687C18.0271 10.7012 18.0271 9.92228 17.9221 9.1548C16.9971 8.67343 16.1821 7.94312 15.6291 6.95456C15.0771 5.96703 14.8721 4.87207 14.9321 3.80397C14.3412 3.32552 13.6882 2.93639 12.9921 2.646ZM10.0001 6.18085C11.0609 6.18085 12.0783 6.61618 12.8285 7.39107C13.5786 8.16595 14.0001 9.21692 14.0001 10.3128C14.0001 11.4086 13.5786 12.4596 12.8285 13.2345C12.0783 14.0094 11.0609 14.4447 10.0001 14.4447C8.93919 14.4447 7.92177 14.0094 7.17163 13.2345C6.42148 12.4596 6.00005 11.4086 6.00005 10.3128C6.00005 9.21692 6.42148 8.16595 7.17163 7.39107C7.92177 6.61618 8.93919 6.18085 10.0001 6.18085ZM10.0001 8.24681C9.46962 8.24681 8.96091 8.46448 8.58584 8.85192C8.21077 9.23936 8.00005 9.76485 8.00005 10.3128C8.00005 10.8607 8.21077 11.3862 8.58584 11.7736C8.96091 12.1611 9.46962 12.3787 10.0001 12.3787C10.5305 12.3787 11.0392 12.1611 11.4143 11.7736C11.7893 11.3862 12.0001 10.8607 12.0001 10.3128C12.0001 9.76485 11.7893 9.23936 11.4143 8.85192C11.0392 8.46448 10.5305 8.24681 10.0001 8.24681Z"
                      fill="white"
                    />
                  </svg>
                </Link>

              ) : ""}
              
              {/* Icono del carrito con evento onClick */}
              <div onClick={toggleCartModal} style={{ cursor: "pointer" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Contenido del SVG del carrito */}
                  <path
                    d="M4.15177 4L6.01977 16.136C6.05296 16.378 6.17362 16.5996 6.35895 16.7587C6.54429 16.9179 6.78149 17.0037 7.02577 17H18.0098C18.2249 17 18.4343 16.9307 18.6069 16.8022C18.7795 16.6738 18.906 16.4931 18.9678 16.287L21.9678 6.287C22.0125 6.13769 22.0217 5.97999 21.9947 5.82649C21.9676 5.67299 21.9051 5.52793 21.812 5.4029C21.7189 5.27787 21.5979 5.17632 21.4586 5.10637C21.3193 5.03642 21.1656 4.99999 21.0098 5H6.32977L5.99977 2.862C5.96579 2.61746 5.84255 2.39412 5.65377 2.235C5.4693 2.07965 5.23491 1.99619 4.99377 2H3.00977C2.74455 2 2.4902 2.10536 2.30266 2.2929C2.11512 2.48043 2.00977 2.73479 2.00977 3C2.00977 3.26522 2.11512 3.51957 2.30266 3.70711C2.4902 3.89465 2.74455 4 3.00977 4H4.15177ZM7.86777 15L6.63777 7H19.6658L17.2658 15H7.86777ZM10.0098 20C10.0098 20.5304 9.79905 21.0391 9.42398 21.4142C9.04891 21.7893 8.5402 22 8.00977 22C7.47933 22 6.97062 21.7893 6.59555 21.4142C6.22048 21.0391 6.00977 20.5304 6.00977 20C6.00977 19.4696 6.22048 18.9609 6.59555 18.5858C6.97062 18.2107 7.47933 18 8.00977 18C8.5402 18 9.04891 18.2107 9.42398 18.5858C9.79905 18.9609 10.0098 19.4696 10.0098 20ZM19.0098 20C19.0098 20.5304 18.7991 21.0391 18.424 21.4142C18.0489 21.7893 17.5402 22 17.0098 22C16.4793 22 15.9706 21.7893 15.5956 21.4142C15.2205 21.0391 15.0098 20.5304 15.0098 20C15.0098 19.4696 15.2205 18.9609 15.5956 18.5858C15.9706 18.2107 16.4793 18 17.0098 18C17.5402 18 18.0489 18.2107 18.424 18.5858C18.7991 18.9609 19.0098 19.4696 19.0098 20Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Icono de login */}
              <div className="svg3" onClick={handleIrAlPerfil} style={{ cursor: "pointer" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Contenido del SVG de login */}
                  <path
                    d="M13.7774 10.7038C14.7626 9.93293 15.4817 8.8758 15.8347 7.67951C16.1877 6.48322 16.157 5.20726 15.7468 4.02914C15.3367 2.85103 14.5675 1.82934 13.5463 1.10622C12.5251 0.383098 11.3027 -0.00549316 10.0491 -0.00549316C8.79545 -0.00549316 7.57301 0.383098 6.55181 1.10622C5.5306 1.82934 4.76142 2.85103 4.35128 4.02914C3.94113 5.20726 3.91041 6.48322 4.26339 7.67951C4.61638 8.8758 5.33551 9.93293 6.32074 10.7038C4.63252 11.3765 3.15949 12.4921 2.05869 13.9319C0.957887 15.3716 0.270575 17.0815 0.0700265 18.8791C0.0555097 19.0104 0.0671288 19.1432 0.10422 19.2699C0.141311 19.3967 0.203148 19.515 0.2862 19.618C0.453932 19.8261 0.697895 19.9593 0.964421 19.9885C1.23095 20.0176 1.4982 19.9403 1.7074 19.7735C1.91659 19.6067 2.05058 19.3641 2.0799 19.099C2.30057 17.1453 3.23728 15.341 4.71105 14.0307C6.18482 12.7204 8.09234 11.9961 10.0692 11.9961C12.046 11.9961 13.9535 12.7204 15.4273 14.0307C16.901 15.341 17.8377 17.1453 18.0584 19.099C18.0857 19.3446 18.2036 19.5714 18.3891 19.7356C18.5747 19.8999 18.8149 19.99 19.0634 19.9885H19.1739C19.4373 19.9583 19.6781 19.8259 19.8437 19.6199C20.0094 19.414 20.0865 19.1513 20.0582 18.8891C19.8567 17.0864 19.1657 15.3721 18.0593 13.9302C16.9528 12.4882 15.4726 11.3729 13.7774 10.7038ZM10.0491 9.99424C9.25403 9.99424 8.47685 9.75978 7.81581 9.3205C7.15476 8.88123 6.63954 8.25688 6.33529 7.52639C6.03105 6.79591 5.95144 5.99211 6.10655 5.21663C6.26165 4.44115 6.64449 3.72883 7.20667 3.16974C7.76884 2.61066 8.48509 2.22991 9.26485 2.07566C10.0446 1.92141 10.8528 2.00058 11.5874 2.30315C12.3219 2.60573 12.9497 3.11812 13.3914 3.77554C13.8331 4.43296 14.0688 5.20587 14.0688 5.99654C14.0688 7.0568 13.6453 8.07363 12.8915 8.82334C12.1376 9.57305 11.1152 9.99424 10.0491 9.99424Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Incluye el CarritoModal */}
      <CarritoModal isOpen={isCartOpen} onClose={toggleCartModal} />
    </>
  );
}
