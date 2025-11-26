import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNotificationBell } from "../../hooks/useNotificationBell";
import Logo from '@/assets/logo.svg';
import "./Header.css";

// Cabeçalho com Logo, e link para as páginas Home e Painel (Página de Monitoramento)
const Header = () => {
  const { count, setCount } = useNotificationBell();

  return (
    <header className="three-part-header">
      <div className="header-left">
        <img src={Logo} alt="Logo" className="m-2" width="50" heigth="7" />
      </div>

      <div className="header-middle">
      </div>

      <div className="header-right d-flex flex-row align-items-center mx-3 gap-5">
        <div className="d-flex flex-row gap-5">
          <h5><a href="./">Home</a></h5>
          {/* <h5><a href="#">Screen2</a></h5> */}
          <h5><a href="./monitoring">Painel</a></h5>
          <h5><a href="./video">Câmeras</a></h5>
        </div>

        <div className="d-flex flex-row gap-4 position-relative">
          <a href="./user">
            <i className="bi bi-person-circle"
              style={{ fontSize: "32px", color: "#38B6FF" }}>
            </i>
          </a>

          <div className="position-relative">
            <a href="#" onClick={() => setCount(0)}>
              <i className="bi bi-bell-fill"
                style={{ fontSize: "32px", color: "#38B6FF" }}>
              </i>
            </a>

            {count > 0 && (
              <span className="notification-icon">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
