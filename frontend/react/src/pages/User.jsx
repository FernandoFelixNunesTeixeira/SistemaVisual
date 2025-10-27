import './User.css';

function User() {
    return (
        <div className="container user-profile-page py-5">
            <div className="row justify-content-center align-items-start gy-4 py-5">

                <div className="col-lg-4 col-md-6">

                    <div className="card profile-card position-relative border-0 shadow-sm rounded-4">

                        <button type="button" className="btn btn-light btn-icon exit-btn position-absolute top-0 start-0 translate-middle rounded-circle shadow-sm">
                            <img src="https://api.iconify.design/ph/sign-out-bold.svg?color=%23009ef7&width=20&height=20" alt="Sair" />
                        </button>

                        <div className="profile-pic-container position-relative">
                            <div className="profile-pic-bg rounded-circle d-flex align-items-center justify-content-center shadow-lg">
                                <img src="https://api.iconify.design/ph/user-bold.svg?color=white&width=60&height=60" alt="User"/>
                            </div>

                            <button type="button" className="btn btn-primary btn-icon edit-pic-btn position-absolute border border-2 border-white rounded-2 shadow-sm">
                                <img src="https://api.iconify.design/ph/image-bold.svg?color=white&width=16&height=16" alt="Editar imagem"/>
                            </button>
                        </div>

                        <div className="card-body text-center pt-5">
                            <h5 className="fw-bold mb-0">Nome do Usuário</h5>
                            <p className="text-muted mb-2">PC123456789</p>
                            <p className="text-muted small">user@usr.ifsp.edu.br</p>
                        </div>

                        <div className="card-footer bg-white border-0 rounded-bottom-4 pt-0">
                            <div className="form-check form-switch d-flex align-items-center justify-content-center p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                                <input className="form-check-input me-2" type="checkbox" role="switch" id="notificacaoSwitch" defaultChecked />
                                <label className="form-check-label small" htmlFor="notificacaoSwitch">
                                    Permitir notificações por e-mail
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-md-6">
                    <div className="card salas-card border-0 shadow-sm rounded-4 overflow-hidden">

                        <div className="card-header text-white text-center border-0" style={{ backgroundColor: '#36a9e1' }}>
                            <h5 className="mb-0 py-2 fw-bold">Minhas Salas</h5>
                        </div>

                        <div className="card-body p-0">
                            <table className="table table-striped mb-0">
                                <tbody>
                                    <tr>
                                        <td className="fw-medium">Sala 201</td>
                                        <td className="text-muted">Terça-Feira 8:40-12:15</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-medium">Sala 204</td>
                                        <td className="text-muted">Quinta-Feira 8:40-12:15</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;