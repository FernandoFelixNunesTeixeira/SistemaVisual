import '../Gerenciamento.css';
import { usePagination } from '../../../hooks/usePagination';
import { createAluno, deleteAluno, getAlunos, updateAluno } from '../../../services/alunosService';
import { useState, useEffect } from 'react';
import ModalNovoAluno from './ModalNovoAluno';

// TO-DO: Adicionar periodo_de_referencia e filtro por ano e bimestre
// Barra de Pesquisa tambem seria bom

function GerenciamentoAlunos() {
    const [apiData, setApiData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatingStudent, setUpdatingStudent] = useState(null);

    useEffect(() => {
        getAlunos().then(res => setApiData(res.data));
    }, []);

    const handleSaveForm = async (formData) => {
        try {
            if (updatingStudent) {
                await updateAluno(updatingStudent.matricula, formData);
            } else {
                await createAluno(formData);
            }

            const res = await getAlunos();
            setApiData(res.data);

            setIsModalOpen(false);
            setUpdatingStudent(null); 
        } catch (error) {
            console.error("Erro ao salvar aluno", error);
            alert("Erro ao salvar aluno.");
        }
    };

    const handleOpenNew = () => {
        setUpdatingStudent(null);
        setIsModalOpen(true);
    };

    const handleOpenUpdate = (student) => {
        setUpdatingStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = async (matricula) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            await deleteAluno(matricula);
            setApiData(apiData.filter(u => u.matricula !== matricula));
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
                <h1>Gerenciamento de Alunos</h1>
                <button onClick={handleOpenNew} className="btn-novo">
                    <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i>
                    NOVO ALUNO
                </button>
            </div>

            <ModalNovoAluno
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveForm}
                alunoParaAtualizar={updatingStudent}
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
                            <th>Nome</th>
                            <th>Matricula</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Periodo</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedList.map((student, index) => (
                            <tr key={index}>
                                <td>{student.nome}</td>
                                <td>{student.matricula}</td>
                                <td>{student.email}</td>
                                <td>{student.telefone}</td>
                                <td>{student.periodo_de_referencia}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => handleOpenUpdate(student)} className="action-btn edit" title="Editar">
                                            <i className="bi bi-pencil-square" style={{ color: '#38B6FF', fontSize: '1.2rem' }}></i>
                                        </button>
                                        <button onClick={() => handleDelete(student.matricula)} className="action-btn delete" title="Excluir">
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
                                <td></td><td></td><td></td><td></td><td></td><td></td>
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

export default GerenciamentoAlunos;