import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/docentes"; 

export const getDocentes = async () => {
  return axios.get(API_URL);
};

// Retorna docente por ID
export const getDocentesById = async (matricula) => {
  return axios.get(`${API_URL}/${matricula}`);
};

// Cadastra um novo docente
export const createDocente = async (docente) => {
  return axios.post(`${API_URL}/`, docente);
};

// Atualiza um docente existente
export const updateDocente = async (matricula, docente) => {
  return axios.put(`${API_URL}/${matricula}`, docente);
};

// Deleta um docente
export const deleteDocente = async (matricula) => {
  return axios.delete(`${API_URL}/${matricula}`);
};
