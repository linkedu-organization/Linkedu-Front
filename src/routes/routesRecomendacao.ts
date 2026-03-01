import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const createRecommendedCandidates = async (vagaId: number) => {
  const { data } = await api.post(`/recomendacoes/candidato/${vagaId}`);
  return data;
};

export const getRecommendedCandidates = async (vagaId: number) => {
  const { data } = await api.get(`/recomendacoes/candidato/${vagaId}`);
  return data; 
};

export const createRecommendedVagas = async () => {
  const { data } = await api.post(`/recomendacoes/vaga/`);
  return data;
};

export const getRecommendedVagas = async () => {
  const { data } = await api.get(`/recomendacoes/vaga/`);
  return data; 
};