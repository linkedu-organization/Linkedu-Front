import type { Candidato } from "./Candidato";
import type { Recrutador } from "./Recrutador";

export interface Perfil {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  tipo: string;
  biografia?: string;
  foto?: string;
  createdAt?: string;
  updatedAt?: string;
  ultimoAcesso?: string;
  candidato?: Candidato;
  recrutador?: Recrutador;
}

export interface PerfilLogin {
  email: string;
  senha: string;
}

export interface PerfilRecuperarSenha {
  email: string;
}

export interface PerfilAtualizarSenha {
  senha: string;
  token: string;
}

export const defaultPerfilLogin: PerfilLogin = {
  email: "",
  senha: "",
};
