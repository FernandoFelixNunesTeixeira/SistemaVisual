import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/horarios"; 

export const getHorarios = async () => {
  return axios.get(API_URL);
};

// Retorna horário por ID
export const getHorariosById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Cadastra um novo horário
export const createHorario = async (horario) => {
  return axios.post(`${API_URL}/`, horario);
};

// Atualiza um horário existente
export const updateHorario = async (id, horario) => {
  return axios.put(`${API_URL}/${id}`, horario);
};

// Deleta um horário existente
export const deleteHorario = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
