import type { Perfil } from "./Perfil";

export interface Candidato {
  id?: number;
  perfil: Perfil;
  instituicao: string;
  areaAtuacao: string;
  nivelEscolaridade: string;
  periodoIngresso: string;
  periodoConclusao: string;
  linkedin: string;
  lattes: string;
  areasInteresse: string[];
  habilidades: string[];
  disponivel: boolean;
  tempoDisponivel: string;
  cargo: string;
}
