import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha"

//Tela de login, onde é capturado usuário e senha
//Onde será realizado as verificações necessárias 
//para saber se o usuário pode prosseguir
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Definir status do recaptcha
  const [captchaStatus, setCaptchaStatus] = useState(false);

  //Definir status da chave
  const [captchaToken, setToken] = useState('');
  const onSucess = (key) => {
    setToken(key)
    setCaptchaStatus(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // TO-DO: Validações de Usuario e Senha 
    if(username === "0" || password === "0") { 
        alert("Por favor, preencha todos os campos.");
        return;
    }

   if(captchaToken == '') {
      alert("Recaptcha inválido.");
      return;
   }
    
    //Falta deixar assincrono para não travar o prosseguimento da interface
    try {
        const response = fetch('http://127.0.0.1:5000/recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'response': captchaToken
            })
        });

        const answer = response.json();
        
        print(answer);
        navigate('/monitoring')
        
    } catch (error) {
        console.error("Erro na conexão:", error);
        setStatus("Erro ao conectar");
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
          <ReCAPTCHA
            sitekey="6LfsVhIsAAAAAAKxE4bDSyeB_L2w-iEgPJcVtAlZ"
            onChange={onSucess}
          />
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
