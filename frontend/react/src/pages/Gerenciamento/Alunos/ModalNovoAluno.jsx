import React, { useState, useEffect } from 'react';
import '../ModalNovo.css';

const ModalFormAluno = ({ isOpen, onClose, onSave, alunoParaAtualizar }) => {
    const initialFormState = {
        nome: '',
        matricula: '',
        email: '',
        telefone: '',
        periodo_de_referencia: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            if (alunoParaAtualizar) {
                setFormData({...initialFormState, ...alunoParaAtualizar});
            } else {
                setFormData(initialFormState);
            }
        }
    }, [isOpen, alunoParaAtualizar]);

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

    const isUpdateMode = !!alunoParaAtualizar;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{isUpdateMode ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                    <button className="btn-close-modal" onClick={onClose} title="Fechar">
                        <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }}></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label htmlFor="nome">Nome Completo</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="nome@aluno.ifsp.edu.br"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(11) 99999-9999"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="matricula">Matrícula</label>
                            <input
                                type="text"
                                id="matricula"
                                name="matricula"
                                value={formData.matricula}
                                onChange={handleChange}
                                placeholder="Ex: PC123456"
                                required
                                disabled={isUpdateMode} 
                            />
                        </div>

                        <div className="form-group half">
                            <label htmlFor="periodo_de_referencia">Período</label>
                            <input
                                type="text" 
                                id="periodo_de_referencia"
                                name="periodo_de_referencia"
                                value={formData.periodo_de_referencia}
                                onChange={handleChange}
                                placeholder="Ex: 2025"
                                required
                            />
                        </div>
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

export default ModalFormAluno;