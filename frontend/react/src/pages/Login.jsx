import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha";
import authService from "../services/authService"; 

// Tela de login, onde é capturado email e senha
// Onde será realizado as verificações necessárias 
// para saber se o usuário pode prosseguir
function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Definir status do recaptcha
  const [captchaStatus, setCaptchaStatus] = useState(false);
  
  const onSucess = (value) => {
    // console.log(value); 
    setCaptchaStatus(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) { 
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação do ReCAPTCHA (Descomente para forçar o uso em produção)
    if (!captchaStatus) {
       alert("Por favor, complete a verificação de segurança (Não sou um robô).");
       return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      
      console.log("Authenticated!");
      navigate("/"); 

    } catch (error) {
      console.error("Erro no login:", error);
      
      // tenta extrair a msg de errp do backend 
      const errorMessage = error.response?.data?.error || "Falha ao realizar login. Verifique suas credenciais.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light-blue">
      <div className="login-card p-4 bg-white rounded-4 shadow text-center">
        <h2 className="fw-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 text-start">
            <input type="email" className="form-control" id="email" placeholder="Email do Usuário" value={email} 
            onChange={(e) => setEmail(e.target.value)} required/>
            <label htmlFor="email">Email do Usuário</label>
          </div>
          <div className="form-floating mb-3 text-start">
            <input type="password" className="form-control" id="password" placeholder="Senha" value={password} 
            onChange={(e) => setPassword(e.target.value)} required/>
            <label htmlFor="password">Senha</label>
          </div>
          
          <div className="d-flex justify-content-center mb-3">
            <ReCAPTCHA sitekey="6LfsVhIsAAAAAAKxE4bDSyeB_L2w-iEgPJcVtAlZ" onChange={onSucess}/>
          </div>

          <div className="text-start mb-4">
            <a href="#" className="link-secondary text-decoration-none small">Esqueci minha senha</a>
          </div>
          
          <button type="submit" className="btn btn-primary rounded-pill px-4"disabled={loading} >
            {loading ? "ENTRANDO..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;