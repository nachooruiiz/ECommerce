import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./../components/Header";
import { Footer } from "./../components/Footer";
import Home from "./../components/Home";
import LoginForm from "./../components/LoginForm";
import RegisterForm from "./../components/RegisterForm";
import './../css/estilosGenerales.css';

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />          
          <Route path="/login" element={<LoginForm />} />    
          <Route path="/register" element={<RegisterForm />} /> 
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
