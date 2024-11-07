import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HomePage from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";
import "./../src/css/estilosGenerales.css"

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/login" element={<LoginForm />} />    
          <Route path="/register" element={<RegisterForm />} /> 
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Catalogo" element={<Catalogo />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
