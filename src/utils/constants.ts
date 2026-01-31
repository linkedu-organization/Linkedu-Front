export const instituicoes = [
  { label: "UFCG", value: "UFCG" },
  { label: "UFPB", value: "UFPB" },
  { label: "IFPB", value: "IFPB" },
  { label: "Outra", value: "Outra" },
];

export const niveis = [
  { label: "Ensino Fundamental Incompleto", value: "FUNDAMENTAL_INCOMPLETO" },
  { label: "Ensino Fundamental Completo", value: "FUNDAMENTAL_COMPLETO" },
  { label: "Ensino Médio Incompleto", value: "MEDIO_INCOMPLETO" },
  { label: "Ensino Médio Completo", value: "MEDIO_COMPLETO" },
  { label: "Superior Incompleto", value: "SUPERIOR_INCOMPLETO" },
  { label: "Superior Completo", value: "SUPERIOR_COMPLETO" },
  { label: "Pós Graduação", value: "POS_GRADUACAO" },
];

export const interesses = [
  { label: "IA / ML", value: "IA/ML" },
  { label: "Web", value: "WEB" },
  { label: "Mobile", value: "MOBILE" },
  { label: "DevOps", value: "DEVOPS" },
  { label: "Dados", value: "DADOS" },
  { label: "Testes", value: "TESTES" },
];

export const habilidades = [
  { label: "Java", value: "Java" },
  { label: "Python", value: "Python" },
  { label: "React", value: "React" },
  { label: "SQL", value: "SQL" },
  { label: "Docker", value: "Docker" },
  { label: "Git", value: "Git" },
];

export const publicoAlvoLabel: Record<string, string> = {
  ALUNO_GRADUACAO: "Alunos de graduação",
  ALUNO_POS_GRADUACAO: "Alunos de pós graduação",
  TECNICO: "Técnicos",
  PESQUISADOR: "Pesquisadores",
};

export const categoriaLabel: Record<string, string> = {
  PROJETO_PESQUISA: "Projeto de Pesquisa",
  PROJETO_PESQUISA_DESENVOLVIMENTO: "Projeto de Pesquisa e Desenvolvimento",
  PROJETO_PESQUISA_DESENVOLVIMENTO_INOVACAO: "Projeto de Pesquisa, Desenvolvimento e Inovação",
  PROJETO_EXTENSAO: "Projeto de Extensão",
  MONITORIA: "Monitoria",
  ORGANIZACAO_EVENTO: "Organização de Evento",
  OUTROS: "Outros",
};
