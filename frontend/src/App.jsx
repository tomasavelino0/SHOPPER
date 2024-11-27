import PropTypes from "prop-types";
import React from "react";

import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//CSS GLOBAL
import "./App.css";

// Import scss
import "./assets/scss/theme.scss";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/dashBoard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};


export default App
