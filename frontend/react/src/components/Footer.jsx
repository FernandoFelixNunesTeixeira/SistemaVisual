import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="top-footer">
        <div className="d-flex flex-row align-items-center justify-content-center p-3 gap-5">
            <h5><a href="#">Contato</a></h5>
            <h5><a href="#">Sobre</a></h5>
            <h5><a href="#">Termos de Uso</a></h5>
        </div>

        <footer className="d-flex flex-column align-items-center justify-content-center">
            <p>Copyright © Student CellVision; All rights reserved.</p>
        </footer>
    </div>
    
  );
};

export default Footer;
