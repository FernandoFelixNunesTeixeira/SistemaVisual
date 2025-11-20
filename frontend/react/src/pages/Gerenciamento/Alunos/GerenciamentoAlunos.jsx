import './GerenciamentoAlunos.css';
import { usePagination } from '../../../hooks/usePagination';
import { createAluno, deleteAluno, getAlunos } from '../../../services/alunosService';
import { useState, useEffect } from 'react';
import ModalNovoAluno from './ModalNovoAluno';

// TO-DO: Adicionar periodo_de_referencia e filtro por ano e bimestre
// Barra de Pesquisa tambem seria bom

function GerenciamentoAlunos() {
    const [apiData, setApiData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAlunos().then(res => setApiData(res.data));
    }, []);

    const handleCreateAluno = async (newAlunoData) => {
        try {
            await createAluno(newAlunoData); 

            const res = await getAlunos(); 
            setApiData(res.data);

            setIsModalOpen(false); 
        } catch (error) {
            console.error("Erro ao salvar aluno", error);
            alert("Erro ao salvar aluno.");
        }
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

    // Substituir por Icones do Bootstrap
    const iconNovoAluno = `https://api.iconify.design/feather/plus-circle.svg?color=%23FFFFFF&width=18&height=18`;
    const iconEditar = `https://api.iconify.design/feather/edit.svg?color=%2338B6FF&width=18&height=18`;
    const iconExcluir = `https://api.iconify.design/feather/trash-2.svg?color=%23FF0000&width=18&height=18`;
    const iconConcluir = `https://api.iconify.design/feather/check-circle.svg?color=%234CAF50&width=18&height=18`;

    return (
        <div className="student-management-container">

            <div className="student-header">
                <h1>Gerenciamento de Alunos</h1>
                <button onClick={() => setIsModalOpen(true)} className="btn-novo-aluno">
                    <img src={iconNovoAluno} alt="Novo Aluno" />
                    NOVO ALUNO
                </button>
            </div>

            <ModalNovoAluno
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateAluno} />

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
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Prontuário</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedList.map((apiData, index) => (
                            <tr key={index}>
                                <td>{apiData.nome}</td>
                                <td>{apiData.matricula}</td>
                                <td>{apiData.email}</td>
                                <td>{apiData.telefone}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" title="Editar">
                                            <img src={iconEditar} alt="Editar" />
                                        </button>
                                        <button onClick={() => handleDelete(apiData.matricula)} className="action-btn delete" title="Excluir">
                                            <img src={iconExcluir} alt="Excluir" />
                                        </button>
                                        <button  className="action-btn check" title="Concluir">
                                            <img src={iconConcluir} alt="Concluir" />
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
                                <td></td><td></td><td></td><td></td><td></td>
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