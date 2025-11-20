import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import TermOfUse from "./pages/TermOfUse.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import User from "./pages/User.jsx";
import AlertDashboard from "./pages/Alerts/AlertDashboard.jsx";
import ListAlunos from "./pages/Gerenciamento/Alunos/ListAlunos.jsx";
import './main.css';
import GerenciamentoSalas from "./pages/Gerenciamento/Salas/GerenciamentoSalas.jsx";

const isAuthenticated = () => {
    return true; // TO-DO: GETS AUTHENTICAITON TOKEN FROM API OR LOCALSTORAGE
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return (
    <div className="wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>);
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/terms-of-use",
                element: <TermOfUse />
            },
            {
                path: "/user",
                element: <User />,
            },
            {
                path: "/monitoring",
                element: <AlertDashboard />,
            },
            {
                path: "/students",
                element: <ListAlunos />,
            },
            {
                path: "/classrooms",
                element: <GerenciamentoSalas />,
            }
        ],
    },
]);

export default router;