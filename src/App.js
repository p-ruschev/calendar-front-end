import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import ErrorBoundary from "./ErrorBoundary.js";
import Header from "./components/Header/Header.js";
import { AuthProvider } from "./contexts/AuthContext";
import { HeaderProvider } from "./contexts/HeaderContext";
import { ErrorProvider } from "./contexts/ErrorContext";
import CalendarAgenda from "./components/CalendarAgenda/CalendarAgenda.js";
import Register from "./components/Register/Register.js";
import Login from "./components/Login/Login.js";
import Home from "./components/Home/Home.js";
import Footer from "./components/Footer/Footer.js";
import AboutAuthor from "./components/AboutAuthor/AboutAuthor.js";

function App() {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <AuthProvider>
          <HeaderProvider>
            <div className="app">
              <Header />
              <Routes className="main">
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutAuthor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar/*" element={<CalendarAgenda />} />
                <Route
                  path="/*"
                  element={<h1 className="wrong-url">невалиден адрес</h1>}
                />
              </Routes>
              <Footer />
            </div>
          </HeaderProvider>
        </AuthProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default App;
