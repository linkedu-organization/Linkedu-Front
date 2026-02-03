import type { Vaga } from "@domains/Vaga";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/vagas`,
});

export const registerVaga = async (data: Vaga) => {
  const response = await api.post("/", data);
  return response.data;
};

export const getVaga = async (id: unknown) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// export const getAllVagaByCandidato = async (idCand: unknown) => {
//   const response = await api.get(`/${idCand}`);
//   return response.data;
// };

export const updateVaga = async (id: number, data: Vaga) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteVaga = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
