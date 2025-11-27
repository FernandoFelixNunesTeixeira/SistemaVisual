import api from "./api";

const BASE_PATH = "/salas";

export const getSalas = async () => {
  return api.get(`${BASE_PATH}/`);
};

// 🔹 Retorna sala por ID
export const getSalaById = async (id) => {
  return api.get(`${BASE_PATH}/${id}`);
};

// 🔹 Cadastra uma nova sala
// (seu endpoint é /api/sala/cadastro)
export const createSala = async (user) => {
  return api.post(`${BASE_PATH}/`, user);
};

// 🔹 Atualiza uma sala existente
// (seu endpoint é /api/sala/Atualizar/{id})
export const updateSala = async (id, user) => {
  return api.put(`${BASE_PATH}/${id}`, user);
};

// 🔹 Deleta uma sala
export const deleteSala = async (id) => {
  return api.delete(`${BASE_PATH}/${id}`);
};

