import './ListAlunos.css';
import { usePagination } from '../../../hooks/usePagination';
import { deleteAluno, getAlunos } from '../../../services/alunosService';
import { useState, useEffect } from 'react';

// Lista de alunos teste
const students = [
    { nome: 'Nome 1', prontuario: 'PC123456789', email: 'aluno1@ifsp.edu.br', telefone: '98765-4321' },
    { nome: 'Nome 2', prontuario: 'PC223456789', email: 'aluno2@ifsp.edu.br', telefone: '98765-4322' },
    { nome: 'Nome 3', prontuario: 'PC323456789', email: 'aluno3@ifsp.edu.br', telefone: '98765-4323' },
    { nome: 'Nome 4', prontuario: 'PC423456789', email: 'aluno4@ifsp.edu.br', telefone: '98765-4324' },
    { nome: 'Nome 5', prontuario: 'PC523456789', email: 'aluno5@ifsp.edu.br', telefone: '98765-4325' },
    { nome: 'Nome 6', prontuario: 'PC623456789', email: 'aluno6@ifsp.edu.br', telefone: '98765-4326' },
    { nome: 'Nome 7', prontuario: 'PC723456789', email: 'aluno7@ifsp.edu.br', telefone: '98765-4327' },
    { nome: 'Nome 8', prontuario: 'PC823456789', email: 'aluno8@ifsp.edu.br', telefone: '98765-4328' },
    { nome: 'Nome 9', prontuario: 'PC923456789', email: 'aluno9@ifsp.edu.br', telefone: '98765-4329' },
    { nome: 'Nome 10', prontuario: 'PC103456789', email: 'aluno10@ifsp.edu.br', telefone: '98765-4330' },
    { nome: 'Nome 11', prontuario: 'PC113456789', email: 'aluno11@ifsp.edu.br', telefone: '98765-4331' },
    { nome: 'Nome 12', prontuario: 'PC123456780', email: 'aluno12@ifsp.edu.br', telefone: '98765-4332' },
    { nome: 'Nome 13', prontuario: 'PC133456789', email: 'aluno13@ifsp.edu.br', telefone: '98765-4333' },
    { nome: 'Nome 14', prontuario: 'PC143456789', email: 'aluno14@ifsp.edu.br', telefone: '98765-4334' },
    { nome: 'Nome 15', prontuario: 'PC153456789', email: 'aluno15@ifsp.edu.br', telefone: '98765-4335' },
];

function GerenciamentoAlunos() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        getAlunos().then(res => setAlunos(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir?")) {
            await deleteAluno(id);
            setAlunos(alunos.filter(u => u.id !== id));
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
    } = usePagination(students, 10);

    const totalRegistros = students.length;

    // Substituir por Icones do Bootstrap
    const iconNovoAluno = `https://api.iconify.design/feather/plus-circle.svg?color=%23FFFFFF&width=18&height=18`;
    const iconEditar = `https://api.iconify.design/feather/edit.svg?color=%2338B6FF&width=18&height=18`;
    const iconExcluir = `https://api.iconify.design/feather/trash-2.svg?color=%23FF0000&width=18&height=18`;
    const iconConcluir = `https://api.iconify.design/feather/check-circle.svg?color=%234CAF50&width=18&height=18`;

    return (
        <div className="student-management-container">

            <div className="student-header">
                <h1>Gerenciamento de Alunos</h1>
                <button className="btn-novo-aluno">
                    <img src={iconNovoAluno} alt="Novo Aluno" />
                    NOVO ALUNO
                </button>
            </div>

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
                        {paginatedList.map((student, index) => (
                            <tr key={index}>
                                <td>{student.nome}</td>
                                <td>{student.prontuario}</td>
                                <td>{student.email}</td>
                                <td>{student.telefone}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" title="Editar">
                                            <img src={iconEditar} alt="Editar" />
                                        </button>
                                        <button className="action-btn delete" title="Excluir">
                                            <img src={iconExcluir} alt="Excluir" />
                                        </button>
                                        <button onClick={() => handleDelete(student.nome)} className="action-btn check" title="Concluir">
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