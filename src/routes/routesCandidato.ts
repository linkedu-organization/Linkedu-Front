import type { Candidato } from "@domains/Candidato";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/candidatos`,
});

export const registerCandidato = async (data: Candidato) => {
  const response = await api.post("/", data);
  return response.data;
};

export const getCandidato = async (id: unknown) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getAllCandidato = async () => {
  const response = await api.get("/");
  console.log("getAllCandidato response.data:", response.data);
  return response.data;
};

export const updateCandidato = async (id: number, data: Candidato) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteCandidato = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
