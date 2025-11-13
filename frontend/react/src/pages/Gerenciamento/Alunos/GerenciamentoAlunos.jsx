import './GerenciamentoAlunos.css';

// Lista de alunos teste
const students = [
    {nome: 'Nome 1', prontuario: 'PC123456789', email: 'aluno@ifsp.edu.br', telefone: '98765-4321'},
];

export default function GerenciamentoAlunos() {

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
                    <select id="show-entries-select">
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
                        {students.map((student, index) => (
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
                                        <button className="action-btn check" title="Concluir">
                                            <img src={iconConcluir} alt="Concluir" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* Linhas de placeholder para preencher a tabela */}
                        {Array.from({ length: Math.max(0, 10 - students.length) }).map((_, index) => (
                            <tr key={`placeholder-${index}`} style={{ height: '62px' }}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <div className="footer-info">
                    Mostrando de 1 até {totalRegistros} de {totalRegistros} registros
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Anterior</a>
                        </li>
                        <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">Próximo</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
}