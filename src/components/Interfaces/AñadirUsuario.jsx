import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Solicitud.module.css';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const AniadirUsuario = ({ mostrar, onCerrar, onUsuarioCreado }) => {
    const { user } = useAuth();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idRol, setIdRol] = useState('3');
    const [idDepartamento, setIdDepartamento] = useState('');
    const [departamentos, setDepartamentos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDepartamentos, setIsLoadingDepartamentos] = useState(false);
    const [error, setError] = useState('');

    const rolesDisponibles = [
        { id: '2', nombre: 'Gerente' },
        { id: '3', nombre: 'Empleado' },
    ];

    useEffect(() => {
        if (mostrar) {
            obtenerDepartamentos();
        }
    }, [mostrar]);
    
    if (!mostrar) {
        return null;
    }

    const obtenerDepartamentos = async () => {
    setIsLoadingDepartamentos(true);
    try {
        const response = await api.get('/departamentos');
        if (response.data.success) {
            setDepartamentos(response.data.data);
        }
    } catch (err) {
        console.error('Error al obtener departamentos:', err);
        setError('Error al cargar los departamentos');
    } finally {
        setIsLoadingDepartamentos(false);
    }
};

    const handleSubmit = async (e) => {
        // ... el resto de la función es igual
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!idDepartamento) {
            setError('Por favor selecciona un departamento');
            setIsLoading(false);
            return;
        }

        const nuevoUsuario = {
            nombre,
            email,
            password,
            idRol: parseInt(idRol, 10),
            idDepartamento: parseInt(idDepartamento, 10),
        };

        try {
            await api.post('/usuarios', nuevoUsuario);
            
            setNombre('');
            setEmail('');
            setPassword('');
            setIdRol('3');
            setIdDepartamento('');
            
            onCerrar();
            if (onUsuarioCreado) {
                onUsuarioCreado();
            }
            Swal.fire({
                title: 'Éxito',
                text: 'Usuario registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar', 
                confirmButtonColor: '#466FA6'
            });
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            setError(err.response?.data?.error || 'No se pudo registrar el usuario.');
        } finally {
            setIsLoading(false);
        }
    };

    // El JSX que se retorna no cambia en absoluto
    return (
        <div className={styles.modalOverlay}>
            {/* ... todo tu JSX va aquí ... */}
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Registrar Nuevo Usuario</h2>
                    <button className={styles.closeButton} onClick={onCerrar}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    {/* ... Form groups ... */}
                    <div className={styles.formGroup}>
                        <label>Nombre Completo</label>
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
                    
                    <div className={styles.formGroup}>
                        <label>Departamento</label>
                        {isLoadingDepartamentos ? (
                            <div className={styles.loading}>Cargando departamentos...</div>
                        ) : (
                            <select
                                className={styles.input}
                                value={idDepartamento}
                                onChange={(e) => setIdDepartamento(e.target.value)}
                                required
                            >
                                <option value="">Selecciona un departamento</option>
                                {departamentos
                                    .filter(dept => dept.estado === 'activo')
                                    .map(departamento => (
                                        <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                                            {departamento.nombre}
                                        </option>
                                    ))
                                }
                            </select>
                        )}
                    </div>
                    
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    
                    <button 
                        type="submit" 
                        className={styles.solicitarButton} 
                        disabled={isLoading || isLoadingDepartamentos}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AniadirUsuario;