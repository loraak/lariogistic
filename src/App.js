import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GestionSolicitudes from './components/Interfaces/GestionSolicitudes';
import Home from './components/Home/Home'; 
import Header from './components/Header/Header'; 
import Tramites from './components/Interfaces/Tramites';
import Login from './components/Auth/login';

function AppContent() {
  return (
      <div className="App">
        {/* Header fijo - Se muestra en todas las páginas */}
        <Header />

        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestiones" element={<GestionSolicitudes />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
}

function App() { 
  return (
    <Router>
      <AppContent /> 
    </Router>
  ); 
}

export default App;