import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="top-footer">
        <div className="d-flex flex-row align-items-center justify-content-center p-3 gap-5">
            <h5><a href="./contact"><i className="bi bi-envelope-at-fill"></i>&nbsp;&nbsp;&nbsp;Contato</a></h5>
            <h5><a href="./about"><i className="bi bi-info-circle-fill"></i>&nbsp;&nbsp;&nbsp;Sobre</a></h5>
            <h5><a href="./terms-of-use"><i className="bi bi-book-fill"></i>&nbsp;&nbsp;&nbsp;Termos de Uso</a></h5>
        </div>

        <footer className="d-flex flex-column align-items-center justify-content-center">
            <p>Copyright © Student CellVision; All rights reserved.</p>
        </footer>
    </div>
    
  );
};

export default Footer;
