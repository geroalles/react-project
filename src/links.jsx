import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css';
function LinksPage() {
    return (
        <div id="links-container">
            <h1>Links</h1>
            
            <MedicationButton to="https://tailwindcss.com/docs/animation">Solicitudes de Medicamentos</MedicationButton>
            <AlmuerzosButton to="https://tailwindcss.com/docs/animation">Almuerzos</AlmuerzosButton>
        </div>

    )


}


function MedicationButton({ type = 'button', children, to }) {
    const handleClick = () => {
        if (to) {
            window.open(to, '_blank', 'noopener,noreferrer'); //abre eñ link en otra pestaña de forma segura
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            className="bg-blue-500 transition delay-700 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
            {children}
        </button>
    );
}

function AlmuerzosButton({ type = 'button', children, to }) {
    const handleClick = () => {
        if (to) {
            window.open(to, '_blank', 'noopener,noreferrer'); //abre eñ link en otra pestaña de forma segura
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            className="bg-blue-500 transition delay-700 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
            {children}
        </button>
    );
}




const root = createRoot(document.getElementById('links'))
root.render(<LinksPage />)
