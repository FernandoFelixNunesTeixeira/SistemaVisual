import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/alunos"; 

export const getAlunos = async () => {
  return axios.get(API_URL);
};

// 🔹 Retorna aluno por matricula
export const getAlunoById = async (matricula) => {
  return axios.get(`${API_URL}/${matricula}`);
};

// 🔹 Cadastra um novo aluno
// (seu endpoint é /api/aluno/cadastro)
export const createAluno = async (aluno) => {
  return axios.post(`${API_URL}/`, aluno);
};

// 🔹 Atualiza um aluno existente
// (seu endpoint é /api/aluno/{matricula})
export const updateAluno = async (matricula, aluno) => {
  return axios.put(`${API_URL}/${matricula}`, aluno);
};

// 🔹 Deleta um aluno
export const deleteAluno = async (matricula) => {
  return axios.delete(`${API_URL}/${matricula}`);
};

