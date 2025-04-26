import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;
export const Login = () => {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {

                localStorage.setItem("access_token", data.access_token);
                navigate("/profile");
            } else {
                setError(data.message || "Error al iniciar sesión");
            }

        } catch (err) {
            console.error(err);
            setError("Ocurrió un error inesperado");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
            
                <div className="d-flex flex-column align-items-center text-center">
                    <h2 className="text-xl font-bold mt-4">Iniciar Sesión</h2>

                    <input
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-50 p-2 mt-3 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-50 p-2 mt-3 border rounded"
                    />
                    <button onClick={handleLogin} className="mt-4 p-2 btn bg-primary">
                        Iniciar sesión
                    </button>
                    <button className="btn btn secondary">
                        <Link to="/register">Crear Cuenta</Link>
                    </button>
            </div>
        </div>
    );
};