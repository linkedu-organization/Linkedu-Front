import type { Recrutador } from "@domains/Recrutador";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/recrutadores`,
});

export const registerRecrutador = async (data: Recrutador) => {
  const response = await api.post("/", data);
  return response.data;
};

export const getRecrutador = async (id: number) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getAllRecrutador = async () => {
  const response = await api.get("/");
  return response.data;
};

export const updateRecrutador = async (id: number, data: Recrutador) => {
  const response = await api.put(`/${id}`, data);
  return response.data;
};

export const deleteRecrutador = async (id: number) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
