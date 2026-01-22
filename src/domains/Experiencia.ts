import type { Candidato } from "./Candidato";

export interface Experiencia {
  id?: number;
  titulo: string;
  descricao: string;
  orientador: string;
  instituicao: string;
  periodoInicio: string;
  periodoFim: string;
  local?: string;
  candidato: Candidato;
}
