import type { Candidato } from "./Candidato";
import type { Recrutador } from "./Recrutador";

export interface Perfil {
  id?: number;
  nome: string;
  email: string;
  tipo: string;
  biografia?: string;
  foto?: string;
  createdAt?: string;
  updatedAt?: string;
  ultimoAcesso?: string;
  candidato?: Candidato;
  recrutador?: Recrutador;
}
