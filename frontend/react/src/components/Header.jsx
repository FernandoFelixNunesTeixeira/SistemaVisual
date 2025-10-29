import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from '../assets/LogoNovoAzul.svg';
import "./Header.css";

const Header = () => {
  return (
    <header className="three-part-header">
      <div className="header-left">
        <img src={Logo} alt="Logo" className="m-3" width="50" heigth="7"/>
      </div>

      <div className="header-middle">
      </div>

      <div className="header-right justify-content-center align-items-center mx-3 gap-5">
        <div className="d-flex flex-row align-items-center gap-5">
          <h5><a href="./">Home</a></h5>
          <h5><a href="#">Screen2</a></h5>
          <h5><a href="./monitoring">Painel</a></h5>
        </div>
        
        <div className="d-flex flex-row align-items-center gap-4">
          <a href="./user"><i className="bi bi-person-circle" style={{ fontSize: '32px', color: '#38B6FF' }}></i></a>
          <a href="#"><i className="bi bi-bell-fill" style={{ fontSize: '32px', color: '#38B6FF' }}></i></a>
        </div>     
      </div>
    </header>
  );
};

export default Header;
