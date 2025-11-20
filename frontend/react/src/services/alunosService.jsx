import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/alunos"; 

export const getAlunos = async () => {
  return axios.get(API_URL);
};

// 🔹 Retorna aluno por ID
export const getAlunoById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// 🔹 Cadastra um novo aluno
// (seu endpoint é /api/aluno/cadastro)
export const createAluno = async (user) => {
  return axios.post(`${API_URL}/`, user);
};

// 🔹 Atualiza um aluno existente
// (seu endpoint é /api/aluno/Atualizar/{id})
export const updateAluno = async (id, user) => {
  return axios.put(`${API_URL}/Atualizar/${id}`, user);
};

// 🔹 Deleta um aluno
export const deleteAluno = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

