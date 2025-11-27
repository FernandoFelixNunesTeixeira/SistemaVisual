import { useMemo, useState, useEffect } from 'react';
import './AlertDashboard.css';
import usePaginationAndFilter from '../../hooks/usePaginationAndFilter';
import { getNotificacoes } from '../../services/notificacoesService';
import { getTurmasById } from '../../services/turmasService';

//Obter data atual
const getTodayString = () => new Date().toDateString();

function AlertDashboard() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await getNotificacoes();
                const notifications = res.data;

                const newApiData = await Promise.all(
                    notifications.map(async (alert) => {
                        if (alert.turmas_id) {
                            try {
                                const turmaRes = await getTurmasById(alert.turmas_id);
                                return { 
                                    ...alert, 
                                    codigo_disc: turmaRes.data.codigo_disc 
                                };
                            } catch (error) {
                                console.error(`Erro ao buscar detalhes da turma ${alert.turmas_id}:`, error);
                                return alert;
                            }
                        }
                        return alert;
                    })
                );
                
                setApiData(newApiData);
            } catch (error) {
                console.error("Erro ao carregar notificações:", error);
            }
        };

        fetchInitialData();
    }, []);

    // conexão SSE para atualizações em temp oreal
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/api/notificacoes/stream");

        eventSource.onmessage = async (event) => {
            if (event.data === "connected" || event.data.includes('"status": "connected"')) return;

            try {
                const newAlert = JSON.parse(event.data);
                
                let normalizedAlert = {
                    ...newAlert,
                    id: Date.now(), 
                    turmas_id: newAlert.nome_sala || newAlert.turmas_id, 
                    status: 'Novo' 
                };

                // Busca o codigo_disc para a nova notificação em tempo real
                if (normalizedAlert.turmas_id) {
                    try {
                        const turmaRes = await getTurmasById(normalizedAlert.turmas_id);
                        normalizedAlert.codigo_disc = turmaRes.data.codigo_disc;
                    } catch (error) {
                        console.error("Erro ao buscar detalhes da turma (SSE):", error);
                    }
                }

                setApiData((prevData) => [normalizedAlert, ...prevData]);

            } catch (error) {
                console.error("Erro ao processar atualização em tempo real:", error);
            }
        };

        eventSource.onerror = () => {
            console.log("Conexão SSE do Dashboard perdida.");
            eventSource.close();
            // todo implementar lógica de reconexão aqui  
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const {
        paginatedList,
        filter,
        currentPage,
        totalPages,
        totalItems,
        handleFilterChange,
        handlePageChange,
    } = usePaginationAndFilter(apiData, 3);
    
    // OPCIONAL TO-DO: Permitir que usuario selecione quantos items por página ou calcular com base na tela
    const filterCalculation = useMemo(() => {
        const todayString = getTodayString();

        const totalAlerts = apiData.length;
        const pendingAlerts = apiData.filter(alert => alert.status === 'PENDING').length;
        
        const todayAlerts = apiData.filter(alert => {
            const alertDate = new Date(typeof alert.occurred_at === 'number' ? alert.occurred_at * 1000 : alert.occurred_at);
            return alertDate.toDateString() === todayString;
        }).length;
        
        return { totalAlerts, pendingAlerts, todayAlerts };
    }, [apiData]);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const formatDate = (val) => {
        if (!val) return "-";
        const dateObj = new Date(typeof val === 'number' ? val * 1000 : val);
        return dateObj.toLocaleString('pt-BR'); 
    };

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
                                        <span className="alert-time">
                                            {formatDate(alert.occurred_at)} – {alert.codigo_disc || alert.turmas_id} - ({alert.porcentagem * 100}%)
                                        </span>
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