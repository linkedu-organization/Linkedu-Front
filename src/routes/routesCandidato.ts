import type { Candidato } from "@domains/Candidato";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const registerCandidato = async (data: Candidato) => {
  const response = await api.post("/candidato/", data);
  return response.data;
};

export const getCandidato = async (id: number) => {
  const response = await api.get(`/candidato/${id}`);
  return response.data;
};

export const getAllCandidato = async () => {
  const response = await api.get("/candidato/");
  return response.data;
};

export const updateCandidato = async (id: number, data: Candidato) => {
  const response = await api.put(`/candidato/${id}`, data);
  return response.data;
};

export const deleteCandidato = async (id: number) => {
  const response = await api.delete(`/candidato/${id}`);
  return response.data;
};
