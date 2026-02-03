import type { Experiencia, ExperienciaSubmit } from "@domains/Experiencia";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/experiencias`,
});

export const registerExperiencia = async (data: ExperienciaSubmit) => {
  const response = await api.post("/", data);
  return response.data;
};

export const getExperiencia = async (id: unknown) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const updateExperiencia = async (id: number, data: Experiencia) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteExperiencia = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
