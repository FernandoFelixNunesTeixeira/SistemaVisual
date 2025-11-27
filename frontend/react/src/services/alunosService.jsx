import api from "./api";

const BASE_PATH = "/alunos"; 

export const getAlunos = async () => {
  return api.get(`${BASE_PATH}/`);
};

export const getAlunoById = async (matricula) => {
  return api.get(`${BASE_PATH}/${matricula}`);
};

export const createAluno = async (aluno) => {
  return api.post(`${BASE_PATH}/`, aluno);
};

export const updateAluno = async (matricula, aluno) => {
  return api.put(`${BASE_PATH}/${matricula}`, aluno);
};

export const deleteAluno = async (matricula) => {
  return api.delete(`${BASE_PATH}/${matricula}`);
};