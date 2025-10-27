import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TO-DO: Validações de Usuario e Senha 
    if(username === "0" || password === "0") { 
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (true) { // TO-DO: Validar credencial com API
      console.log("Authenticated!");
      navigate("/"); 
    } else {
      alert("Login falhou");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light-blue">
      <div className="login-card p-4 bg-white rounded-4 shadow text-center">
        <h2 className="fw-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 text-start">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Nome de Usuário</label>
          </div>
          <div className="form-floating mb-3 text-start">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
          </div>
          <div className="text-start mb-4">
            <a href="#" className="link-secondary text-decoration-none small">Esqueci minha senha</a>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill px-4">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
