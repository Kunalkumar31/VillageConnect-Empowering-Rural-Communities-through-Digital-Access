
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token ? children : <Navigate to="/login" />;
}