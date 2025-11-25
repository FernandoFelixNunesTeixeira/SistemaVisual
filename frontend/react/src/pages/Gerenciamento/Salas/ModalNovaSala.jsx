import React, { useState, useEffect } from 'react';
import '../ModalNovo.css';

const ModalFormSala = ({ isOpen, onClose, onSave, salaParaAtualizar }) => {
    const initialFormState = {
        nome_sala: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            if (salaParaAtualizar) {
                setFormData({...initialFormState, ...salaParaAtualizar});
            } else {
                setFormData(initialFormState);
            }
        }
    }, [isOpen, salaParaAtualizar]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const isUpdateMode = !!salaParaAtualizar;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{isUpdateMode ? 'Editar Sala' : 'Novo Sala'}</h3>
                    <button className="btn-close-modal" onClick={onClose} title="Fechar">
                        <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label htmlFor="nome_sala">Nome da Sala</label>
                        <input
                            type="text"
                            id="nome_sala"
                            name="nome_sala"
                            value={formData.nome_sala}
                            onChange={handleChange}
                            placeholder="Nome"
                            required
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            CANCELAR
                        </button>
                        <button type="submit" className="btn-save">
                            <i className={`bi ${isUpdateMode ? 'bi-check-lg' : 'bi-floppy'}`} style={{ marginRight: '8px' }}></i>
                            {isUpdateMode ? 'ATUALIZAR' : 'SALVAR'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalFormSala;