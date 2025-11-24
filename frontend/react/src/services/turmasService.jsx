import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/turmas"; 

export const getTurmas = async () => {
  return axios.get(API_URL);
};

// Retorna turma por ID
export const getTurmasById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Cadastra uma nova turma
export const createTurma = async (turma) => {
  return axios.post(`${API_URL}/`, turma);
};

// Atualiza uma turma existente
export const updateTurma = async (id, turma) => {
  return axios.put(`${API_URL}/${id}`, turma);
};

// Deleta uma turma existente
export const deleteTurma= async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
