import './FormStyle.css';

export default function DivForm({ children, menssgeError }) {
    return (
        <div className="form-container">
            <div  className='form-input-container'>
                {children}
                <p className='message-error'>{menssgeError}</p>
            </div>
        </div>
    );
}