import { useState, useMemo, use } from 'react';
import './AlertDashboard.css';

// TO-DO: Design - Ao alterar pagina os botoes de pagina se mexem, o ideal seria um espaco fixo independente de quantos card estiver na lista
// TO-DO: Substituir por chamada de endpoint API que retorne uma lista de alertas real
// TO-DO: Add data junto com Time para poder filtrar por dia (Estou pensando em Novo como todos dentro do dia, talvez possa ser mudado para todos dentro de x horas)
const DATA_TEST = [
    { id: 1, time: '10:42', location: 'Sala 201', status: 'NOVO' },
    { id: 2, time: '10:46', location: 'Sala 202', status: 'PENDENTE' },
    { id: 3, time: '11:00', location: 'Sala 203', status: 'NOVO' },
    { id: 4, time: '11:15', location: 'Sala 204', status: 'PENDENTE' },
    { id: 5, time: '11:30', location: 'Sala 205', status: 'NOVO' },
]
const getTodayString = () => new Date().toDateString();

/**
 * Paginação e Filtragem
 * @param {Array<any>} initialList - Lista inicial sem filtro
 * @param {number} itemsPerPage - Num de items por página
 */
export const usePaginationAndFilter = (initialList = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [filter, setFilter] = useState('');       // Filtro atual
    const [itemsPerPageState, setItemsPerPage] = useState(itemsPerPage);

    // Uso de Memoization nas funcoes abaixo para recalcular a lista apenas quando ter alteração na lista ou filtro

    const filteredList = useMemo(() => {
        if (filter === '') return initialList;
        return initialList.filter(item => item.status === filter);
    }, [initialList, filter]);

    const totalPages = useMemo(() => {
        return Math.ceil(filteredList.length / itemsPerPageState);
    }, [filteredList, itemsPerPageState]);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPageState;
        const endIndex = startIndex + itemsPerPageState;
        return filteredList.slice(startIndex, startIndex + itemsPerPageState);
    }, [filteredList, currentPage, itemsPerPageState]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // Volta para primeira pagina ao mudar filtro
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const hangleItemsPerPageChange = (newSize) => {
        setItemsPerPage(newSize);
        setCurrentPage(1);
    };

    return {
        paginatedList,
        currentPage,
        totalPages,
        filter,

        handleFilterChange,
        handlePageChange,
        hangleItemsPerPageChange,

        itemsPerPage: itemsPerPageState,
        totalItems: filteredList.length,
    };
}

function AlertDashboard() {
    const {
        paginatedList,
        filter,
        currentPage,
        totalPages,
        totalItems,
        handleFilterChange,
        handlePageChange,
    } = usePaginationAndFilter(DATA_TEST, 3);
    // OPCIONAL TO-DO: Permitir que usuario selecione quantos items por página ou calcular com base na tela

    const filterCalculation = useMemo(() => {
        const todayString = getTodayString();

        const totalAlerts = DATA_TEST.length;
        const pendingAlerts = DATA_TEST.filter(alert => alert.status === 'PENDING').length;
        const todayAlerts = DATA_TEST.filter(alert => new Date(alert.date).toDateString() == todayString).length;
        
        return { totalAlerts, pendingAlerts, todayAlerts };
    }, []);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="alert-dashboard-container py-5">
            <div className="alert-main-card">
                <div className="alert-header">
                    <h3><strong><i className="bi bi-globe"></i></strong>&nbsp;&nbsp;&nbsp;Alertas em Tempo-Real</h3>
                </div>

                <div className="alert-body">
                    <div className="alert-filters">
                        <div className="filter-buttons">
                            <button type="button" className={`filter-btn ${filter === '' ? 'active' : ''}`} onClick={() => handleFilterChange('')}><strong><i className="bi bi-database"></i></strong>&nbsp;&nbsp;&nbsp;TODOS</button>
                            <button type="button" className={`filter-btn ${filter === 'Novo' ? 'active' : ''}`} onClick={() => handleFilterChange('Novo')}><strong><i className="bi bi-newspaper"></i></strong>&nbsp;&nbsp;&nbsp;NOVOS</button>
                            <button type="button" className={`filter-btn ${filter === 'Pendente' ? 'active' : ''}`} onClick={() => handleFilterChange('Pendente')}><strong><i className="bi bi-exclamation-circle-fill"></i></strong>&nbsp;&nbsp;&nbsp;PENDENTES</button>
                        </div>
                        <span className="active-alerts-text">{totalItems} Alertas Ativos</span>
                    </div>

                    <div className="alert-list">
                        <div className="alert-list">
                            {paginatedList.length > 0 ? (
                                paginatedList.map(alert => (
                                    <a href="#" className="alert-item" key={alert.id}>
                                        <span className="alert-time">{alert.time} – {alert.location}</span>
                                        <span className="alert-arrow">&gt;</span>
                                    </a>
                                ))
                            ) : (
                                <div className="alert-item">
                                    <span className="alert-time">Nenhum alerta encontrado.</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="pagination">
                       {pageNumbers.map(pageNumber => (
                            <button key={pageNumber} className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`} onClick={() => handlePageChange(pageNumber)}> {pageNumber} </button>
                       ))}
                    </nav>
                </div>
            </div>

            <div className="summary-cards">

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/bell.svg?color=white&width=28&height=28" alt="Alerts Icon" />
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Totais de Alertas</span>
                        <span className="summary-value">
                            {filterCalculation.totalAlerts}
                        </span>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/alert-triangle.svg?color=white&width=28&height=28" alt="Alerts Icon" />
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Alertas Pendentes</span>
                        <span className="summary-value">
                            {filterCalculation.pendingAlerts}
                        </span>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/calendar.svg?color=white&width=28&height=28" alt="Alerts Icon" />
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Alertas de Hoje</span>
                        <span className="summary-value">
                            {filterCalculation.todayAlerts}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AlertDashboard;