import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/salas"; 

export const getSalas = async () => {
  return axios.get(API_URL);
};

// 🔹 Retorna sala por ID
export const getSalaById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// 🔹 Cadastra uma nova sala
// (seu endpoint é /api/sala/cadastro)
export const createSala = async (user) => {
  return axios.post(`${API_URL}/`, user);
};

// 🔹 Atualiza uma sala existente
// (seu endpoint é /api/sala/Atualizar/{id})
export const updateSala = async (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};

// 🔹 Deleta uma sala
export const deleteSala = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

