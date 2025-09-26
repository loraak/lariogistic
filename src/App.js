import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GestionSolicitudes from './components/Interfaces/GestionSolicitudes';
import Home from './components/Home/Home'; 
import Header from './components/Header/Header'; 
import Tramites from './components/Interfaces/Tramites';

function AppContent() {
  return (
      <div className="App">
        {/* Header fijo - Se muestra en todas las páginas */}
        <Header />

        {/* Contenedor principal para el contenido */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gestiones" element={<GestionSolicitudes />} />
            <Route path="/tramites" element={<Tramites />} />
          </Routes>
        </main>
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