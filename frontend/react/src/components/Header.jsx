import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from '../assets/react.svg'
import "./Header.css";

const Header = () => {
  return (
    <header class="d-flex flex-row align-items-center">
        <img src={Logo} alt="Logo" class="m-3"/>
    </header>
  );
};

export default Header;
