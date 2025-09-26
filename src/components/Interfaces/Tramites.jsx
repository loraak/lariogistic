import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import Solicitud from './Solicitud';
import styles from './Usuarios.module.css';
import api from '../../services/api';

const Tramites = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tramites, setTramites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener trámites del usuario autenticado
    const obtenerTramites = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/tramites/mis-tramites');
            
            if (response.data.success) {
                setTramites(response.data.data);
            } else {
                setError('Error al obtener los trámites');
            }
        } catch (err) {
            console.error('Error al obtener trámites:', err);
            setError(err.response?.data?.message || 'Error al cargar los trámites');
        } finally {
            setLoading(false);
        }
    };

    // Cargar trámites al montar el componente
    useEffect(() => {
        obtenerTramites();
    }, []);

    const getEstadoClass = (estado) => {
        switch (estado.toLowerCase()) {
            case 'pendiente':
                return `${styles.estadoBadge} ${styles.estadoSuspendido}`; // Amarillo para pendiente
            case 'aprobado':
                return `${styles.estadoBadge} ${styles.estadoActivo}`; // Verde para aprobado
            case 'rechazado':
                return `${styles.estadoBadge} ${styles.estadoInactivo}`; // Rojo para rechazado
            case 'en revision':
                return `${styles.estadoBadge} ${styles.estadoSuspendido}`; // Amarillo para en revisión
            default:
                return `${styles.estadoBadge} ${styles.estadoSuspendido}`;
        }
    };

    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const verDetallesTramite = (tramite) => {
        // Aquí puedes implementar la lógica para ver detalles
        console.log('Ver detalles del trámite:', tramite);
        // Podrías abrir un modal o navegar a otra página
    };

    const handleTramiteCreado = () => {
        setMostrarFormulario(false);
        obtenerTramites(); // Recargar la lista de trámites
    };

    if (loading) {
        return (
            <div className={styles.tablecontainer}>
                <div className={styles.centeredMessage}>
                    <p>Cargando trámites...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.tablecontainer}>
                <div className={styles.centeredMessage}>
                    <p className={styles.errorMessage}>Error: {error}</p>
                    <button onClick={obtenerTramites} className={styles.actionButton}>
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tablecontainer}>
            <h1 className={styles.title}>Mis Trámites</h1>
            
            <div className={styles.actionsContainer}>
                <button 
                    className={styles.actionButton} 
                    onClick={() => setMostrarFormulario(true)}
                >
                    <FontAwesomeIcon icon={faPlus} /> Nueva Solicitud
                </button>
                <button 
                    className={`${styles.actionButton} ${styles.secondary}`}
                    onClick={obtenerTramites}
                >
                    <FontAwesomeIcon icon={faSync} /> Actualizar
                </button>
            </div>

            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Trámite</th>
                        <th className={styles.th}>Fecha de Solicitud</th>
                        <th className={styles.th}>Estado</th>
                        <th className={styles.th}>Descripción</th>
                        <th className={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {tramites.map((tramite) => (
                        <tr key={tramite.idTramite} className={styles.tr}>
                            <td className={styles.td}>{tramite.tipoTramite}</td>
                            <td className={styles.td}>
                                {formatearFecha(tramite.fechaSolicitud)}
                            </td>
                            <td className={styles.td}>
                                <span className={getEstadoClass(tramite.estado)}>
                                    {tramite.estado.charAt(0).toUpperCase() + tramite.estado.slice(1)}
                                </span>
                            </td>
                            <td className={styles.td}>
                                {tramite.descripcion || 'Sin descripción'}
                            </td>
                            <td className={styles.td}>
                                <button 
                                    className={styles.editButton}
                                    onClick={() => verDetallesTramite(tramite)}
                                    title="Ver detalles"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {tramites.length === 0 && (
                <div className={styles.centeredMessage}>
                    <p>No tienes trámites registrados</p>
                    <p>Haz clic en "Nueva Solicitud" para crear tu primer trámite</p>
                </div>
            )}

            <Solicitud
                mostrar={mostrarFormulario}
                onCerrar={() => setMostrarFormulario(false)}
                onTramiteCreado={handleTramiteCreado}
            />
        </div>
    );
};

export default Tramites;