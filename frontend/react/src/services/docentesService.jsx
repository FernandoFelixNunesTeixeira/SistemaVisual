import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/docentes"; 

export const getDocentes = async () => {
  return axios.get(API_URL);
};

// 🔹 Retorna sala por ID
export const getDocentesById = async (matricula) => {
  return axios.get(`${API_URL}/${matricula}`);
};

// 🔹 Cadastra uma nova sala
// (seu endpoint é /api/sala/cadastro)
export const createDocente = async (docente) => {
  return axios.post(`${API_URL}/`, docente);
};

// 🔹 Atualiza uma sala existente
// (seu endpoint é /api/sala/Atualizar/{id})
export const updateDocente = async (matricula, docente) => {
  return axios.put(`${API_URL}/${matricula}`, docente);
};

// 🔹 Deleta uma sala
export const deleteDocente = async (matricula) => {
  return axios.delete(`${API_URL}/${matricula}`);
};
