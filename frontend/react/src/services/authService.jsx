import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const login = async (email, senha) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      senha,
    });

    if (response.data.access_token) {
      localStorage.setItem("user_token", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user_token");
};

const getCurrentUser = () => {
  return localStorage.getItem("user_token");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("user_token");
  
  if (!token) return false;

  try {
    // decodifica payload do JWT
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);

    // 'exp' do JWT é em segundos. Date.now() é em ms
    if (payload.exp) {
      const expirationTime = payload.exp * 1000;
      if (Date.now() >= expirationTime) {
        logout(); // se expirou limpa token
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("erro ao verificar validade do token:", error);
    logout();
    return false;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default authService;