import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import TermOfUse from "./pages/TermOfUse.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import User from "./pages/User.jsx";
import AlertDashboard from "./pages/Alerts/AlertDashboard.jsx";
import './main.css';

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
        path: "/terms-of-use",
        element: <TermOfUse />
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
                path: "/user",
                element: <User />,
            },
            {
                path: "/monitoring",
                element: <AlertDashboard />,
            },
        ],
    },
]);

export default router;