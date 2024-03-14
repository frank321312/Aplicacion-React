import { useState } from "react";
import DivForm from "./DivForm";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormCode() {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const location = useLocation();
    const datos = location.state?.datos;
    const navigate = useNavigate();

    const verificarCode = () => {
        axios.post("http://localhost:8001/validar-codigo", {
            code: number,
            email: datos.mensaje
        }).then((respuesta) => {
            setError(respuesta.data.error)
            if (!respuesta.data.error) {
                navigate("/wordchat");
            }
        });
    }

    return (
        <DivForm menssgeError={error}>
            <header 
            style={{
                marginBottom: "5px",
            }}>
                <h1 className='title'>
                    Verificar codigo
                </h1>
                <p >Se ha enviado un codigo de verificación a <span style={{color: "rgb(35, 95, 226)"}}>{datos.mensaje}</span></p>
            </header>
            <input 
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            className='input__form' 
            placeholder="Inserte el codigo"
            />
            <button type="submit" onClick={verificarCode} className="btn-submit">Valdar Codigo</button>
        </DivForm>
    );
}