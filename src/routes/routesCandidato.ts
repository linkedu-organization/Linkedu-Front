import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const registerCandidato = async (data: unknown) => {
  const response = await api.post("/candidato", data);
  return response.data;
};
