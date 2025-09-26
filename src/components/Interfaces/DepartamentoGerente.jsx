import react, { useState } from "react";
import styles from './DepartamentoGerente.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';

const DepartamentoGerente = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmpleado, setSelectedEmpleado] = useState('');
    
    const datos = [
        { id: 1, nombre: "Ana", email: "ana@gmail.com", telefono: 444, direccion: "Av. Ferrocarril", estado: "Inactivo" },
        { id: 2, nombre: "Brisa", email: "bri@gmail.com", telefono: 555, direccion: "Av. Ferrocarril", estado: "Activo" },
        { id: 3, nombre: "Irving", email: "irving@gmail.com", telefono: 666, direccion: "Av. Ferrocarril", estado: "Activo" },
    ];
    
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

    const handleAddEmpleado = () => {
        if (selectedEmpleado) {
            console.log('Empleado seleccionado:', selectedEmpleado);
            // Aquí puedes agregar la lógica para añadir el empleado
        }
        setIsModalOpen(false);
        setSelectedEmpleado('');
    };

    return(
        <div>
            <h2 className={styles.title}>Departamento del gerente</h2>
            <button onClick={() => setIsModalOpen(true)} className={styles.nuevoEmpleado}>
                <FontAwesomeIcon icon={faUser} />Nuevo Empleado
            </button>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Nombre</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Teléfono</th>
                        <th className={styles.th}>Dirección</th>
                        <th className={styles.th}>Estado</th>
                        <th className={styles.th}></th>
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {datos.map((item) => (
                        <tr key={item.id} className={styles.tr}>
                            <td className={styles.td}>{item.nombre}</td>
                            <td className={styles.td}>{item.email}</td>
                            <td className={styles.td}>{item.telefono}</td>
                            <td className={styles.td}>{item.direccion}</td>
                            <td className={styles.td}>
                                <span className={`${styles.estadoBadge} ${getEstadoClassName(item.estado)}`}>
                                    {item.estado}
                                </span>
                            </td>
                            <td className={styles.td}>
                                <button className={styles.editButton}>
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
                    setSelectedEmpleado('');
                }}
                datos={datos}
                selectedEmpleado={selectedEmpleado}
                setSelectedEmpleado={setSelectedEmpleado}
                onAddEmpleado={handleAddEmpleado}
            />
        </div>
    );
}

const EditarSolicitud = ({ 
    isOpen, 
    onClose, 
    datos, 
    selectedEmpleado, 
    setSelectedEmpleado, 
    onAddEmpleado 
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
                    <h2 className={styles.titleModal}>Añadir Empleado</h2>
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
                        <label htmlFor="empleado-select">Seleccionar Empleado sin departamento:</label>
                        <select
                            id="empleado-select"
                            className={styles.select}
                            value={selectedEmpleado}
                            onChange={(e) => setSelectedEmpleado(e.target.value)}
                        >
                            <option value="">-- Selecciona un empleado --</option>
                            {datos.map((empleado) => (
                                <option key={empleado.id} value={empleado.id}>
                                    {empleado.nombre} - {empleado.email}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button
                        className={styles.buttonModal}
                        onClick={onAddEmpleado}
                        disabled={!selectedEmpleado}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartamentoGerente;