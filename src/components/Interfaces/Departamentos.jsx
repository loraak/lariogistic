import react, { useState, useEffect } from "react";
import styles from './DepartamentoGerente.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

const Departamentos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDepartamentos();
                setDepartamentos(result.data); // Aquí ya guardas el array
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    // Haz una llamada API
    const getDepartamentos = async () => {
        try {
            const {data} = await api.get('/departamentos/'); // GET http://localhost:3000/api/departamentos
            console.log('Departamentos:', data);
            return data;
        } catch (err) {
            console.error('Error obteniendo departamentos:', err);
            throw err;
        }
    };

    const getEstadoClassName = (estado) => {
        switch (estado.toLowerCase()) {
            case 'activo':
                return styles.estadoActivo;
            case 'inactivo':
                return styles.estadoInactivo;
            default:
                return '';
        }
    };

    return(
        <div>
            <h2 className={styles.title}>Departamentos</h2>
            <button className={styles.nuevoDepartamento} onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} /> Nuevo Departamento
            </button>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Nombre</th>
                        <th className={styles.th}>Descripcion</th>
                        <th className={styles.th}>Fecha de Creación</th>
                        <th className={styles.th}>Estado</th>
                        <th className={styles.th}></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {departamentos.map((item) => (
                        <tr key={item.id} className={styles.tr}>
                            <td className={styles.td}>{item.nombre}</td>
                            <td className={styles.td}>{item.descripcion}</td>
                            <td className={styles.td}>{item.fechaCreacion}</td>
                            <td className={styles.td}>
                                <span className={`${styles.estadoBadge} ${getEstadoClassName(item.estado)}`}>
                                    {item.estado}
                                </span>
                            </td>
                            <td className={styles.td}>
                                <button onClick={setIsModalOpen}
                                className={styles.editButton}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditarSolicitud
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}

const EditarSolicitud = ({ 
    isOpen, 
    onClose, 
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Nuevo Departamento</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Nombre</label>
                        <input type="text" className={styles.input} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Descripcion</label>
                        <input type="text" className={styles.input} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Explique su motivo de solicitud</label>
                        <textarea className={styles.textarea} rows="4"></textarea>
                    </div>
                    
                    <button className={styles.solicitarButton}>
                        Solicitar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Departamentos;