import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const validarEmail = async (email: string) => {
  const response = await api.get("/perfil/validar-email", {
    params: { email },
  });
  return response;
};
