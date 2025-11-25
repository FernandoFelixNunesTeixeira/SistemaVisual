import '../Gerenciamento.css';
import { usePagination } from '../../../hooks/usePagination';
import { createSala, deleteSala, getSalas, updateSala } from '../../../services/salasService';
import { useState, useEffect } from 'react';
import ModalNovaSala from './ModalNovaSala';

// TO-DO: Adicionar periodo_de_referencia e filtro por ano e bimestre
// Barra de Pesquisa tambem seria bom

function GerenciamentoSalas() {
    const [apiData, setApiData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatingStudent, setUpdatingStudent] = useState(null);

    useEffect(() => {
        getSalas().then(res => setApiData(res.data));
    }, []);

    const handleSaveForm = async (formData) => {
        try {
            if (updatingStudent) {
                await updateSala(updatingStudent.id, formData);
            } else {
                await createSala(formData);
            }

            const res = await getSalas();
            setApiData(res.data);

            setIsModalOpen(false);
            setUpdatingStudent(null); 
        } catch (error) {
            console.error("Erro ao salvar sala", error);
            alert("Erro ao salvar sala.");
        }
    };

    const handleOpenNew = () => {
        setUpdatingStudent(null);
        setIsModalOpen(true);
    };

    const handleOpenUpdate = (classroom) => {
        setUpdatingStudent(classroom);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            await deleteSala(id);
            setApiData(apiData.filter(u => u.id !== id));
        }
    };

    // Pagination
    const {
        paginatedList,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        handlePageChange,
        handleItemsPerPageChange
    } = usePagination(apiData, 10);

    const totalRegistros = apiData.length;

    return (
        <div className="gerenciamento-management-container">

            <div className="gerenciamento-header">
                <h1>Gerenciamento de Salas</h1>
                <button onClick={handleOpenNew} className="btn-novo">
                    <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i>
                    NOVA SALA
                </button>
            </div>

            <ModalNovaSala
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveForm}
                salaParaAtualizar={updatingStudent}
            />

            <div className="table-controls">
                <div className="show-entries">
                    <label htmlFor="show-entries-select">Exibir</label>
                    <select id="show-entries-select" value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(e.target.value)}>
                        <option value="10" defaultValue>10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <span>resultados por página</span>
                </div>
            </div>

            <div className="table-card">
                <table className="gerenciamento-table">
                    <thead>
                        <tr>
                            <th>Nome da Sala</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedList.map((classroom, index) => (
                            <tr key={index}>
                                <td>{classroom.nome_sala}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleOpenUpdate(classroom)} className="action-btn edit" title="Editar">
                                            <i className="bi bi-pencil-square" style={{ color: '#38B6FF', fontSize: '1.2rem' }}></i>
                                        </button>
                                        <button onClick={() => handleDelete(classroom.id)} className="action-btn delete" title="Excluir">
                                            <i className="bi bi-trash" style={{ color: '#FF0000', fontSize: '1.2rem' }}></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* Linhas de placeholder */}
                        {Array.from({
                            length: Math.max(0, itemsPerPage - paginatedList.length)
                        }).map((_, index) => (
                            <tr key={`placeholder-${index}`} style={{ height: '62px' }}>
                                <td></td><td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <div className="footer-info">
                    Mostrando de {(currentPage - 1) * itemsPerPage + 1}
                    {" "}
                    até {Math.min(currentPage * itemsPerPage, totalItems)}
                    {" "}
                    de {totalItems} registros
                </div>

                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {/* Botão anterior */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                Anterior
                            </button>
                        </li>

                        {/* Páginaatual */}
                        <li className="page-item active">
                            <span className="page-link">{currentPage}</span>
                        </li>

                        {/* Botão próximo */}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                Próximo
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default GerenciamentoSalas;