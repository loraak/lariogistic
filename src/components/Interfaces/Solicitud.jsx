import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Solicitud.module.css';

const Solicitud = ({ mostrar, onCerrar }) => {
    if (!mostrar) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Nueva Solicitud</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onCerrar}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.formGroup}>
                        <label>Tipo de solicitud</label>
                        <input type="text" className={styles.input} />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Documento PDF</label>
                        <input type="file" className={styles.input} accept=".pdf" />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Fecha solicitada</label>
                        <input type="date" className={styles.input} />
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

export default Solicitud;