import api from "./api";

const BASE_PATH = "/turmas";


export const getTurmas = async () => {
  return api.get(`${BASE_PATH}/`);
};

// Retorna turma por ID
export const getTurmasById = async (id) => {
  return api.get(`${BASE_PATH}/${id}`);
};

// Cadastra uma nova turma
export const createTurma = async (turma) => {
  return api.post(`${BASE_PATH}/`, turma);
};

// Atualiza uma turma existente
export const updateTurma = async (id, turma) => {
  return api.put(`${BASE_PATH}/${id}`, turma);
};

// Deleta uma turma existente
export const deleteTurma= async (id) => {
  return api.delete(`${BASE_PATH}/${id}`);
};
