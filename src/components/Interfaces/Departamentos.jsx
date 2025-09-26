import react, { useState, useEffect } from "react";
import styles from './DepartamentoGerente.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

const Departamentos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departamentos, setDepartamentos] = useState([]);
    const [nombre, setNombre] = useState(""); 
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDepartamentos();
                setDepartamentos(result.data); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const getDepartamentos = async () => {
        try {
            const {data} = await api.get('/departamentos/');
            return data;
        } catch (err) {
            console.error('Error obteniendo departamentos:', err);
            throw err;
        }
    };

    const createDepartamento = async (nombre, descripcion) => {
        try {
            const { data } = await api.post("/departamentos/", { nombre, descripcion });
            console.log("Departamento creado:", data);
            return data;
        } catch (err) {
            console.error("Error creando departamento:", err);
            throw err;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await createDepartamento(nombre, descripcion);
        setNombre("");
        setDescripcion("");
        setIsModalOpen(false);
        window.location.reload()
        } catch {
        alert("Error al crear departamento");
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
                                <button
                                className={styles.editButton}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalCrearDepartamento
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                nombre={nombre}
                descripcion={descripcion}
                setNombre={setNombre}
                setDescripcion={setDescripcion}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

const ModalCrearDepartamento = ({ 
        isOpen, 
        onClose,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        handleSubmit
    }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <form onSubmit={handleSubmit} className={styles.modalContent}>
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
                        <input type="text" className={styles.input}
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}/>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Descripcion</label>
                        <input type="text" className={styles.input} 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                    
                    <button type="submit" className={styles.solicitarButton}>
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Departamentos;