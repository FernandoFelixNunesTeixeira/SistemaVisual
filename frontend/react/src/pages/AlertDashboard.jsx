import './AlertDashboard.css';

function AlertDashboard() {
    return (
        <div className="alert-dashboard-container py-5">
            <div className="alert-main-card">
                <div className="alert-header">
                    <h3>Alertas em Tempo-Real</h3>
                </div>

                <div className="alert-body">
                    <div className="alert-filters">
                        <div className="filter-buttons">
                            <button type="button" className="filter-btn active">TODOS</button>
                            <button type="button" className="filter-btn">NOVOS</button>
                            <button type="button" className="filter-btn">PENDENTES</button>
                        </div>
                        <span className="active-alerts-text">5 Alertas Ativos</span>
                    </div>

                    {/* --- TO-DO: Transformar Alert Item em componentes e criar sistema aqui para gerar eles--- */}
                    <div className="alert-list">
                        <a href="#" className="alert-item">
                            <span className="alert-time">10:42 – Sala 201</span>
                            <span className="alert-arrow">&gt;</span>
                        </a>
                        <a href="#" className="alert-item">
                            <span className="alert-time">10:46 – Sala 202</span>
                            <span className="alert-arrow">&gt;</span>
                        </a>
                    </div>

                    <nav className="pagination">
                        <button type="button" className="page-btn active">1</button>
                        <button type="button" className="page-btn">2</button>
                        <button type="button" className="page-btn">3</button>
                        <button type="button" className="page-btn">4</button>
                    </nav>
                </div>
            </div>

            <div className="summary-cards">

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/bell.svg?color=white&width=28&height=28" alt="Alerts Icon"/>
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Totais de Alertas</span>
                        <span className="summary-value">15</span>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/alert-triangle.svg?color=white&width=28&height=28" alt="Alerts Icon"/>
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Alertas Pendentes</span>
                        <span className="summary-value">5</span>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">
                        <img src="https://api.iconify.design/feather/calendar.svg?color=white&width=28&height=28" alt="Alerts Icon"/>
                    </div>
                    <div className="summary-text">
                        <span className="summary-label">Alertas de Hoje</span>
                        <span className="summary-value">3</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AlertDashboard;