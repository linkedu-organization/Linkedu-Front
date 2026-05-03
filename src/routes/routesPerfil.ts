import type {
  PerfilAtualizarSenha,
  PerfilLogin,
  PerfilRecuperarSenha,
} from "@domains/Perfil";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const validarEmail = async (email: string) => {
  const response = await api.get("/perfil/validar-email", {
    params: { email },
  });
  return response;
};

export const login = async (data: PerfilLogin) => {
  const response = await api.post("/perfil/login", data);
  return response;
};

export const checkAutenticacao = async () => {
  const response = await api.get("/perfil/autenticado");
  return response;
};

export const recuperarSenha = async (data: PerfilRecuperarSenha) => {
  const response = await api.post("/perfil/recuperar-senha", data);
  return response;
};

export const atualizarSenha = async (data: PerfilAtualizarSenha) => {
  const response = await api.put("/perfil/atualizar-senha", data);
  return response;
};

export const logout = async () => {
  const response = await api.post("/perfil/logout");
  return response;
};
