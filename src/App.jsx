import './App.css';
import FormRegister from './Componentes/Formulario/Formulario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormCode from './Componentes/Formulario/FormularioCodigo';

// const [mensaje, setMensaje] = useState("");

// useEffect(() => {
//   fetch("/inicio",)
//     .then(respuesta => respuesta.json())
//     .then(data => setMensaje(data.message)); 
// }, []);

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormRegister />}/>
        <Route path='/verificar-codigo' element={<FormCode />}/>
      </Routes>
    </Router>
  );
}

export default App;
