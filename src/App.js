import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GestionSolicitudes from './components/Admin/GestionSolicitudes';
import Home from './components/Home/Home'; 
import Header from './components/Header/Header'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header fijo */}
        <Header />

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestiones" element={<GestionSolicitudes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
