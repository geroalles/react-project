import { createRoot } from 'react-dom/client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './styles/App.css';

function Medications() {
    const [dni, setDni] = useState('')
    const [medication, setMedication] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleMedications = async (e) => {
        e.preventDefault();

        try {
            if (!dni || !medication || !amount) {
                alert("Por favor, completá todos los campos.");
                return;
            }

            const response = await fetch(`https://8fce-181-30-186-146.ngrok-free.app/api/medications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                credentials: 'include',
                body: JSON.stringify({ dni, medication, amount })
            });

            const data = await response.json();

            if (response.ok) {

                alert('Solicitud creada con exito');
                navigate('/links');

                //console.log(data.user);
            } else {
                alert(data.message || 'Hubo problemas al crear la solicitud');
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Error al conectar con el servidor');
        }
    };



    //Vista que voy a mostrar en el index.html
    return (
        <div className="overflow-x-hidden">
            <form className="w-full max-w-md bg-white" onSubmit={handleMedications}>
                <h1 className="text-xl font-bold text-center text-white-600 mb-4">Solicitud de Medicamentos</h1>
                {error && <div className="error">{error}</div>}

                <div className="form-group flex flex-col items-center mt-6 gap-4">


                    <div className="flex flex-col items-center">
                        <label htmlFor="dni" className="font-bold mb-1">DNI:</label>
                        <InputDni value={dni} onChange={e => setDni(e.target.value)} />
                    </div>


                    <div className="flex justify-center gap-x-3">

                        <div className="flex flex-col items-center">
                            <label htmlFor="input_medication" className="font-bold">Medicamento:</label>
                            <InputMedication value={medication} onChange={e => setMedication(e.target.value)} />
                        </div>

                        <div className="flex flex-col items-center">
                            <label htmlFor="amount" className="font-bold">Cantidad:</label>
                            <InputAmount value={amount} onChange={e => setAmount(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    <MyButton type="submit">Solicitar</MyButton>

                    <BackButton />

                </div>

            </form>
        </div>

    )
}


function InputDni({ value, onChange }) {
    return (
        <input
            type="number"
            id="dni"
            name="dni"
            value={value}
            onChange={onChange}
            required
            className="w-70 px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

function InputMedication({ value, onChange }) {
    return (
        <input
            type="text"
            id="medication"
            name="medication"
            value={value}
            onChange={onChange}
            required
            className="w-70 px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}
function InputAmount({ value, onChange }) {
    return (
        <input
            type="number"
            id="amount"
            name="amount"
            value={value}
            onChange={onChange}
            required
            className="w-20 px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

function MyButton({ type = 'button', children }) {
    return (
        <button
            className="w-full max-w-[120px] sm:max-w-[160px] px-2 py-2 bg-blue-500 rounded text-white text-sm transition delay-700 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
        >


            {children}
        </button>
    )
}


function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/links')}
            className="w-full max-w-[120px] sm:max-w-[160px] px-2 py-2 bg-blue-500 rounded text-white text-sm transition delay-700 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
        >
            Volver
        </button>
    );
}

export default Medications;

