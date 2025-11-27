import api from "./api";

const BASE_PATH = "/horarios";

export const getHorarios = async () => {
  return api.get(`${BASE_PATH}/`);
};

// Retorna horário por ID
export const getHorariosById = async (id) => {
  return api.get(`${BASE_PATH}/${id}`);
};

// Cadastra um novo horário
export const createHorario = async (horario) => {
  return api.post(`${BASE_PATH}/`, horario);
};

// Atualiza um horário existente
export const updateHorario = async (id, horario) => {
  return api.put(`${BASE_PATH}/${id}`, horario);
};

// Deleta um horário existente
export const deleteHorario = async (id) => {
  return api.delete(`${BASE_PATH}/${id}`);
};
