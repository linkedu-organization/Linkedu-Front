import type { Recrutador } from "./Recrutador";

export interface Vaga {
  id: number;
  recrutadorId: number;
  titulo: string;
  descricao: string;
  ehPublica: boolean;
  ehRemunerada: boolean;
  dataExpiracao: string;
  cargaHoraria: number;
  duracao: string;
  instituicao: string;
  curso: string;
  linkInscricao: string;
  local: string;
  publicoAlvo: string[];
  conhecimentosObrigatorios: string[];
  conhecimentosOpcionais: string[];
  categoria: string;
  recrutador?: Recrutador;
}

export const defaultVaga: Omit<Vaga, "id" | "recrutador"> = {
  recrutadorId: 0,
  titulo: "",
  descricao: "",
  ehPublica: true,
  ehRemunerada: false,
  dataExpiracao: "",
  cargaHoraria: 0,
  duracao: "",
  instituicao: "",
  curso: "",
  linkInscricao: "",
  local: "",
  publicoAlvo: [],
  conhecimentosObrigatorios: [],
  conhecimentosOpcionais: [],
  categoria: "",
};
