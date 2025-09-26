import { useState, useEffect } from "react";
import styles from "./Usuarios.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import AniadirUsuario from './AñadirUsuario';
import api from "../../services/api";
import EditarUsuario from "./EditarUsuario"; 

const Usuarios = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const obtenerNombreRol = (idRol) => {
        const roles = { 1: 'Administrador', 2: 'Supervisor', 3: 'Empleado' };
        return roles[idRol] || 'Sin rol';
    };

    const obtenerUsuarios = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Obtener usuarios y departamentos en paralelo
            const [usuariosResponse, departamentosResponse] = await Promise.all([
                api.get('/usuarios'),
                api.get('/departamentos')
            ]);

            // Crear un mapa de departamentos para búsqueda rápida
            const departamentosMap = {};
            if (departamentosResponse.data.success && departamentosResponse.data.data) {
                departamentosResponse.data.data.forEach(dept => {
                    departamentosMap[dept.idDepartamento] = dept.nombre;
                });
            }

            // Transformar usuarios con información de departamento
            const usuariosTransformados = usuariosResponse.data.data.map(usuario => ({
                id: usuario.idUsuario,
                nombre: usuario.nombre,
                email: usuario.email,
                telefono: usuario.telefono || 'No especificado',
                direccion: usuario.direccion || 'No especificada',
                rol: obtenerNombreRol(usuario.idRol),
                departamento: usuario.idDepartamento ? 
                    (departamentosMap[usuario.idDepartamento] || 'Departamento no encontrado') : 
                    'Sin departamento',
                estado: usuario.estado
            }));
            
            setDatos(usuariosTransformados);
        } catch (err) {
            console.error('Error al obtener datos:', err);
            setError(err.response?.data?.error || 'Ocurrió un error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const abrirModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setUsuarioSeleccionado(null);
    };
    
    const getEstadoClassName = (estado) => {
        switch (estado.toLowerCase()) {
            case 'activo': return styles.estadoActivo;
            case 'inactivo': return styles.estadoInactivo;
            case 'suspendido': return styles.estadoSuspendido;
            default: return '';
        }
    };

    if (loading) { return <div className={styles.centeredMessage}>Cargando usuarios...</div>; }
    if (error) {
        return (
            <div className={styles.centeredMessage}>
                <p className={styles.errorMessage}>Error: {error}</p>
                <button onClick={obtenerUsuarios} className={styles.actionButton}>
                    Intentar nuevamente
                </button>
            </div>
        );
    }
    
    return (
        <div className={styles.tablecontainer}>
            <h2 className={styles.title}>Gestión de Usuarios</h2>
            
            <div className={styles.actionsContainer}>
                <button className={styles.actionButton} onClick={() => setMostrarFormulario(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Nuevo Usuario
                </button>
            </div>
            
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Nombre</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Teléfono</th>
                        <th className={styles.th}>Dirección</th>
                        <th className={styles.th}>Rol</th>
                        <th className={styles.th}>Departamento</th>
                        <th className={styles.th}>Estado</th>
                        <th className={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {datos.map((item) => (
                        <tr key={item.id} className={styles.tr}>
                            <td className={styles.td}>{item.nombre}</td>
                            <td className={styles.td}>{item.email}</td>
                            <td className={styles.td}>{item.telefono}</td>
                            <td className={styles.td}>{item.direccion}</td>
                            <td className={styles.td}>{item.rol}</td>
                            <td className={styles.td}>{item.departamento}</td>
                            <td className={styles.td}>
                                <span className={`${styles.estadoBadge} ${getEstadoClassName(item.estado)}`}>
                                    {item.estado}
                                </span>
                            </td>
                            <td className={styles.td}>
                                <button onClick={() => abrirModal(item)} className={styles.editButton}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {datos.length === 0 && (
                <div className={styles.centeredMessage}>
                    No hay usuarios para mostrar
                </div>
            )}

            <EditarUsuario
                isOpen={isModalOpen}
                onClose={cerrarModal}
                usuario={usuarioSeleccionado}
                onUsuarioActualizado={obtenerUsuarios}
            />

            <AniadirUsuario
                mostrar={mostrarFormulario}
                onCerrar={() => setMostrarFormulario(false)}
                onUsuarioCreado={obtenerUsuarios}
            />
        </div>
    );
};

export default Usuarios;