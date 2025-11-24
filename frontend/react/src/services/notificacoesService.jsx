import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/notificacoes"; 

export const getNotificacoes = async () => {
  return axios.get(API_URL);
};

// 🔹 Retorna aluno por matricula
export const getNotificacaoById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// 🔹 Deleta um aluno
export const deleteNotificacao = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

