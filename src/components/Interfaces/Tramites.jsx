import React from 'react';
import styles from './Tramites.module.css';

const Tramites = () => {
  // Datos de ejemplo
    const tramites = [
        {
        id: 1,
        tramite: 'Licencia de Conducir',
        fechaSolicitud: '2024-03-15',
        estado: 'Aprobado'
        },
        {
        id: 2,
        tramite: 'Pasaporte',
        fechaSolicitud: '2024-03-10',
        estado: 'Pendiente'
        },
        {
        id: 3,
        tramite: 'Certificado de Nacimiento',
        fechaSolicitud: '2024-03-08',
        estado: 'Aprobado'
        },
        {
        id: 4,
        tramite: 'Visa de Trabajo',
        fechaSolicitud: '2024-03-05',
        estado: 'Rechazado'
        },
        {
        id: 5,
        tramite: 'Registro Vehicular',
        fechaSolicitud: '2024-03-12',
        estado: 'Pendiente'
        }
    ];

    const getEstadoClass = (estado) => {
        switch (estado.toLowerCase()) {
        case 'pendiente':
            return styles.estadoPendiente;
        case 'aprobado':
            return styles.estadoAprobado;
        case 'rechazado':
            return styles.estadoRechazado;
        default:
            return styles.estadoPendiente;
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

    return (
        <div className={styles.tableContainer}>
        <h1 className={styles.title}>Gestión de Trámites</h1>
        
        <table className={styles.table}>
            <thead className={styles.thead}>
            <tr>
                <th className={styles.th}>Trámite</th>
                <th className={styles.th}>Fecha de Solicitud</th>
                <th className={styles.th}>Estado</th>
            </tr>
            </thead>
            <tbody className={styles.tbody}>
            {tramites.map((tramite) => (
                <tr key={tramite.id} className={styles.tr}>
                <td className={styles.td}>{tramite.tramite}</td>
                <td className={styles.td}>{formatearFecha(tramite.fechaSolicitud)}</td>
                <td className={styles.td}>
                    <span className={getEstadoClass(tramite.estado)}>
                    {tramite.estado}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Tramites;