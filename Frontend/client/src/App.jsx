import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Services from "./pages/Services";
import CreateService from "./pages/CreateService";
import Forum from "./pages/Forum";
import CreatePost from "./pages/CreatePost";
import Chat from "./pages/Chat";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import Policy from './pages/Policy'
import TermsAndConditions from "./pages/TermsAndConditions";

export default function App() {
  return (

    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/create"
          element={
            <ProtectedRoute>
              <CreateService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy" element={<Policy />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
              <img
                src="https://illustrations.popsy.co/gray/404-error.svg"
                alt="404 Not Found"
                className="w-80 mb-8"
              />
              <h1 className="text-5xl font-bold text-blue-700 mb-3">404</h1>
              <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                Oops! The page you're looking for doesn't exist or may have been moved.
              </p>
              <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Go Back Home
              </Link>
            </div>
          }
        />
      </Routes>
    </div>


  );

}
