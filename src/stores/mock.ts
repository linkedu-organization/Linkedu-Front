import type { Candidato } from "@domains/Candidato";
import type { Experiencia } from "@domains/Experiencia";
import type { Perfil } from "@domains/Perfil";

export const perfilMock: Perfil = {
  nome: "Ana Rita Medeiros de Souza",
  email: "ana.rita.medeiros.souza@ccc.ufcg.edu.br",
  senha: "",
  confirmaSenha: "",
  tipo: "CANDIDATO",
  foto: "https://i.pravatar.cc/160?img=10",
  biografia:
    "Biografia é um gênero textual que narra a história da vida de uma pessoa, combinando elementos de jornalismo, literatura e história.Biografia é um gênero textual que narra a história da vida de uma pessoa, combinando elementos de jornalismo, literatura e história.",
  ultimoAcesso: "10/11/2025",
};

export const candidatoMock: Candidato = {
  perfil: perfilMock,
  instituicao: "Universidade Federal de Campina Grande",
  areaAtuacao: "Software Developer",
  nivelEscolaridade: "Graduação incompleta",
  periodoIngresso: "11/2022",
  periodoConclusao: "03/2027",
  linkedin: "https://linkedin.com",
  lattes: "https://lattes.cnpq.br",
  areasInteresse: [
    "Software Developer",
    "AI",
    "GoLang",
    "Java",
    "Python",
    "JavaScript",
    "ReactJS",
  ],
  habilidades: ["GoLang", "Java", "Python", "ReactJS"],
  disponivel: true,
  tempoDisponivel: 30,
  cargo: "Estagiário(a)",
};

export const experiencia1: Experiencia = {
  titulo: "Título",
  descricao:
    "Descrição da experiência, atividades realizadas e aprendizados obtidos. Pode falar de projetos, pesquisa, extensão, etc.",
  orientador: "Nome do orientador",
  instituicao: "Instituição de Ensino",
  periodoInicio: "2024-10-02",
  periodoFim: "2024-10-02",
  local: "Local da experiência - Instituição de Ensino",
  candidato: candidatoMock,
};
