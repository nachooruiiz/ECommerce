import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Header}  from "./../components/Header";
import {Footer} from "./../components/Footer";
import LoginForm  from "./../components/LoginForm";
import RegisterForm from "./../components/RegisterForm";
import './../css/estilosGenerales.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes className="margen-arriba">
        <Route path="/" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
