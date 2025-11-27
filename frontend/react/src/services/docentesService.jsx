import api from "./api";

const BASE_PATH = "/docentes";

export const getDocentes = async () => {
  return api.get(`${BASE_PATH}/`);
};

export const getDocenteById = async (matricula) => {
  return api.get(`${BASE_PATH}/${matricula}`);
};

export const createDocente = async (docenteData) => {
  return api.post(`${BASE_PATH}/`, docenteData);
};

export const updateDocente = async (matricula, docenteData) => {
  return api.put(`${BASE_PATH}/${matricula}`, docenteData);
};

export const deleteDocente = async (matricula) => {
  return api.delete(`${BASE_PATH}/${matricula}`);
};