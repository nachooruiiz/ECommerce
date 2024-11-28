import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";
import DetalleDeProducto from "./pages/DetalleDeProducto";
import "./../src/css/estilosGenerales.css";
import Carrito from "./pages/Carrito";
import { CartProvider } from './context/CartContext'; // Importa el CartProvider
import { TokenProvider } from "./context/TokenContext";

function App() {
  return (
    <TokenProvider>
      <CartProvider> {/* Envuelve tu aplicación con CartProvider */}
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Catalogo" element={<Catalogo />} />
            {/* Ruta dinámica para los detalles del producto */}
            <Route path="/Catalogo/:id" element={<DetalleDeProducto />} />
            <Route path="/Carrito" element={<Carrito/>}/>
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </TokenProvider>
  );
}

export default App;
