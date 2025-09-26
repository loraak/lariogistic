import { useState } from "react";
import styles from "./Usuarios.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AñadirUsuario from './AñadirUsuario';

const Usuarios = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false); // Corregido: useState separado
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [datos, setDatos] = useState([
        { 
            id: 1,
            nombre: "Ana García", 
            email: "ana.garcia@empresa.com", 
            telefono: "555-0001", 
            direccion: "Av. Principal 123",
            rol: "Administrador",
            departamento: "Recursos Humanos",
            estado: "Activo" 
        },
        { 
            id: 2,
            nombre: "Irving Chaparro", 
            email: "irving.lopez@gmail.com", 
            telefono: "1012-0002", 
            direccion: "Calle Secundaria 456",
            rol: "Empleado",
            departamento: "Desarrollo",
            estado: "Activo" 
        },
        { 
            id: 3,
            nombre: "Karol Arvizu", 
            email: "karol.lorak@gmail.com", 
            telefono: "442-3786", 
            direccion: "Boulevard Central 789",
            rol: "Supervisor",
            departamento: "Ventas",
            estado: "Inactivo" 
        },
    ]);

    const estadosDisponibles = ['Activo', 'Inactivo', 'Suspendido'];

    const abrirModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setNuevoEstado(usuario.estado);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setUsuarioSeleccionado(null);
        setNuevoEstado('');
    };

    const actualizarEstado = () => {
        if (usuarioSeleccionado && nuevoEstado) {
            setDatos(prevDatos => 
                prevDatos.map(item => 
                    item.id === usuarioSeleccionado.id 
                        ? { ...item, estado: nuevoEstado }
                        : item
                )
            );
            cerrarModal();
        }
    };

    const getEstadoClassName = (estado) => {
        switch (estado.toLowerCase()) {
            case 'activo':
                return styles.estadoActivo;
            case 'inactivo':
                return styles.estadoInactivo;
            case 'suspendido':
                return styles.estadoSuspendido;
            default:
                return '';
        }
    };

    // Función para agregar nuevo usuario
    const agregarUsuario = (nuevoUsuario) => {
        const nuevoId = Math.max(...datos.map(u => u.id)) + 1;
        setDatos(prevDatos => [...prevDatos, { ...nuevoUsuario, id: nuevoId }]);
        setMostrarFormulario(false);
    };

    return (
        <div className={styles.tablecontainer}>
            <h2 className={styles.title}>Gestión de Usuarios</h2>
            <button className={styles.nuevaSoliButton} onClick={() => setMostrarFormulario(true)}>
                <FontAwesomeIcon icon={faPlus} /> Nuevo Usuario
            </button>
            
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
                                <button className={styles.deleteButton}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar usuario */}
            <EditarUsuario
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cambiar Estado de Usuario"
                usuario={usuarioSeleccionado}
                nuevoEstado={nuevoEstado}
                setNuevoEstado={setNuevoEstado}
                estadosDisponibles={estadosDisponibles}
                onAceptar={actualizarEstado}
            />

            {/* Componente para añadir nuevo usuario - Movido fuera del modal */}
            <AñadirUsuario
                mostrar={mostrarFormulario}
                onCerrar={() => setMostrarFormulario(false)}
                onAgregar={agregarUsuario}
            />
        </div>
    );
};

const EditarUsuario = ({ 
    isOpen, 
    onClose, 
    title, 
    usuario, 
    nuevoEstado, 
    setNuevoEstado, 
    estadosDisponibles, 
    onAceptar
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.titleModal}>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Usuario: <strong>{usuario?.nombre}</strong>
                        </label>
                        <label className={styles.label}>
                            Email: <strong>{usuario?.email}</strong>
                        </label>
                        <label className={styles.label}>
                            Departamento: <strong>{usuario?.departamento}</strong>
                        </label>
                        <label className={styles.label} htmlFor="estado-select">
                            Nuevo Estado:
                        </label>
                        <select
                            id="estado-select"
                            className={styles.select}
                            value={nuevoEstado}
                            onChange={(e) => setNuevoEstado(e.target.value)}
                        >
                            {estadosDisponibles.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles.buttonModal}
                        onClick={onAceptar}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;