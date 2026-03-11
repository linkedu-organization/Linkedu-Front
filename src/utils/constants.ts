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
  { label: "Engenharia de Software", value: "ENGENHARIA_DE_SOFTWARE" },
  { label: "Sistemas de Informação", value: "SISTEMAS_DE_INFORMACAO" },
  { label: "Engenharia da Computação", value: "ENGENHARIA_DA_COMPUTACAO" },
  { label: "Redes de Computadores", value: "REDES_DE_COMPUTADORES" },
  {
    label: "Análise e Desenvolvimento de Sistemas",
    value: "ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS",
  },
  { label: "Engenharia Elétrica", value: "ENGENHARIA_ELETRICA" },
  { label: "Engenharia Mecânica", value: "ENGENHARIA_MECANICA" },
  { label: "Engenharia Civil", value: "ENGENHARIA_CIVIL" },
  { label: "Engenharia de Produção", value: "ENGENHARIA_DE_PRODUCAO" },
  { label: "Engenharia Química", value: "ENGENHARIA_QUIMICA" },
  { label: "Administração", value: "ADMINISTRACAO" },
  { label: "Ciências Econômicas", value: "CIENCIAS_ECONOMICAS" },
  { label: "Design", value: "DESIGN" },
  { label: "Física", value: "FISICA" },
  { label: "Matemática", value: "MATEMATICA" },
  { label: "Estatística", value: "ESTATISTICA_CURSO" },
  {
    label: "Biomedicina / Bioinformática",
    value: "BIOMEDICINA_BIOINFORMATICA",
  },
  { label: "Outra", value: "OUTRA" },
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

export type CursoValue =
  | "CIENCIA_DA_COMPUTACAO"
  | "ARQUITETURA_E_URBANISMO"
  | "ENGENHARIA_DE_SOFTWARE"
  | "SISTEMAS_DE_INFORMACAO"
  | "ENGENHARIA_DA_COMPUTACAO"
  | "REDES_DE_COMPUTADORES"
  | "ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS"
  | "ENGENHARIA_ELETRICA"
  | "ENGENHARIA_MECANICA"
  | "ENGENHARIA_CIVIL"
  | "ENGENHARIA_DE_PRODUCAO"
  | "ENGENHARIA_QUIMICA"
  | "ADMINISTRACAO"
  | "CIENCIAS_ECONOMICAS"
  | "DESIGN"
  | "FISICA"
  | "MATEMATICA"
  | "ESTATISTICA_CURSO"
  | "BIOMEDICINA_BIOINFORMATICA"
  | "OUTRA";

export interface OpcaoComCursos {
  label: string;
  value: string;
  cursos: CursoValue[];
}

const TI: CursoValue[] = [
  "CIENCIA_DA_COMPUTACAO",
  "ENGENHARIA_DE_SOFTWARE",
  "SISTEMAS_DE_INFORMACAO",
  "ENGENHARIA_DA_COMPUTACAO",
  "REDES_DE_COMPUTADORES",
  "ANALISE_E_DESENVOLVIMENTO_DE_SISTEMAS",
];

const ENG_HARD: CursoValue[] = [
  "ENGENHARIA_ELETRICA",
  "ENGENHARIA_MECANICA",
  "ENGENHARIA_CIVIL",
  "ENGENHARIA_DE_PRODUCAO",
  "ENGENHARIA_QUIMICA",
];

const EXATAS: CursoValue[] = ["FISICA", "MATEMATICA", "ESTATISTICA_CURSO"];

const TODOS: CursoValue[] = [
  ...TI,
  "ARQUITETURA_E_URBANISMO",
  ...ENG_HARD,
  "ADMINISTRACAO",
  "CIENCIAS_ECONOMICAS",
  "DESIGN",
  ...EXATAS,
  "BIOMEDICINA_BIOINFORMATICA",
  "OUTRA",
];

export const interesses: OpcaoComCursos[] = [
  {
    label: "Inteligência Artificial",
    value: "IA",
    cursos: [...TI, "BIOMEDICINA_BIOINFORMATICA", "ESTATISTICA_CURSO"],
  },
  {
    label: "Ciência de Dados",
    value: "CIENCIA_DE_DADOS",
    cursos: [
      ...TI,
      "ESTATISTICA_CURSO",
      "ADMINISTRACAO",
      "CIENCIAS_ECONOMICAS",
      "BIOMEDICINA_BIOINFORMATICA",
    ],
  },
  { label: "Desenvolvimento Web", value: "DESENVOLVIMENTO_WEB", cursos: TI },
  { label: "Backend", value: "BACKEND", cursos: TI },
  { label: "Frontend", value: "FRONTEND", cursos: TI },
  { label: "Mobile", value: "MOBILE", cursos: TI },
  {
    label: "Arquitetura de Software",
    value: "ARQUITETURA_SOFTWARE",
    cursos: TI,
  },
  { label: "DevOps", value: "DEVOPS", cursos: TI },
  { label: "Infraestrutura de TI", value: "INFRAESTRUTURA_TI", cursos: TI },
  { label: "Suporte Técnico", value: "SUPORTE_TECNICO", cursos: TI },
  {
    label: "Desenvolvimento de APIs",
    value: "DESENVOLVIMENTO_DE_APIS",
    cursos: TI,
  },
  { label: "Microsserviços", value: "MICROSSERVICOS", cursos: TI },
  {
    label: "Sistemas Distribuídos",
    value: "SISTEMAS_DISTRIBUIDOS",
    cursos: TI,
  },
  { label: "Qualidade de Software (QA)", value: "QA", cursos: TI },
  { label: "Testes Automatizados", value: "TESTES_AUTOMATIZADOS", cursos: TI },
  {
    label: "Engenharia de Requisitos",
    value: "ENGENHARIA_DE_REQUISITOS",
    cursos: TI,
  },
  { label: "UX/UI Design", value: "UX_UI", cursos: [...TI, "DESIGN"] },
  {
    label: "Produto (Product Management)",
    value: "PRODUTO",
    cursos: [...TI, "ADMINISTRACAO"],
  },
  {
    label: "Engenharia de Dados",
    value: "ENGENHARIA_DE_DADOS",
    cursos: [...TI, "ESTATISTICA_CURSO"],
  },
  { label: "MLOps", value: "MLOPS", cursos: TI },
  {
    label: "NLP (Processamento de Linguagem Natural)",
    value: "NLP",
    cursos: TI,
  },
  { label: "Visão Computacional", value: "VISAO_COMPUTACIONAL", cursos: TI },
  {
    label: "Sistemas de Recomendação",
    value: "SISTEMAS_DE_RECOMENDACAO",
    cursos: TI,
  },
  {
    label: "Mineração de Dados",
    value: "MINERACAO_DE_DADOS",
    cursos: [...TI, "ESTATISTICA_CURSO"],
  },
  {
    label: "Business Intelligence (BI)",
    value: "BUSINESS_INTELLIGENCE",
    cursos: [...TI, "ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },
  { label: "Cibersegurança", value: "CIBERSEGURANCA", cursos: TI },
  {
    label: "Segurança de Aplicações",
    value: "SEGURANCA_DE_APLICACOES",
    cursos: TI,
  },
  { label: "Cloud Computing", value: "CLOUD", cursos: TI },
  {
    label: "IoT (Internet das Coisas)",
    value: "IOT",
    cursos: [...TI, "ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO"],
  },
  {
    label: "Robótica",
    value: "ROBOTICA",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ENGENHARIA_DA_COMPUTACAO",
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_MECANICA",
    ],
  },
  {
    label: "Computação Gráfica",
    value: "COMPUTACAO_GRAFICA",
    cursos: ["CIENCIA_DA_COMPUTACAO", "ENGENHARIA_DE_SOFTWARE", "DESIGN"],
  },
  {
    label: "Jogos Digitais",
    value: "JOGOS",
    cursos: ["CIENCIA_DA_COMPUTACAO", "ENGENHARIA_DE_SOFTWARE", "DESIGN"],
  },
  {
    label: "Blockchain",
    value: "BLOCKCHAIN",
    cursos: [...TI, "CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Redes e Protocolos",
    value: "REDES_E_PROTOCOLOS",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ENGENHARIA_DA_COMPUTACAO",
      "REDES_DE_COMPUTADORES",
      "ENGENHARIA_ELETRICA",
    ],
  },
  {
    label: "Sistemas Embarcados",
    value: "SISTEMAS_EMBARCADOS",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ENGENHARIA_DA_COMPUTACAO",
      "ENGENHARIA_ELETRICA",
    ],
  },

  {
    label: "Projeto Arquitetônico",
    value: "PROJETO_ARQUITETONICO",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Urbanismo e Planejamento Urbano",
    value: "URBANISMO",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Paisagismo",
    value: "PAISAGISMO",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Design de Interiores",
    value: "DESIGN_INTERIORES",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  {
    label: "Patrimônio Histórico e Restauro",
    value: "PATRIMONIO_HISTORICO",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Conforto Ambiental",
    value: "CONFORTO_AMBIENTAL",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Sustentabilidade na Construção",
    value: "SUSTENTABILIDADE_CONSTRUCAO",
    cursos: [
      "ARQUITETURA_E_URBANISMO",
      "ENGENHARIA_CIVIL",
      "ENGENHARIA_DE_PRODUCAO",
    ],
  },
  {
    label: "Modelagem BIM",
    value: "BIM",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Arquitetura Paramétrica",
    value: "ARQUITETURA_PARAMETRICA",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Fabricação Digital (CNC, Impressão 3D)",
    value: "FABRICACAO_DIGITAL",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_MECANICA", "DESIGN"],
  },
  {
    label: "Habitação Social",
    value: "HABITACAO_SOCIAL",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Acessibilidade e Design Universal",
    value: "ACESSIBILIDADE",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Gestão e Coordenação de Obras",
    value: "GESTAO_OBRAS",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Mobilidade Urbana",
    value: "MOBILIDADE_URBANA",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Geoprocessamento e SIG",
    value: "GEOPROCESSAMENTO",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Regulação Urbana e Legislação",
    value: "REGULACAO_URBANA",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },

  {
    label: "Eletrônica Analógica e Digital",
    value: "ELETRONICA",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO"],
  },
  {
    label: "Sistemas de Potência e Energia",
    value: "SISTEMAS_DE_POTENCIA",
    cursos: ["ENGENHARIA_ELETRICA"],
  },
  {
    label: "Automação Industrial",
    value: "AUTOMACAO_INDUSTRIAL",
    cursos: [
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_DE_PRODUCAO",
      "ENGENHARIA_MECANICA",
    ],
  },
  {
    label: "Telecomunicações",
    value: "TELECOMUNICACOES",
    cursos: [
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_DA_COMPUTACAO",
      "REDES_DE_COMPUTADORES",
    ],
  },
  {
    label: "Energias Renováveis",
    value: "ENERGIAS_RENOVAVEIS",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_MECANICA", "FISICA"],
  },
  {
    label: "Instrumentação e Sensores",
    value: "INSTRUMENTACAO",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_MECANICA", "FISICA"],
  },
  {
    label: "Processamento de Sinais",
    value: "PROCESSAMENTO_DE_SINAIS",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO", "FISICA"],
  },

  {
    label: "Projeto Mecânico e CAD",
    value: "PROJETO_MECANICO_CAD",
    cursos: ["ENGENHARIA_MECANICA"],
  },
  {
    label: "Manufatura e Processos de Produção",
    value: "MANUFATURA",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_DE_PRODUCAO"],
  },
  {
    label: "Termodinâmica e Transferência de Calor",
    value: "TERMODINAMICA",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_QUIMICA", "FISICA"],
  },
  {
    label: "Mecânica dos Fluidos",
    value: "MECANICA_DOS_FLUIDOS",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_QUIMICA", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Dinâmica e Controle de Sistemas",
    value: "DINAMICA_CONTROLE",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_ELETRICA"],
  },
  {
    label: "Análise de Elementos Finitos (FEA)",
    value: "FEA",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Materiais e Metalurgia",
    value: "MATERIAIS_METALURGIA",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_QUIMICA"],
  },
  {
    label: "Manutenção Industrial",
    value: "MANUTENCAO_INDUSTRIAL",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_DE_PRODUCAO"],
  },

  {
    label: "Estruturas e Resistência dos Materiais",
    value: "ESTRUTURAS",
    cursos: ["ENGENHARIA_CIVIL", "ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Fundações e Geotecnia",
    value: "GEOTECNIA",
    cursos: ["ENGENHARIA_CIVIL"],
  },
  {
    label: "Hidráulica e Saneamento",
    value: "HIDRAULICA_SANEAMENTO",
    cursos: ["ENGENHARIA_CIVIL", "ENGENHARIA_QUIMICA"],
  },
  {
    label: "Topografia e Geodésia",
    value: "TOPOGRAFIA",
    cursos: ["ENGENHARIA_CIVIL"],
  },
  {
    label: "Pavimentação e Transportes",
    value: "PAVIMENTACAO_TRANSPORTES",
    cursos: ["ENGENHARIA_CIVIL"],
  },
  {
    label: "Orçamento e Planejamento de Obras",
    value: "ORCAMENTO_OBRAS",
    cursos: ["ENGENHARIA_CIVIL", "ARQUITETURA_E_URBANISMO"],
  },

  {
    label: "Gestão da Qualidade (Six Sigma / ISO)",
    value: "GESTAO_QUALIDADE",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "ADMINISTRACAO"],
  },
  {
    label: "Logística e Cadeia de Suprimentos",
    value: "LOGISTICA",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "ADMINISTRACAO"],
  },
  {
    label: "Pesquisa Operacional",
    value: "PESQUISA_OPERACIONAL",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "MATEMATICA", "ESTATISTICA_CURSO"],
  },
  {
    label: "Ergonomia e Fatores Humanos",
    value: "ERGONOMIA",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "DESIGN"],
  },
  {
    label: "Lean Manufacturing",
    value: "LEAN",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "ADMINISTRACAO"],
  },
  {
    label: "Simulação de Processos Industriais",
    value: "SIMULACAO_PROCESSOS",
    cursos: [
      "ENGENHARIA_DE_PRODUCAO",
      "ENGENHARIA_QUIMICA",
      "ENGENHARIA_MECANICA",
    ],
  },

  {
    label: "Processos Químicos e Reatores",
    value: "PROCESSOS_QUIMICOS",
    cursos: ["ENGENHARIA_QUIMICA"],
  },
  {
    label: "Operações Unitárias",
    value: "OPERACOES_UNITARIAS",
    cursos: ["ENGENHARIA_QUIMICA"],
  },
  {
    label: "Petróleo e Gás",
    value: "PETROLEO_GAS",
    cursos: ["ENGENHARIA_QUIMICA", "ENGENHARIA_MECANICA"],
  },
  {
    label: "Biotecnologia Industrial",
    value: "BIOTECNOLOGIA_INDUSTRIAL",
    cursos: ["ENGENHARIA_QUIMICA", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Controle de Processos Químicos",
    value: "CONTROLE_PROCESSOS",
    cursos: ["ENGENHARIA_QUIMICA", "ENGENHARIA_ELETRICA"],
  },
  {
    label: "Sustentabilidade e Processos Verdes",
    value: "PROCESSOS_VERDES",
    cursos: ["ENGENHARIA_QUIMICA", "ENGENHARIA_DE_PRODUCAO"],
  },

  {
    label: "Gestão Estratégica e Negócios",
    value: "GESTAO_ESTRATEGICA",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Marketing Digital",
    value: "MARKETING_DIGITAL",
    cursos: ["ADMINISTRACAO", "DESIGN"],
  },
  {
    label: "Finanças Corporativas",
    value: "FINANCAS_CORPORATIVAS",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Recursos Humanos e Gestão de Pessoas",
    value: "RECURSOS_HUMANOS",
    cursos: ["ADMINISTRACAO"],
  },
  {
    label: "Gestão de Projetos (PMI/PMBOK)",
    value: "GESTAO_PROJETOS",
    cursos: ["ADMINISTRACAO", "ENGENHARIA_DE_PRODUCAO", ...TI],
  },
  {
    label: "Startups e Inovação",
    value: "STARTUPS",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS", ...TI],
  },
  {
    label: "E-commerce e Negócios Digitais",
    value: "ECOMMERCE",
    cursos: ["ADMINISTRACAO", ...TI],
  },
  {
    label: "Contabilidade e Controladoria",
    value: "CONTABILIDADE",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },

  {
    label: "Econometria",
    value: "ECONOMETRIA",
    cursos: ["CIENCIAS_ECONOMICAS", "ESTATISTICA_CURSO", "MATEMATICA"],
  },
  {
    label: "Economia Comportamental",
    value: "ECONOMIA_COMPORTAMENTAL",
    cursos: ["CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Macroeconomia e Política Econômica",
    value: "MACROECONOMIA",
    cursos: ["CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Mercado Financeiro e Investimentos",
    value: "MERCADO_FINANCEIRO",
    cursos: ["CIENCIAS_ECONOMICAS", "ADMINISTRACAO", "MATEMATICA"],
  },
  {
    label: "Economia Internacional",
    value: "ECONOMIA_INTERNACIONAL",
    cursos: ["CIENCIAS_ECONOMICAS"],
  },

  { label: "Design Gráfico", value: "DESIGN_GRAFICO", cursos: ["DESIGN"] },
  {
    label: "Design de Produto",
    value: "DESIGN_PRODUTO",
    cursos: ["DESIGN", "ENGENHARIA_MECANICA"],
  },
  { label: "Design de Moda", value: "DESIGN_MODA", cursos: ["DESIGN"] },
  {
    label: "Branding e Identidade Visual",
    value: "BRANDING",
    cursos: ["DESIGN", "ADMINISTRACAO"],
  },
  {
    label: "Motion Design e Animação",
    value: "MOTION_DESIGN",
    cursos: ["DESIGN"],
  },
  {
    label: "Fotografia e Direção de Arte",
    value: "FOTOGRAFIA",
    cursos: ["DESIGN"],
  },
  {
    label: "Design de Serviços",
    value: "DESIGN_SERVICOS",
    cursos: ["DESIGN", "ADMINISTRACAO"],
  },
  {
    label: "Tipografia e Diagramação",
    value: "TIPOGRAFIA",
    cursos: ["DESIGN"],
  },

  {
    label: "Física Computacional",
    value: "FISICA_COMPUTACIONAL",
    cursos: ["FISICA", "MATEMATICA"],
  },
  {
    label: "Física de Materiais e Nanociência",
    value: "FISICA_MATERIAIS",
    cursos: ["FISICA"],
  },
  {
    label: "Astrofísica e Cosmologia",
    value: "ASTROFISICA",
    cursos: ["FISICA"],
  },
  {
    label: "Física Médica",
    value: "FISICA_MEDICA",
    cursos: ["FISICA", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Óptica e Fotônica",
    value: "OPTICA_FOTONICA",
    cursos: ["FISICA", "ENGENHARIA_ELETRICA"],
  },
  {
    label: "Física Nuclear e de Partículas",
    value: "FISICA_NUCLEAR",
    cursos: ["FISICA"],
  },

  {
    label: "Álgebra e Teoria dos Números",
    value: "ALGEBRA",
    cursos: ["MATEMATICA"],
  },
  {
    label: "Topologia e Geometria",
    value: "TOPOLOGIA_GEOMETRIA",
    cursos: ["MATEMATICA"],
  },
  {
    label: "Equações Diferenciais e Análise",
    value: "EQUACOES_DIFERENCIAIS",
    cursos: ["MATEMATICA", "FISICA", "ENGENHARIA_ELETRICA"],
  },
  {
    label: "Matemática Aplicada e Modelagem",
    value: "MATEMATICA_APLICADA",
    cursos: ["MATEMATICA", "ESTATISTICA_CURSO", "FISICA"],
  },
  {
    label: "Criptografia e Teoria da Informação",
    value: "CRIPTOGRAFIA",
    cursos: ["MATEMATICA", "CIENCIA_DA_COMPUTACAO"],
  },
  {
    label: "Otimização e Programação Linear",
    value: "OTIMIZACAO",
    cursos: ["MATEMATICA", "ESTATISTICA_CURSO", "ENGENHARIA_DE_PRODUCAO"],
  },

  {
    label: "Inferência Estatística",
    value: "INFERENCIA_ESTATISTICA",
    cursos: ["ESTATISTICA_CURSO", "MATEMATICA"],
  },
  {
    label: "Bioestatística",
    value: "BIOESTATISTICA",
    cursos: ["ESTATISTICA_CURSO", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Estatística Espacial",
    value: "ESTATISTICA_ESPACIAL",
    cursos: ["ESTATISTICA_CURSO"],
  },
  {
    label: "Amostragem e Planejamento de Experimentos",
    value: "AMOSTRAGEM",
    cursos: ["ESTATISTICA_CURSO", "ENGENHARIA_DE_PRODUCAO"],
  },
  {
    label: "Séries Temporais",
    value: "SERIES_TEMPORAIS",
    cursos: ["ESTATISTICA_CURSO", "CIENCIAS_ECONOMICAS", "MATEMATICA"],
  },

  {
    label: "Bioinformática e Genômica",
    value: "BIOINFORMATICA_GENOMICA",
    cursos: ["BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Análise de Dados Biológicos",
    value: "ANALISE_DADOS_BIOLOGICOS",
    cursos: ["BIOMEDICINA_BIOINFORMATICA", "ESTATISTICA_CURSO"],
  },
  {
    label: "Medicina de Precisão",
    value: "MEDICINA_PRECISAO",
    cursos: ["BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Drug Discovery e Modelagem Molecular",
    value: "DRUG_DISCOVERY",
    cursos: ["BIOMEDICINA_BIOINFORMATICA", "ENGENHARIA_QUIMICA"],
  },
  {
    label: "Diagnóstico por Imagem e IA Médica",
    value: "IA_MEDICA",
    cursos: ["BIOMEDICINA_BIOINFORMATICA", "CIENCIA_DA_COMPUTACAO"],
  },
  {
    label: "Epidemiologia Computacional",
    value: "EPIDEMIOLOGIA",
    cursos: ["BIOMEDICINA_BIOINFORMATICA", "ESTATISTICA_CURSO"],
  },

  {
    label: "Pesquisa Científica (IC)",
    value: "PESQUISA_CIENTIFICA",
    cursos: TODOS,
  },
  {
    label: "Inovação e Empreendedorismo",
    value: "EMPREENDEDORISMO",
    cursos: TODOS,
  },
  { label: "Extensão Universitária", value: "EXTENSAO", cursos: TODOS },
  { label: "Monitoria", value: "MONITORIA", cursos: TODOS },
  { label: "Empresa Júnior", value: "EMPRESA_JUNIOR", cursos: TODOS },
  { label: "Hackathons e Competições", value: "HACKATHONS", cursos: TODOS },
  {
    label: "Sustentabilidade e Tech for Good",
    value: "SUSTENTABILIDADE",
    cursos: TODOS,
  },
  {
    label: "Estatística Aplicada",
    value: "ESTATISTICA_APLICADA",
    cursos: TODOS,
  },
];

export const habilidades: OpcaoComCursos[] = [
  {
    label: "Python",
    value: "PYTHON",
    cursos: [
      ...TI,
      "ESTATISTICA_CURSO",
      "MATEMATICA",
      "FISICA",
      "BIOMEDICINA_BIOINFORMATICA",
    ],
  },
  { label: "Java", value: "JAVA", cursos: TI },
  { label: "JavaScript", value: "JAVASCRIPT", cursos: TI },
  { label: "TypeScript", value: "TYPESCRIPT", cursos: TI },
  {
    label: "C",
    value: "C",
    cursos: [
      ...TI,
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_DA_COMPUTACAO",
      "FISICA",
    ],
  },
  {
    label: "C++",
    value: "CPP",
    cursos: [
      ...TI,
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_MECANICA",
      "FISICA",
      "MATEMATICA",
    ],
  },
  { label: "C#", value: "CSHARP", cursos: TI },
  { label: "Go", value: "GO", cursos: TI },
  {
    label: "Rust",
    value: "RUST",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ENGENHARIA_DE_SOFTWARE",
      "ENGENHARIA_DA_COMPUTACAO",
    ],
  },
  { label: "Kotlin", value: "KOTLIN", cursos: TI },
  { label: "Swift", value: "SWIFT", cursos: TI },
  { label: "PHP", value: "PHP", cursos: TI },
  {
    label: "R",
    value: "R",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ESTATISTICA_CURSO",
      "MATEMATICA",
      "BIOMEDICINA_BIOINFORMATICA",
      "CIENCIAS_ECONOMICAS",
    ],
  },
  {
    label: "MATLAB",
    value: "MATLAB",
    cursos: [
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_MECANICA",
      "FISICA",
      "MATEMATICA",
      "ESTATISTICA_CURSO",
      "ENGENHARIA_QUIMICA",
    ],
  },
  {
    label: "Julia",
    value: "JULIA",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "MATEMATICA",
      "FISICA",
      "ESTATISTICA_CURSO",
    ],
  },
  {
    label: "Scala",
    value: "SCALA",
    cursos: ["CIENCIA_DA_COMPUTACAO", "ENGENHARIA_DE_SOFTWARE"],
  },

  { label: "React", value: "REACT", cursos: TI },
  { label: "Next.js", value: "NEXTJS", cursos: TI },
  { label: "Node.js", value: "NODEJS", cursos: TI },
  { label: "Spring Boot", value: "SPRING_BOOT", cursos: TI },
  { label: "HTML", value: "HTML", cursos: TI },
  { label: "CSS", value: "CSS", cursos: TI },
  { label: "Tailwind CSS", value: "TAILWIND", cursos: TI },
  { label: "React Native", value: "REACT_NATIVE", cursos: TI },
  { label: "Flutter", value: "FLUTTER", cursos: TI },
  { label: "REST APIs", value: "REST", cursos: TI },
  { label: "GraphQL", value: "GRAPHQL", cursos: TI },

  {
    label: "SQL",
    value: "SQL",
    cursos: [
      ...TI,
      "ADMINISTRACAO",
      "CIENCIAS_ECONOMICAS",
      "ESTATISTICA_CURSO",
    ],
  },
  { label: "PostgreSQL", value: "POSTGRESQL", cursos: TI },
  { label: "MySQL", value: "MYSQL", cursos: TI },
  { label: "MongoDB", value: "MONGODB", cursos: TI },
  { label: "Redis", value: "REDIS", cursos: TI },
  { label: "SQLite", value: "SQLITE", cursos: TI },

  {
    label: "Machine Learning",
    value: "MACHINE_LEARNING",
    cursos: [
      ...TI,
      "ESTATISTICA_CURSO",
      "MATEMATICA",
      "BIOMEDICINA_BIOINFORMATICA",
    ],
  },
  {
    label: "Deep Learning",
    value: "DEEP_LEARNING",
    cursos: [...TI, "ESTATISTICA_CURSO", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Pandas",
    value: "PANDAS",
    cursos: [...TI, "ESTATISTICA_CURSO", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "NumPy",
    value: "NUMPY",
    cursos: [...TI, "FISICA", "MATEMATICA", "ESTATISTICA_CURSO"],
  },
  {
    label: "Scikit-learn",
    value: "SCIKIT_LEARN",
    cursos: [...TI, "ESTATISTICA_CURSO"],
  },
  { label: "TensorFlow", value: "TENSORFLOW", cursos: TI },
  { label: "PyTorch", value: "PYTORCH", cursos: TI },
  {
    label: "LLMs / Prompt Engineering",
    value: "LLMS_PROMPT_ENGINEERING",
    cursos: TI,
  },
  {
    label: "Avaliação de Modelos",
    value: "AVALIACAO_DE_MODELOS",
    cursos: [...TI, "ESTATISTICA_CURSO"],
  },
  {
    label: "Jupyter Notebook / Google Colab",
    value: "JUPYTER",
    cursos: [
      ...TI,
      "ESTATISTICA_CURSO",
      "MATEMATICA",
      "FISICA",
      "BIOMEDICINA_BIOINFORMATICA",
    ],
  },

  { label: "Docker", value: "DOCKER", cursos: TI },
  { label: "Docker Compose", value: "DOCKER_COMPOSE", cursos: TI },
  { label: "Kubernetes", value: "KUBERNETES", cursos: TI },
  { label: "CI/CD", value: "CI_CD", cursos: TI },
  { label: "GitHub Actions", value: "GITHUB_ACTIONS", cursos: TI },
  { label: "AWS", value: "AWS", cursos: TI },
  { label: "GCP", value: "GCP", cursos: TI },
  { label: "Azure", value: "AZURE", cursos: TI },
  { label: "Terraform", value: "TERRAFORM", cursos: TI },
  {
    label: "Linux",
    value: "LINUX",
    cursos: [...TI, "ENGENHARIA_ELETRICA", "FISICA"],
  },
  {
    label: "Redes",
    value: "REDES",
    cursos: [
      "CIENCIA_DA_COMPUTACAO",
      "ENGENHARIA_DA_COMPUTACAO",
      "REDES_DE_COMPUTADORES",
      "ENGENHARIA_ELETRICA",
    ],
  },

  { label: "Testes Unitários", value: "TESTES_UNITARIOS", cursos: TI },
  { label: "Testes de Integração", value: "TESTES_DE_INTEGRACAO", cursos: TI },
  { label: "TDD", value: "TDD", cursos: TI },
  { label: "Segurança (OWASP)", value: "SEGURANCA_OWASP", cursos: TI },

  {
    label: "AutoCAD",
    value: "AUTOCAD",
    cursos: [
      "ARQUITETURA_E_URBANISMO",
      "ENGENHARIA_CIVIL",
      "ENGENHARIA_MECANICA",
    ],
  },
  {
    label: "Revit (BIM)",
    value: "REVIT",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  { label: "ArchiCAD", value: "ARCHICAD", cursos: ["ARQUITETURA_E_URBANISMO"] },
  {
    label: "SketchUp",
    value: "SKETCHUP",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  {
    label: "Rhinoceros 3D",
    value: "RHINO",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN", "ENGENHARIA_MECANICA"],
  },
  {
    label: "Grasshopper",
    value: "GRASSHOPPER",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  {
    label: "Lumion (Renderização)",
    value: "LUMION",
    cursos: ["ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "V-Ray",
    value: "VRAY",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  { label: "Enscape", value: "ENSCAPE", cursos: ["ARQUITETURA_E_URBANISMO"] },
  {
    label: "QGIS / ArcGIS",
    value: "GIS",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Navisworks",
    value: "NAVISWORKS",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },
  {
    label: "Maquete Física",
    value: "MAQUETE_FISICA",
    cursos: ["ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  {
    label: "NBR / Normas Técnicas de Construção",
    value: "NBR_NORMAS",
    cursos: ["ARQUITETURA_E_URBANISMO", "ENGENHARIA_CIVIL"],
  },

  {
    label: "VHDL / Verilog",
    value: "VHDL_VERILOG",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO"],
  },
  {
    label: "FPGA",
    value: "FPGA",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO"],
  },
  {
    label: "Microcontroladores (Arduino/ESP32/STM32)",
    value: "MICROCONTROLADORES",
    cursos: [
      "ENGENHARIA_ELETRICA",
      "ENGENHARIA_DA_COMPUTACAO",
      "CIENCIA_DA_COMPUTACAO",
    ],
  },
  {
    label: "PLC e Automação (LADDER)",
    value: "PLC_AUTOMACAO",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DE_PRODUCAO"],
  },
  {
    label: "MATLAB / Simulink",
    value: "MATLAB_SIMULINK",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_MECANICA"],
  },
  {
    label: "PSIM / PSCAD (Simulação Elétrica)",
    value: "PSIM_PSCAD",
    cursos: ["ENGENHARIA_ELETRICA"],
  },
  {
    label: "Altium Designer / KiCad (PCB)",
    value: "PCB_DESIGN",
    cursos: ["ENGENHARIA_ELETRICA", "ENGENHARIA_DA_COMPUTACAO"],
  },

  {
    label: "SolidWorks",
    value: "SOLIDWORKS",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_DE_PRODUCAO"],
  },
  { label: "CATIA", value: "CATIA", cursos: ["ENGENHARIA_MECANICA"] },
  {
    label: "ANSYS (FEA/CFD)",
    value: "ANSYS",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_CIVIL", "ENGENHARIA_QUIMICA"],
  },
  {
    label: "Impressão 3D e Fabricação Aditiva",
    value: "IMPRESSAO_3D",
    cursos: ["ENGENHARIA_MECANICA", "ARQUITETURA_E_URBANISMO", "DESIGN"],
  },
  {
    label: "CNC e Usinagem",
    value: "CNC",
    cursos: ["ENGENHARIA_MECANICA", "ENGENHARIA_DE_PRODUCAO"],
  },

  {
    label: "SAP2000 / ETABS (Estruturas)",
    value: "SAP2000_ETABS",
    cursos: ["ENGENHARIA_CIVIL"],
  },
  {
    label: "TQS / Eberick (Projetos Estruturais)",
    value: "TQS_EBERICK",
    cursos: ["ENGENHARIA_CIVIL"],
  },
  {
    label: "MS Project / Primavera (Cronograma)",
    value: "MS_PROJECT",
    cursos: [
      "ENGENHARIA_CIVIL",
      "ARQUITETURA_E_URBANISMO",
      "ENGENHARIA_DE_PRODUCAO",
    ],
  },
  {
    label: "Topografia com Drone e GNSS",
    value: "TOPOGRAFIA_DRONE",
    cursos: ["ENGENHARIA_CIVIL"],
  },

  {
    label: "ERP (SAP / TOTVS)",
    value: "ERP_SAP_TOTVS",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "ADMINISTRACAO"],
  },
  {
    label: "Minitab / Statistica (Qualidade)",
    value: "MINITAB",
    cursos: ["ENGENHARIA_DE_PRODUCAO", "ESTATISTICA_CURSO"],
  },
  {
    label: "Arena / FlexSim (Simulação)",
    value: "ARENA_FLEXSIM",
    cursos: ["ENGENHARIA_DE_PRODUCAO"],
  },

  {
    label: "Aspen Plus / HYSYS",
    value: "ASPEN_HYSYS",
    cursos: ["ENGENHARIA_QUIMICA"],
  },
  {
    label: "AutoCAD P&ID",
    value: "AUTOCAD_PID",
    cursos: ["ENGENHARIA_QUIMICA", "ENGENHARIA_MECANICA"],
  },
  {
    label: "Controle de Qualidade Laboratorial",
    value: "CONTROLE_QUALIDADE_LAB",
    cursos: ["ENGENHARIA_QUIMICA", "BIOMEDICINA_BIOINFORMATICA"],
  },

  {
    label: "Excel Avançado / Power BI",
    value: "EXCEL_POWER_BI",
    cursos: [
      "ADMINISTRACAO",
      "CIENCIAS_ECONOMICAS",
      "ENGENHARIA_DE_PRODUCAO",
      "ESTATISTICA_CURSO",
    ],
  },
  {
    label: "CRM (Salesforce / HubSpot)",
    value: "CRM",
    cursos: ["ADMINISTRACAO"],
  },
  {
    label: "Google Analytics / SEO",
    value: "GOOGLE_ANALYTICS",
    cursos: ["ADMINISTRACAO"],
  },
  {
    label: "Planejamento Estratégico (BSC/OKR)",
    value: "PLANEJAMENTO_ESTRATEGICO",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },
  {
    label: "Valuation e Modelagem Financeira",
    value: "VALUATION",
    cursos: ["ADMINISTRACAO", "CIENCIAS_ECONOMICAS"],
  },

  {
    label: "Stata / EViews (Econometria)",
    value: "STATA_EVIEWS",
    cursos: ["CIENCIAS_ECONOMICAS", "ESTATISTICA_CURSO"],
  },
  {
    label: "Bloomberg Terminal",
    value: "BLOOMBERG",
    cursos: ["CIENCIAS_ECONOMICAS", "ADMINISTRACAO"],
  },
  {
    label: "Modelagem Macroeconômica (DSGE)",
    value: "DSGE",
    cursos: ["CIENCIAS_ECONOMICAS"],
  },

  {
    label: "Adobe Photoshop",
    value: "PHOTOSHOP",
    cursos: ["DESIGN", "ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Adobe Illustrator",
    value: "ILLUSTRATOR",
    cursos: ["DESIGN", "ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Adobe InDesign",
    value: "INDESIGN",
    cursos: ["DESIGN", "ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "After Effects / Premiere",
    value: "AFTER_EFFECTS",
    cursos: ["DESIGN"],
  },
  {
    label: "Blender (3D)",
    value: "BLENDER",
    cursos: ["DESIGN", "ARQUITETURA_E_URBANISMO"],
  },
  {
    label: "Procreate / Ilustração Digital",
    value: "PROCREATE",
    cursos: ["DESIGN"],
  },
  { label: "Cinema 4D", value: "CINEMA4D", cursos: ["DESIGN"] },
  {
    label: "Webflow / Framer (Design no-code)",
    value: "WEBFLOW",
    cursos: ["DESIGN", ...TI],
  },

  {
    label: "ROOT (CERN / Física de Partículas)",
    value: "ROOT_CERN",
    cursos: ["FISICA"],
  },
  {
    label: "Geant4 (Simulação Monte Carlo)",
    value: "GEANT4",
    cursos: ["FISICA"],
  },
  {
    label: "COMSOL (Simulação Multifísica)",
    value: "COMSOL",
    cursos: ["FISICA", "ENGENHARIA_ELETRICA", "ENGENHARIA_MECANICA"],
  },
  {
    label: "LabVIEW (Aquisição de Dados)",
    value: "LABVIEW",
    cursos: ["FISICA", "ENGENHARIA_ELETRICA"],
  },

  {
    label: "Mathematica / Maple (CAS)",
    value: "MATHEMATICA",
    cursos: ["MATEMATICA", "FISICA"],
  },
  { label: "SageMath", value: "SAGEMATH", cursos: ["MATEMATICA"] },
  {
    label: "LaTeX (Escrita Científica)",
    value: "LATEX",
    cursos: [
      "MATEMATICA",
      "FISICA",
      "ESTATISTICA_CURSO",
      "CIENCIAS_ECONOMICAS",
    ],
  },

  {
    label: "SPSS",
    value: "SPSS",
    cursos: [
      "ESTATISTICA_CURSO",
      "BIOMEDICINA_BIOINFORMATICA",
      "CIENCIAS_ECONOMICAS",
    ],
  },
  {
    label: "SAS",
    value: "SAS",
    cursos: ["ESTATISTICA_CURSO", "BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Stan / BUGS (Inferência Bayesiana)",
    value: "STAN_BUGS",
    cursos: ["ESTATISTICA_CURSO", "MATEMATICA"],
  },

  {
    label: "Bioconductor / Bioinformática em R",
    value: "BIOCONDUCTOR",
    cursos: ["BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "BLAST / Ferramentas de Alinhamento",
    value: "BLAST",
    cursos: ["BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Galaxy (Análise de Sequências NGS)",
    value: "GALAXY_NGS",
    cursos: ["BIOMEDICINA_BIOINFORMATICA"],
  },
  {
    label: "Modelagem Molecular (PyMOL/GROMACS)",
    value: "MODELAGEM_MOLECULAR",
    cursos: ["BIOMEDICINA_BIOINFORMATICA", "ENGENHARIA_QUIMICA"],
  },

  { label: "Git", value: "GIT", cursos: TODOS },
  { label: "Figma", value: "FIGMA", cursos: TODOS },
  { label: "Scrum", value: "SCRUM", cursos: TODOS },
  { label: "Kanban", value: "KANBAN", cursos: TODOS },
  { label: "Comunicação", value: "COMUNICACAO", cursos: TODOS },
  { label: "Trabalho em Equipe", value: "TRABALHO_EM_EQUIPE", cursos: TODOS },
  { label: "Inglês", value: "INGLES", cursos: TODOS },
  { label: "Escrita Científica", value: "ESCRITA_CIENTIFICA", cursos: TODOS },
  { label: "Apresentação", value: "APRESENTACAO", cursos: TODOS },
  { label: "Excel / Planilhas", value: "EXCEL", cursos: TODOS },
  { label: "Pacote Office", value: "OFFICE", cursos: TODOS },
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
  {
    label: "Projeto de Pesquisa e Desenvolvimento",
    value: "PROJETO_PESQUISA_DESENVOLVIMENTO",
  },
  {
    label: "Projeto de Pesquisa, Desenvolvimento e Inovação",
    value: "PROJETO_PESQUISA_DESENVOLVIMENTO_INOVACAO",
  },
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
