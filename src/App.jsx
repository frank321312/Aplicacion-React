import './App.css';
import FormRegister from './Componentes/Formulario/Formulario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormCode from './Componentes/Formulario/FormularioCodigo';
import PaginaBase from './Componentes/PaginaInicial/PaginaBase';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormRegister />}/>
        <Route path='/verificar-codigo' element={<FormCode />}/>
        <Route path='/wordchat' element={<PaginaBase />}/>
      </Routes>
    </Router>
  );
}

export default App;
