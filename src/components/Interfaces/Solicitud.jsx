import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import TramitesService from '../services/tramitesService';
import styles from './Solicitud.module.css';

const Solicitud = ({ mostrar, onCerrar, onTramiteCreado }) => {
    const [formData, setFormData] = useState({
        tipoSolicitud: '',
        fechaSolicitada: '',
        descripcion: '',
        archivo: null
    });
    const [tiposTramites, setTiposTramites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar tipos de trámites al abrir el modal
    useEffect(() => {
        if (mostrar) {
            cargarTiposTramites();
            // Limpiar formulario
            setFormData({
                tipoSolicitud: '',
                fechaSolicitada: '',
                descripcion: '',
                archivo: null
            });
            setError('');
        }
    }, [mostrar]);

    const cargarTiposTramites = async () => {
        try {
            const response = await TramitesService.obtenerTiposTramites();
            if (response.success) {
                setTiposTramites(response.data);
            }
        } catch (error) {
            console.error('Error al cargar tipos de trámites:', error);
            setError('Error al cargar tipos de trámites');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'archivo') {
            setFormData(prev => ({
                ...prev,
                archivo: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validaciones
            if (!formData.tipoSolicitud) {
                setError('Por favor seleccione un tipo de solicitud');
                return;
            }

            if (!formData.descripcion.trim()) {
                setError('Por favor explique el motivo de su solicitud');
                return;
            }

            // Preparar datos para enviar
            const tramiteData = {
                idUsuario: 1, // Esto debería venir del contexto de usuario autenticado
                idTipoTramite: parseInt(formData.tipoSolicitud),
                descripcion: formData.descripcion.trim(),
                fechaInicio: formData.fechaSolicitada || null,
                fechaFin: null // Se puede calcular en el backend
            };

            // Crear el trámite
            const response = await TramitesService.crearTramite(tramiteData);

            if (response.success) {
                // Notificar al componente padre sobre el nuevo trámite
                if (onTramiteCreado) {
                    onTramiteCreado(response.data);
                }

                // Cerrar modal
                onCerrar();

                // Mostrar mensaje de éxito (puedes implementar un sistema de notificaciones)
                alert('Solicitud creada exitosamente');
            }

        } catch (error) {
            console.error('Error al crear solicitud:', error);
            setError(error.message || 'Error al crear la solicitud');
        } finally {
            setLoading(false);
        }
    };

    const handleCerrar = () => {
        if (!loading) {
            onCerrar();
        }
    };

    if (!mostrar) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Nueva Solicitud</h2>
                    <button
                        className={styles.closeButton}
                        onClick={handleCerrar}
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label>Tipo de solicitud *</label>
                        <select 
                            name="tipoSolicitud"
                            value={formData.tipoSolicitud}
                            onChange={handleInputChange}
                            className={styles.input}
                            required
                            disabled={loading}
                        >
                            <option value="">Seleccione un tipo de solicitud</option>
                            {tiposTramites.map(tipo => (
                                <option key={tipo.idTipoTramite} value={tipo.idTipoTramite}>
                                    {tipo.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Documento PDF</label>
                        <input 
                            type="file" 
                            name="archivo"
                            onChange={handleInputChange}
                            className={styles.input} 
                            accept=".pdf"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Fecha solicitada</label>
                        <input 
                            type="date" 
                            name="fechaSolicitada"
                            value={formData.fechaSolicitada}
                            onChange={handleInputChange}
                            className={styles.input}
                            disabled={loading}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Explique su motivo de solicitud *</label>
                        <textarea 
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className={styles.textarea} 
                            rows="4"
                            required
                            disabled={loading}
                            placeholder="Describa detalladamente el motivo de su solicitud..."
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className={styles.solicitarButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin /> 
                                Procesando...
                            </>
                        ) : (
                            'Solicitar'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Solicitud;
