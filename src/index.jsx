
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import './styles/App.css';


function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://55bc-181-30-186-146.ngrok-free.app/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login exitoso');
                window.location.href = '/links.html';

                console.log(data.user);
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Error al conectar con el servidor');
        }
    };



    //Vista que voy a mostrar en el index.html
    return (

        <div>
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="text-x1 font-bold text-white-600">Login con Tailwind !</h1>
                {error && <div className="error">{error}</div>}

                <div className="form-group flex flex-col items-center mt-6">

                    <label htmlFor="email" id="input_email" className="font-bold">Usuario</label>
                    <InputUser value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-group flex flex-col items-center mb-4">
                    <label htmlFor="password" className="font-bold">Contraseña</label>
                    <InputPassword value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="flex justify-center">
                    <MyButton type="submit">Ingresar</MyButton>

                </div>

            </form>
        </div>

    )
}


function InputUser({ value, onChange }) {
    return (
        <input
            type="email"
            id="email"
            name="email"
            value={value}
            onChange={onChange}
            required
            className="w-70 px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

function InputPassword({ value, onChange }) {
    return (
        <input
            type="password"
            id="password"
            name="password"
            value={value}
            onChange={onChange}
            required
            className="w-70 px-3 py-2 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

function MyButton({ type = 'button', children }) {
    return (
        <button type={type} class="bg-blue-500 transition delay-700 duration-700 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
            {children}
        </button>
    )
}

const root = createRoot(document.getElementById('root')); //Busco en el index.html el elemento con id root
root.render(<App />);  //Renderizo el conenido de App() dentro de root


