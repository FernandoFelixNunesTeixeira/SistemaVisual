import { useEffect, useState } from "react";
import usePaginationAndFilter from "../../../hooks/usePaginationAndFilter";
import { getSalas } from "../../../services/salasService";
import "./GerenciamentoSalas.css";

const initialColumns = [
  { key: "nomeSala", label: "Nome da Sala" },
  {
    key: "acoes",
    label: "Ações",
    render: (val, row) => (
      <button className="btn btn-sm btn-primary">Editar</button>
    ),
  },
];

export default function GerenciamentoSalas({
  columns = initialColumns,
  itemsPerPage = 10,
}) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await getSalas();
        console.log("getSalas raw response:", res);

        // suporta axios (res.data), fetch (res -> array) e possiveis wrappers
        const payload = res?.data ?? res;
        // Se payload for um objeto com chave items ou results, tente extrair
        const list = Array.isArray(payload)
          ? payload
          : payload?.items ?? payload?.results ?? [];

        setApiData(list);
      } catch (err) {
        console.error("Erro ao buscar salas:", err);
      }
    }

    carregar();
  }, []);

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
  } = usePaginationAndFilter(apiData, itemsPerPage);

  return (
    <div className="table-responsive m-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="new-classroom btn btn-primary">Nova Sala</button>
      </div>

      <div className="pagination d-flex flex-column align-items-right justify-content-right">
        <div className="d-flex justify-content-between mb-3">
          <div className="input-group w-25">
            <span className="input-group-text">Filtro</span>
            <select
              className="form-select"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
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
      </div>

      <table className="table table-hover table-striped align-middle">
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedList.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            paginatedList.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">{totalItems} registro(s)</small>

        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>
                Primeira
              </button>
            </li>

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
                  className={`page-item ${
                    pageNum === currentPage ? "active" : ""
                  }`}
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
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </li>

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
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
