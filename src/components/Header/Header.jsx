// src/components/Header/Header.js

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header>
            <nav className={styles.header}>
                <div className={styles.logo}>
                    <h1>Lariogistic</h1>
                </div>

                {isAuthenticated && (
                    <div className={styles.navLinks}>
                        <Link to="/" className={styles.link}>Inicio</Link>

                        {/* Link solo para Usuario normal (rol 3) */}
                        {user.idRol === 3 && (
                            <Link to="/tramites" className={styles.link}>Solicitudes</Link>
                        )}
                        
                        {/* Links solo para Jefe (rol 2) */}
                        {user.idRol === 2 && (
                            <>
                                <Link to="/gestiones" className={styles.link}>Gestiones</Link>
                                <Link to="/depgerente" className={styles.link}>Departamento</Link>
                            </>
                        )}

                        {/* Link solo para Admin (rol 1) */}
                        {user.idRol === 1 && (
                            <Link to="/usuarios" className={styles.link}>Usuarios</Link>
                        )}
                        
                        <button onClick={logout} className={styles.logoutButton}>
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;