import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div class="top-footer">
        <div class="d-flex flex-row align-items-center justify-content-center p-3 gap-5">
            <h4><a href="#">Contato</a></h4>
            <h4><a href="#">Sobre</a></h4>
            <h4><a href="#">Termos de Uso</a></h4>
        </div>

        <footer class="d-flex flex-column align-items-center justify-content-center">
            <p>Copyright © Student CellVision; All rights reserved.</p>
        </footer>
    </div>
    
  );
};

export default Footer;
