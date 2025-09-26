import { useState }  from "react";
import styles from "./GestionSolicitudes.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const GestionSolicitudes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [datos, setDatos] = useState([
        { tramite: "Solicitud de vacaciones", cliente: "Ana", fecha: "25-09-25", estado: "Aprobado" },
        { tramite: "Permiso de salida", cliente: "Irving", fecha: "25-09-25", estado: "Pendiente" },
        { tramite: "Firma de contrato", cliente: "Karol", fecha: "25-09-25", estado: "Rechazado" },
    ]);

    const estadosDisponibles = ['Pendiente', 'Aprobado', 'Rechazado'];

    const abrirModal = (solicitud) => {
        setSolicitudSeleccionada(solicitud);
        setNuevoEstado(solicitud.estado);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setSolicitudSeleccionada(null);
        setNuevoEstado('');
    };

    const actualizarEstado = () => {
        if (solicitudSeleccionada && nuevoEstado) {
            setDatos(prevDatos => 
                prevDatos.map(item => 
                    item.id === solicitudSeleccionada.id 
                        ? { ...item, estado: nuevoEstado }
                        : item
                )
            );
            cerrarModal();
        }
    };

    const getEstadoClassName = (estado) => {
        switch (estado.toLowerCase()) {
            case 'aprobado':
                return styles.estadoAprobado;
            case 'pendiente':
                return styles.estadoPendiente;
            case 'rechazado':
                return styles.estadoRechazado;
            default:
                return '';
        }
    };

    return (
        <div className={styles.tablecontainer}>
            <h2 className={styles.title}>Gestión de solicitudes</h2>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Tramite de solicitud</th>
                        <th className={styles.th}>Cliente</th>
                        <th className={styles.th}>Fecha</th>
                        <th className={styles.th}>Estado</th>
                        <th className={styles.th}></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {datos.map((item) => (
                        <tr key={item.id} className={styles.tr}>
                            <td className={styles.td}>{item.tramite}</td>
                            <td className={styles.td}>{item.cliente}</td>
                            <td className={styles.td}>{item.fecha}</td>
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

            <EditarSolicitud
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Cambiar Estado"
                solicitud={solicitudSeleccionada}
                nuevoEstado={nuevoEstado}
                setNuevoEstado={setNuevoEstado}
                estadosDisponibles={estadosDisponibles}
                onAceptar={actualizarEstado}
            ></EditarSolicitud>
        </div>
    );
};

const EditarSolicitud = ({ isOpen, 
    onClose, 
    title, 
    solicitud, 
    nuevoEstado, 
    setNuevoEstado, 
    estadosDisponibles, 
    onAceptar}) => {
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
                            Solicitud: <strong>{solicitud.tramite}</strong>
                        </label>
                        <label className={styles.label}>
                            Cliente: <strong>{solicitud.cliente}</strong>
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
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GestionSolicitudes;