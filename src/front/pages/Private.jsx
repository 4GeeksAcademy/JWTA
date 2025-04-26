import React from "react";
import { Navigate } from "react-router-dom";

export const Private = ({ children }) => {
    const token = localStorage.getItem("access_token");

    // redirige al login
    if (!token) {
        return <Navigate to="/login" />;
    }


    return children;
};
