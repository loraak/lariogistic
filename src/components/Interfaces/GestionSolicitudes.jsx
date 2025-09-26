import React from "react";
import styles from "./GestionSolicitudes.module.css";

const GestionSolicitudes = () => {
    const datos = [
        { id: 1, tipo: "Solicitud de vacaciones", cliente: "Ana", estado: "Aprobado" },
        { id: 2, tipo: "Permiso de salida", cliente: "Irving", estado: "Pendiente" },
        { id: 3, tipo: "Firma de contrato", cliente: "Karol", estado: "Cancelado" },
    ];

    const getEstadoClassName = (estado) => {
        switch (estado.toLowerCase()) {
            case 'aprobado':
                return styles.estadoAprobado;
            case 'pendiente':
                return styles.estadoPendiente;
            case 'cancelado':
                return styles.estadoCancelado;
            default:
                return '';
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Gestión de solicitudes</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHeader}>ID</th>
                            <th className={styles.tableHeader}>Tipo de solicitud</th>
                            <th className={styles.tableHeader}>Cliente</th>
                            <th className={styles.tableHeader}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((item) => (
                            <tr key={item.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{item.id}</td>
                                <td className={styles.tableCell}>{item.tipo}</td>
                                <td className={styles.tableCell}>{item.cliente}</td>
                                <td className={styles.tableCell}>
                                    <span className={`${styles.estadoBadge} ${getEstadoClassName(item.estado)}`}>
                                        {item.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionSolicitudes;