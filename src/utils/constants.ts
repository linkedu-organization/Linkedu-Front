export const instituicoes = [
  { label: "UFCG", value: "UFCG" },
  { label: "UFPB", value: "UFPB" },
  { label: "IFPB", value: "IFPB" },
  { label: "USP", value: "USP" },
  { label: "SENAI", value: "SENAI" },
  { label: "Outra", value: "OUTRA" },
];

export const cursos = [
  { label: "Ciência da Computação", value: "CIENCIA_DA_COMPUTACAO" },
  { label: "Arquitetura e Urbanismo", value: "ARQUITETURA_E_URBANISMO" },
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

export type CursoValue = "CIENCIA_DA_COMPUTACAO" | "ARQUITETURA_E_URBANISMO";

export interface OpcaoComCursos {
  label: string;
  value: string;
  cursos: CursoValue[];
}

export const interesses: OpcaoComCursos[] = [
  { label: "Inteligência Artificial", value: "IA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Ciência de Dados", value: "CIENCIA_DE_DADOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Desenvolvimento Web", value: "DESENVOLVIMENTO_WEB", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Backend", value: "BACKEND", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Arquitetura de Software", value: "ARQUITETURA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "DevOps", value: "DEVOPS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Infraestrutura", value: "INFRAESTRUTURA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Suporte", value: "SUPORTE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Suporte Técnico", value: "SUPORTE_TECNICO", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Frontend", value: "FRONTEND", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Mobile", value: "MOBILE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Desenvolvimento de APIs", value: "DESENVOLVIMENTO_DE_APIS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Microsserviços", value: "MICROSSERVICOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Sistemas Distribuídos", value: "SISTEMAS_DISTRIBUIDOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Qualidade de Software (QA)", value: "QA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Testes Automatizados", value: "TESTES_AUTOMATIZADOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Engenharia de Requisitos", value: "ENGENHARIA_DE_REQUISITOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "UX/UI Design", value: "UX_UI", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Produto (Product Management)", value: "PRODUTO", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Engenharia de Dados", value: "ENGENHARIA_DE_DADOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "MLOps", value: "MLOPS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "NLP (Processamento de Linguagem Natural)", value: "NLP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Visão Computacional", value: "VISAO_COMPUTACIONAL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Sistemas de Recomendação", value: "SISTEMAS_DE_RECOMENDACAO", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Mineração de Dados", value: "MINERACAO_DE_DADOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Estatística Aplicada", value: "ESTATISTICA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Business Intelligence (BI)", value: "BUSINESS_INTELLIGENCE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Cibersegurança", value: "CIBERSEGURANCA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Segurança de Aplicações", value: "SEGURANCA_DE_APLICACOES", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Redes e Protocolos", value: "REDES_E_PROTOCOLOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Cloud Computing", value: "CLOUD", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "IoT (Internet das Coisas)", value: "IOT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Robótica", value: "ROBOTICA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Computação Gráfica", value: "COMPUTACAO_GRAFICA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Jogos Digitais", value: "JOGOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Blockchain", value: "BLOCKCHAIN", cursos: ["CIENCIA_DA_COMPUTACAO"] },

  { label: "Projeto Arquitetônico", value: "PROJETO_ARQUITETONICO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Urbanismo e Planejamento Urbano", value: "URBANISMO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Paisagismo", value: "PAISAGISMO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Design de Interiores", value: "DESIGN_INTERIORES", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Patrimônio Histórico e Restauro", value: "PATRIMONIO_HISTORICO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Conforto Ambiental", value: "CONFORTO_AMBIENTAL", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Sustentabilidade na Construção", value: "SUSTENTABILIDADE_CONSTRUCAO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Construção Industrializada / Pré-fabricados", value: "CONSTRUCAO_INDUSTRIALIZADA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Modelagem BIM", value: "BIM", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Arquitetura Paramétrica e Computacional", value: "ARQUITETURA_PARAMETRICA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Fabricação Digital (CNC, Impressão 3D)", value: "FABRICACAO_DIGITAL", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Realidade Virtual / Aumentada em Arquitetura", value: "VR_AR_ARQUITETURA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Habitação Social", value: "HABITACAO_SOCIAL", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Acessibilidade e Design Universal", value: "ACESSIBILIDADE", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Gestão e Coordenação de Obras", value: "GESTAO_OBRAS", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Orçamento e Planejamento de Obras", value: "ORCAMENTO_OBRAS", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Infraestrutura Urbana", value: "INFRAESTRUTURA_URBANA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Mobilidade Urbana", value: "MOBILIDADE_URBANA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Geoprocessamento e SIG", value: "GEOPROCESSAMENTO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Regulação Urbana e Legislação", value: "REGULACAO_URBANA", cursos: ["ARQUITETURA_E_URBANISMO"] },

  { label: "Pesquisa Científica (IC)", value: "PESQUISA_CIENTIFICA", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Inovação e Empreendedorismo", value: "EMPREENDEDORISMO", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Extensão Universitária", value: "EXTENSAO", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Monitoria", value: "MONITORIA", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Empresa Júnior", value: "EMPRESA_JUNIOR", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Hackathons e Competições", value: "HACKATHONS", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Sustentabilidade e Tech for Good", value: "SUSTENTABILIDADE", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
];

export const habilidades: OpcaoComCursos[] = [
  { label: "Java", value: "JAVA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Spring", value: "SPRING", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "JavaScript", value: "JAVASCRIPT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "React", value: "REACT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Python", value: "PYTHON", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Machine Learning", value: "MACHINE_LEARNING", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Deep Learning", value: "DEEP_LEARNING", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "SQL", value: "SQL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "PostgreSQL", value: "POSTGRESQL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Docker", value: "DOCKER", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Linux", value: "LINUX", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Windows", value: "WINDOWS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Redes", value: "REDES", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Hardware", value: "HARDWARE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "TypeScript", value: "TYPESCRIPT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "C", value: "C", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "C++", value: "CPP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "C#", value: "CSHARP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Go", value: "GO", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Rust", value: "RUST", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Kotlin", value: "KOTLIN", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Swift", value: "SWIFT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "PHP", value: "PHP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "R", value: "R", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Next.js", value: "NEXTJS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Node.js", value: "NODEJS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "HTML", value: "HTML", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "CSS", value: "CSS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Tailwind CSS", value: "TAILWIND", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "React Native", value: "REACT_NATIVE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Flutter", value: "FLUTTER", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Spring Boot", value: "SPRING_BOOT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "REST APIs", value: "REST", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "GraphQL", value: "GRAPHQL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Microsserviços", value: "MICROSSERVICOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Mensageria (Kafka/RabbitMQ)", value: "MENSAGERIA", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "MySQL", value: "MYSQL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "SQLite", value: "SQLITE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "MongoDB", value: "MONGODB", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Redis", value: "REDIS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Modelagem de Dados", value: "MODELAGEM_DE_DADOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "ETL/ELT", value: "ETL_ELT", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Pandas", value: "PANDAS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "NumPy", value: "NUMPY", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Scikit-learn", value: "SCIKIT_LEARN", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "TensorFlow", value: "TENSORFLOW", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "PyTorch", value: "PYTORCH", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "NLP", value: "NLP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Visão Computacional", value: "VISAO_COMPUTACIONAL", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "LLMs / Prompt Engineering", value: "LLMS_PROMPT_ENGINEERING", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Avaliação de Modelos (métricas)", value: "AVALIACAO_DE_MODELOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Docker Compose", value: "DOCKER_COMPOSE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Kubernetes", value: "KUBERNETES", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "CI/CD", value: "CI_CD", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "GitHub Actions", value: "GITHUB_ACTIONS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "GitLab CI", value: "GITLAB_CI", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "AWS", value: "AWS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "GCP", value: "GCP", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Azure", value: "AZURE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Terraform", value: "TERRAFORM", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Testes Unitários", value: "TESTES_UNITARIOS", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Testes de Integração", value: "TESTES_DE_INTEGRACAO", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "TDD", value: "TDD", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Observabilidade (Logs/Métricas/Tracing)", value: "OBSERVABILIDADE", cursos: ["CIENCIA_DA_COMPUTACAO"] },
  { label: "Segurança (OWASP)", value: "SEGURANCA_OWASP", cursos: ["CIENCIA_DA_COMPUTACAO"] },

  { label: "AutoCAD", value: "AUTOCAD", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Revit (BIM)", value: "REVIT", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "ArchiCAD", value: "ARCHICAD", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "SketchUp", value: "SKETCHUP", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Rhinoceros 3D", value: "RHINO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Grasshopper (Parametric Design)", value: "GRASSHOPPER", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "3ds Max", value: "3DS_MAX", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Lumion (Renderização)", value: "LUMION", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "V-Ray (Renderização)", value: "VRAY", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Enscape (Renderização)", value: "ENSCAPE", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Adobe Photoshop", value: "PHOTOSHOP", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Adobe Illustrator", value: "ILLUSTRATOR", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "InDesign", value: "INDESIGN", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "QGIS / ArcGIS (Geoprocessamento)", value: "GIS", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Navisworks (Coordenação BIM)", value: "NAVISWORKS", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Projeto Estrutural Básico", value: "PROJETO_ESTRUTURAL", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Projeto de Instalações (Hidráulica/Elétrica)", value: "PROJETO_INSTALACOES", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "NBR / Normas Técnicas", value: "NBR_NORMAS", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Modelagem e Impressão 3D", value: "IMPRESSAO_3D", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Maquete Física", value: "MAQUETE_FISICA", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Levantamento Planialtimétrico", value: "LEVANTAMENTO_TOPOGRAFICO", cursos: ["ARQUITETURA_E_URBANISMO"] },
  { label: "Laudo Técnico e Perícia", value: "LAUDO_TECNICO", cursos: ["ARQUITETURA_E_URBANISMO"] },

  { label: "Git", value: "GIT", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Figma", value: "FIGMA", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Scrum", value: "SCRUM", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Kanban", value: "KANBAN", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Comunicação", value: "COMUNICACAO", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Trabalho em Equipe", value: "TRABALHO_EM_EQUIPE", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Inglês", value: "INGLES", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Escrita Científica", value: "ESCRITA_CIENTIFICA", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
  { label: "Apresentação", value: "APRESENTACAO", cursos: ["CIENCIA_DA_COMPUTACAO", "ARQUITETURA_E_URBANISMO"] },
];

export const filtrarPorCurso = (
  opcoes: OpcaoComCursos[],
  curso?: string | null
): OpcaoComCursos[] => {
  if (!curso) return opcoes;
  return opcoes.filter((o) => o.cursos.includes(curso as CursoValue));
};

export const getHabilidadesPorCurso = (curso?: string | null) =>
  filtrarPorCurso(habilidades, curso);

export const getInteressesPorCurso = (curso?: string | null) =>
  filtrarPorCurso(interesses, curso);

export const publicoAlvo = [
  { label: "Alunos de graduação", value: "ALUNO_GRADUACAO" },
  { label: "Alunos de pós graduação", value: "ALUNO_POS_GRADUACAO" },
  { label: "Técnicos", value: "TECNICO" },
  { label: "Pesquisadores", value: "PESQUISADOR" },
];

export const categorias = [
  { label: "Projeto de Pesquisa", value: "PROJETO_PESQUISA" },
  { label: "Projeto de Pesquisa e Desenvolvimento", value: "PROJETO_PESQUISA_DESENVOLVIMENTO" },
  { label: "Projeto de Pesquisa, Desenvolvimento e Inovação", value: "PROJETO_PESQUISA_DESENVOLVIMENTO_INOVACAO" },
  { label: "Projeto de Extensão", value: "PROJETO_EXTENSAO" },
  { label: "Monitoria", value: "MONITORIA" },
  { label: "Organização de Evento", value: "ORGANIZACAO_EVENTO" },
  { label: "Outros", value: "OUTROS" },
];

export const tipoPerfil = [
  { label: "Candidato", value: "CANDIDATO" },
  { label: "Recrutador", value: "RECRUTADOR" },
];

export const cargoCandidato = [
  { label: "Aluno", value: "ALUNO" },
  { label: "Técnico Administrativo", value: "TECNICO" },
];

export const cargaHoraria = [
  { label: "Até 10h", value: "ATE_10H" },
  { label: "De 10 a 20h", value: "DE_10_A_20H" },
  { label: "De 20 a 30h", value: "DE_20_A_30H" },
  { label: "Acima de 30h", value: "ACIMA_DE_30H" },
];

export const simNao = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

export const cargosRecrutador = [
  { label: "Professor", value: "PROFESSOR" },
  { label: "Pesquisador", value: "PESQUISADOR" },
  { label: "Técnico", value: "TECNICO" },
];

export const cargosCandidato = [
  { label: "Aluno", value: "ALUNO" },
  { label: "Técnico", value: "TECNICO" },
];