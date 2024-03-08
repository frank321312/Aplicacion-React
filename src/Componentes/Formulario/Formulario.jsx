import { useEffect, useState } from 'react';
import axios from 'axios';
import './FormStyle.css';
import { useNavigate } from 'react-router-dom';
import DivForm from './DivForm';

export default function FormRegister() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [bool, setBool] = useState(false);
    const navigate = useNavigate();

    const add = () => {
        axios.post("http://localhost:8001/register", {
            nombre: nombre,
            email: email,
            password: password,
            verificar: bool
        }).then((response) => {
            console.log(response.data);
            setError(response.data.error);
            if (!response.data.error) {
                navigate("/verificar-codigo");
            }
        });
    }

    useEffect(() => {
        axios.get("http://localhost:8001/usuarioNoValidados").then((response) => {
            const valor = response.data.results.find(x => x.correoElectronico === email);
            
            if (valor === undefined) {
                setBool(false);
            } else {
                setBool(true);
            }
        })
    }, [email])

    return (
        <DivForm menssgeError={error}>
            <header>
                <h1 className='title'>Registrarse</h1>
            </header>
            <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                name='nombre' 
                className='input__form' 
                placeholder='Nombre de usuario'
            />
            <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                name='email' 
                className='input__form' 
                placeholder='Correo electronico'
            />
            <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name='password' 
                className='input__form'
                placeholder='Contraseña'
             />
            <button type='submit' onClick={add} className='btn-submit'>Registrarse</button>
        </DivForm>
    );
}

export function ComponenteExito() {
    return (
        <h1>Los datos se enviaron correctamente</h1>
    );
}