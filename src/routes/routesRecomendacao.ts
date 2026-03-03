import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/recomendacoes`,
  withCredentials: true,
});

export const createRecommendedCandidates = async (vagaId: number) => {
  const { data } = await api.post(`/candidatos-para-vaga/${vagaId}`);
  return data;
};

export const getRecommendedCandidates = async (vagaId: number) => {
  const { data } = await api.get(`/candidatos-para-vaga/${vagaId}`);
  return data;
};

export const createRecommendedVagas = async () => {
  const { data } = await api.post(`/vagas-para-candidato`);
  return data;
};

export const getRecommendedVagas = async () => {
  const { data } = await api.get(`/vagas-para-candidato`);
  return data;
};
