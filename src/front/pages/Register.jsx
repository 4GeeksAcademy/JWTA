import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

export const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleRegister = async () => {
    
    const userData = {
        username: formData.name, 
        password: formData.password,
        email: formData.email    
    };
    try {
        const response = await fetch(`${baseUrl}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        
            const data = await response.json();
        
            if (response.status >= 200 && response.status < 300) {
              alert("Registro completado con éxito!");
              console.log("Respuesta del backend:", data);
      
              setFormData(userData);    
              navigate("/login");
      
            } else {
              alert(`Error: ${data.error || data.message}`);
            }
          } catch (error) {
            console.error("Error al conectar con el backend:", error);
            alert("Hubo un problema al intentar registrarte.");
          }
        };

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center d-grid gap-4">
                    <h2>Página de registro</h2>
                    <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    />
                    <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    />
                    <button onClick={handleRegister} className="btn btn-primary text-white my-4 w-100">
                    Confirmar y Registrarse
                    </button>
                </div>
            </div>
        );
}