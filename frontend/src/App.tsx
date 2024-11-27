import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// CSS GLOBAL
import "./App.css";
import "./assets/scss/theme.scss";

// Páginas
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Main";
import Corrida from "./pages/Corrida";
import HistoricoCorridas from "./components/listagemHistorico";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/corrida" element={<Corrida />} />
        <Route path="/historico" element={<HistoricoCorridas />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
