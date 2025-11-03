import Footer from "../components/Footer";
import Header from "../components/Header";
import Blank from "../components/Blank";
import { Link } from "react-router-dom";

//Página Principal
function Home() {
    //Retorna Painel do Administrador, contendo cards para gerenciar fiscais, gerenciar alunos e gerenciar alunos
    return (
        <div>
            <div className="container mt-5">
                <h2 className="my-5 admin-title">Painel do Administrador</h2>

                <div className="row g-4">

                    <div className="col-md-4">
                        <Link to="" className="card dashboard-card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4 d-flex align-items-center">
                                <img src="https://api.iconify.design/ph/user-list-bold.svg?color=%230dcaf0&width=56&height=56" alt="Home Icons"/>
                                <span className="ms-4 dashboard-text">GERENCIAR FISCAIS</span>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="" className="card dashboard-card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4 d-flex align-items-center">
                                <img src="https://api.iconify.design/ph/student-bold.svg?color=%230dcaf0&width=56&height=56" alt="Home Icons"/>
                                <span className="ms-4 dashboard-text">GERENCIAR ALUNOS</span>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="" className="card dashboard-card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4 d-flex align-items-center">
                                <img src="https://api.iconify.design/ph/presentation-chart-bold.svg?color=%230dcaf0&width=56&height=56" alt="Home Icons"/>
                                <span className="ms-4 dashboard-text">GERENCIAR SALAS</span>
                            </div>
                        </Link>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Home;
