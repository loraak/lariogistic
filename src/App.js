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
                {/* Rutas Públicas */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                {/* Rutas Protegidas */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/gestiones" element={<ProtectedRoute><GestionSolicitudes /></ProtectedRoute>} />
                <Route path="/tramites" element={<ProtectedRoute><Tramites /></ProtectedRoute>} />
                <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
                <Route path="/depgerente" element={<ProtectedRoute><DepartamentoGerente /></ProtectedRoute>} />
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