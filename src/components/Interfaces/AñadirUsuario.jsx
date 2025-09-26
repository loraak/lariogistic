import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Solicitud.module.css';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Solicitud = ({ mostrar, onCerrar, onUsuarioCreado }) => {
    const { user } = useAuth(); 
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idRol, setIdRol] = useState('3'); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!mostrar) return null;

    const rolesDisponibles = [
        { id: '1', nombre: 'Administrador' },
        { id: '2', nombre: 'Gerente' },
        { id: '3', nombre: 'Empleado' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const nuevoUsuario = {
            nombre,
            email,
            password,
            idRol: parseInt(idRol, 10), 
        };

        try {
            await api.post('/usuarios', nuevoUsuario);
            alert('¡Usuario registrado con éxito!');
            onCerrar();
            if (onUsuarioCreado) {
                onUsuarioCreado();
            }
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            setError(err.response?.data?.error || 'No se pudo registrar el usuario.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Registrar Nuevo Usuario</h2>
                    <button className={styles.closeButton} onClick={onCerrar}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Nombre Completo </label>
                        <input
                            type="text"
                            className={styles.input}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Correo Electrónico</label>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {user && user.idRol === 1 && (
                        <div className={styles.formGroup}>
                            <label>Rol</label>
                            <select
                                className={styles.input}
                                value={idRol}
                                onChange={(e) => setIdRol(e.target.value)}
                            >
                                {rolesDisponibles.map(rol => (
                                    <option key={rol.id} value={rol.id}>
                                        {rol.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    
                    <button type="submit" className={styles.solicitarButton} disabled={isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Solicitud;