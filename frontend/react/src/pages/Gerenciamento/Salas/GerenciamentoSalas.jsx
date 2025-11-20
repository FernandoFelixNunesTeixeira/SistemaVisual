import './GerenciamentoSalas.css';
import { useState, useEffect } from 'react';
import { getSalas, deleteSala } from '../../../services/salasService';
import usePaginationAndFilter from '../../../hooks/usePaginationAndFilter';

// Ícones
const iconNovo = `https://api.iconify.design/feather/plus-circle.svg?color=%23FFFFFF&width=18&height=18`;
const iconEditar = `https://api.iconify.design/feather/edit.svg?color=%2338B6FF&width=18&height=18`;
const iconExcluir = `https://api.iconify.design/feather/trash-2.svg?color=%23FF0000&width=18&height=18`;

export default function GerenciamentoSalas() {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await getSalas();
        const payload = res?.data ?? res;
        const list = Array.isArray(payload)
          ? payload
          : payload?.items ?? payload?.results ?? [];
        setSalas(list);
      } catch (err) {
        console.error('Erro ao buscar salas:', err);
      }
    }
    carregar();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir a sala?')) {
      try {
        await deleteSala(id);
        setSalas(salas.filter(s => s.id !== id));
      } catch (err) {
        console.error('Erro ao excluir sala:', err);
      }
    }
  };

  const {
    paginatedList,
    currentPage,
    totalPages,
    filter,
    handleFilterChange,
    handlePageChange,
    hangleItemsPerPageChange,
    itemsPerPage: itemsPerPageState,
    totalItems,
  } = usePaginationAndFilter(salas, 10);

  return (
    <div className="student-management-container">

      <div className="student-header">
        <h1>Gerenciamento de Salas</h1>
        <button className="btn-novo-aluno">
          <img src={iconNovo} alt="Nova Sala" />
          NOVA SALA
        </button>
      </div>

      <div className="table-controls d-flex justify-content-between mb-3">
        <div className="input-group w-25">
          <span className="input-group-text">Filtro</span>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="ativo">Ativas</option>
            <option value="inativo">Inativas</option>
          </select>
        </div>

        <div className="input-group w-25">
          <span className="input-group-text">Itens/Página</span>
          <select
            className="form-select"
            value={itemsPerPageState}
            onChange={(e) => hangleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <table className="student-table">
          <thead>
            <tr>
              <th>Nome da Sala</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center py-4">
                  Nenhuma sala encontrada.
                </td>
              </tr>
            ) : (
              paginatedList.map((sala, idx) => (
                <tr key={idx}>
                  <td>{sala.nomeSala}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Editar">
                        <img src={iconEditar} alt="Editar" />
                      </button>
                      <button
                        className="action-btn delete"
                        title="Excluir"
                        onClick={() => handleDelete(sala.id)}
                      >
                        <img src={iconExcluir} alt="Excluir" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer d-flex justify-content-between align-items-center mt-3">
        <div className="footer-info">
          Mostrando de {(currentPage - 1) * itemsPerPageState + 1} até{' '}
          {Math.min(currentPage * itemsPerPageState, totalItems)} de {totalItems}{' '}
          registros
        </div>

        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>
                Primeira
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                «
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <li
                  key={pageNum}
                  className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </li>
            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(totalPages)}
              >
                Última
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
