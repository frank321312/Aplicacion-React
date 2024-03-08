import { useState } from "react";
import DivForm from "./DivForm";

export default function FormCode() {
    const [error, setError] = useState("");
    const [number, setNumber] = useState("");

    return (
        <DivForm menssgeError={error}>
            <header>
                <h1 className='title'>
                    Verificar codigo
                </h1>
            </header>
            <input 
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            className='input__form' 
            placeholder="Inserte el codigo"
            />
            <button type="submit" className="btn-submit">Valdar Codigo</button>
        </DivForm>
    );
}