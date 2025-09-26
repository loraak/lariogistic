import { useState, useEffect } from 'react';
// El nombre del archivo CSS que importas puede ser diferente, 
// pero asumiré que los estilos que me pasaste están en "Solicitud.module.css"
import styles from './Solicitud.module.css'; 
import api from '../../services/api';

const EditarUsuario = ({ isOpen, onClose, usuario, onUsuarioActualizado }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [idRol, setIdRol] = useState('');
    const [estado, setEstado] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const estadosDisponibles = ['activo', 'inactivo', 'suspendido'];
    const rolesDisponibles = [
        { id: 1, nombre: 'Administrador' },
        { id: 2, nombre: 'Supervisor' },
        { id: 3, nombre: 'Empleado' },
    ];

    useEffect(() => {
        if (usuario) {
            setNombre(usuario.nombre || '');
            setEmail(usuario.email || '');
            setEstado(usuario.estado || '');
            const rolEncontrado = rolesDisponibles.find(r => r.nombre === usuario.rol);
            if (rolEncontrado) {
                setIdRol(rolEncontrado.id);
            }
        }
    }, [usuario]);

    if (!isOpen) return null;

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const payload = {
            nombre,
            idRol: parseInt(idRol, 10),
            estado,
        };
        try {
            await api.put(`/usuarios/${usuario.id}`, payload);
            alert('Usuario actualizado con éxito');
            onClose();
            onUsuarioActualizado();
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
            setError(err.response?.data?.error || 'No se pudo actualizar el usuario.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={styles.modalContent}>
                <form onSubmit={handleUpdate}>
                    <div className={styles.modalHeader}>
                        <h2>Editar Usuario</h2> 
                        <button type="button" className={styles.closeButton} onClick={onClose}>×</button>
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.formGroup}>
                            <label>Nombre</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={styles.input} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email (no se puede editar)</label>
                            <input type="email" value={email} className={styles.input} disabled />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Rol</label>
                            <select value={idRol} onChange={(e) => setIdRol(e.target.value)} className={styles.input} required>
                                {rolesDisponibles.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Estado</label>
                            <select value={estado} onChange={(e) => setEstado(e.target.value)} className={styles.input} required>
                                {estadosDisponibles.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                        {error && <p className={styles.errorMessage}>{error}</p>}
                        
                        <button type="submit" className={styles.solicitarButton} disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;