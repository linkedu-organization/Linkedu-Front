import type { Perfil } from "./Perfil";

export interface Recrutador {
  id?: number;
  perfil: Perfil;
  cargo: string;
  instituicao: string;
  areaAtuacao: string;
  laboratorios?: string;
}

export const defaultRecrutador: Recrutador = {
  perfil: {
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    tipo: "RECRUTADOR",
    biografia: "",
    foto: "",
  },
  cargo: "",
  instituicao: "",
  areaAtuacao: "",
  laboratorios: "",
};
