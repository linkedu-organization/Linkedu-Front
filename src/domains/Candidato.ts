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
  tempoDisponivel: number;
  cargo: string;
}

export const defaultCandidato = {
  perfil: {
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    tipo: "",
    biografia: "",
    foto: "",
  },
  instituicao: "",
  areaAtuacao: "",
  nivelEscolaridade: "",
  periodoIngresso: "",
  periodoConclusao: "",
  linkedin: "",
  lattes: "",
  areasInteresse: [],
  habilidades: [],
  disponivel: true,
  tempoDisponivel: 0,
  cargo: "",
};
