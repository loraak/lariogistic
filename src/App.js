// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import GestionSolicitudes from './components/Interfaces/GestionSolicitudes';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Tramites from './components/Interfaces/Tramites';
import Login from './components/Auth/login';
import Usuarios from './components/Interfaces/Usuarios';
import DepartamentoGerente from './components/Interfaces/DepartamentoGerente';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';

function AppContent() {
    return (
        <div className="App">
            <Header />
            <Routes>
                {/* --- Ruta Pública --- */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                {/* Accesible para todos los usuarios autenticados */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

                {/* Solo para Admin */}
                <Route
                    path="/usuarios"
                    element={<ProtectedRoute roles={[1]}><Usuarios /></ProtectedRoute>}
                />

                {/* Solo para Jefe */}
                <Route
                    path="/gestiones"
                    element={<ProtectedRoute roles={[2]}><GestionSolicitudes /></ProtectedRoute>} // <-- Cambio aquí
                />
                <Route
                    path="/depgerente"
                    element={<ProtectedRoute roles={[2]}><DepartamentoGerente /></ProtectedRoute>} // <-- Cambio aquí
                />

                {/* Solo para Usuario normal */}
                <Route
                    path="/tramites"
                    element={<ProtectedRoute roles={[3]}><Tramites /></ProtectedRoute>} 
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;