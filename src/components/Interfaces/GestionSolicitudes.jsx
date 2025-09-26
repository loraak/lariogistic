import styles from "./GestionSolicitudes.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Tipo de solicitud</th>
                            <th className={styles.th}>Cliente</th>
                            <th className={styles.th}>Estado</th>
                            <th className={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {datos.map((item) => (
                            <tr key={item.id} className={styles.tr}>
                                <td className={styles.td}>{item.id}</td>
                                <td className={styles.td}>{item.tipo}</td>
                                <td className={styles.td}>{item.cliente}</td>
                                <td className={styles.td}>
                                    <span className={`${styles.estadoBadge} ${getEstadoClassName(item.estado)}`}>
                                        {item.estado}
                                    </span>
                                </td>
                                <td className={styles.td}>
                                    <button className={styles.editButton}>
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
        </div>
    );
};

export default GestionSolicitudes;