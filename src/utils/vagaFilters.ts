import type { Vaga } from "@domains/Vaga";

export type RemuneracaoFilter = "todas" | "remunerada" | "voluntaria";

export type DuracaoFilter = "3_meses" | "6_meses" | "12_meses" | "outro";

export type PublicoAlvoFilter =
  | "graduando"
  | "graduado"
  | "pos_graduando"
  | "pos_graduado";

export interface VagaFilters {
  cursos: string[];
  instituicoes: string[];
  locais: string[];

  duracoes: DuracaoFilter[];
  publicoAlvo: PublicoAlvoFilter[];

  cargasHorarias: number[];

  remuneracao: RemuneracaoFilter;
}

export type VagaSortOption = "titulo_asc" | "titulo_desc";

export const cargaHorariaFilterOptions = [10, 20, 30, 40];

export const duracaoFilterOptions: {
  label: string;
  value: DuracaoFilter;
}[] = [
  { label: "3 meses", value: "3_meses" },
  { label: "6 meses", value: "6_meses" },
  { label: "12 meses", value: "12_meses" },
  { label: "Outro", value: "outro" },
];

export const publicoAlvoFilterOptions: {
  label: string;
  value: PublicoAlvoFilter;
}[] = [
  { label: "Graduando", value: "graduando" },
  { label: "Graduado", value: "graduado" },
  { label: "Pós-graduando", value: "pos_graduando" },
  { label: "Pós-graduado", value: "pos_graduado" },
];

export const defaultVagaFilters: VagaFilters = {
  cursos: [],
  instituicoes: [],
  locais: [],

  duracoes: [],
  publicoAlvo: [],

  cargasHorarias: [],

  remuneracao: "todas",
};

export function filterVagas(
  vagas: Vaga[],
  filters: VagaFilters,
  searchText = ""
): Vaga[] {
  return vagas.filter((vaga) => {
    const texto = normalize(searchText);

    const matchesTexto =
      !texto ||
      normalize(vaga.titulo).includes(texto) ||
      normalize(vaga.descricao).includes(texto) ||
      normalize(vaga.instituicao).includes(texto) ||
      normalize(vaga.curso).includes(texto) ||
      normalize(vaga.local).includes(texto) ||
      normalize(vaga.duracao).includes(texto) ||
      normalize(vaga.linkInscricao).includes(texto) ||
      normalize(vaga.recrutador?.perfil?.nome).includes(texto) ||
      arrayIncludesText(vaga.publicoAlvo, texto) ||
      arrayIncludesText(vaga.conhecimentosObrigatorios, texto) ||
      arrayIncludesText(vaga.conhecimentosOpcionais, texto);

    const matchesCurso =
      filters.cursos.length === 0 ||
      stringMatchesSelected(vaga.curso, filters.cursos);

    const matchesInstituicao =
      filters.instituicoes.length === 0 ||
      stringMatchesSelected(vaga.instituicao, filters.instituicoes);

    const matchesLocal =
      filters.locais.length === 0 ||
      stringMatchesSelected(vaga.local, filters.locais);

    const matchesDuracao =
      filters.duracoes.length === 0 ||
      filters.duracoes.some((duracao) =>
        matchesDuracaoOption(vaga.duracao, duracao)
      );

    const matchesPublicoAlvo =
      filters.publicoAlvo.length === 0 ||
      filters.publicoAlvo.some((publico) =>
        matchesPublicoAlvoOption(vaga.publicoAlvo, publico)
      );

    const matchesCargaHoraria =
      filters.cargasHorarias.length === 0 ||
      filters.cargasHorarias.includes(vaga.cargaHoraria);

    const matchesRemuneracao =
      filters.remuneracao === "todas" ||
      (filters.remuneracao === "remunerada" && vaga.ehRemunerada) ||
      (filters.remuneracao === "voluntaria" && !vaga.ehRemunerada);

    return (
      matchesTexto &&
      matchesCurso &&
      matchesInstituicao &&
      matchesLocal &&
      matchesDuracao &&
      matchesPublicoAlvo &&
      matchesCargaHoraria &&
      matchesRemuneracao
    );
  });
}

export function sortVagas(vagas: Vaga[], sort: VagaSortOption): Vaga[] {
  const sorted = [...vagas];

  switch (sort) {
    case "titulo_desc":
      return sorted.sort((a, b) => compareString(b.titulo, a.titulo));

    case "titulo_asc":
    default:
      return sorted.sort((a, b) => compareString(a.titulo, b.titulo));
  }
}

export function applyVagaFiltersAndSort(
  vagas: Vaga[],
  filters: VagaFilters,
  sort: VagaSortOption,
  searchText = ""
): Vaga[] {
  return sortVagas(filterVagas(vagas, filters, searchText), sort);
}

export function countActiveVagaFilters(filters: VagaFilters): number {
  let count = 0;

  count += filters.cursos.length;
  count += filters.instituicoes.length;
  count += filters.locais.length;
  count += filters.duracoes.length;
  count += filters.publicoAlvo.length;
  count += filters.cargasHorarias.length;

  if (filters.remuneracao !== "todas") count++;

  return count;
}

export function getVagaFilterOptions(vagas: Vaga[]) {
  return {
    cursos: unique(vagas.map((vaga) => vaga.curso)),
    instituicoes: unique(vagas.map((vaga) => vaga.instituicao)),
    locais: unique(vagas.map((vaga) => vaga.local)),
  };
}

function normalize(value?: string | null): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function arrayIncludesText(array: string[] = [], texto: string): boolean {
  return array.some((item) => normalize(item).includes(texto));
}

function compareString(a?: string | null, b?: string | null): number {
  return normalize(a).localeCompare(normalize(b));
}

function stringMatchesSelected(value: string, selectedValues: string[]) {
  const normalizedValue = normalize(value);

  return selectedValues.some(
    (selected) => normalize(selected) === normalizedValue
  );
}

function getDurationMonths(value?: string | null): number | null {
  const normalized = normalize(value);

  if (!normalized) return null;

  const match = normalized.match(/\d+/);

  if (!match) return null;

  return Number(match[0]);
}

function matchesDuracaoOption(
  vagaDuracao: string,
  selected: DuracaoFilter
): boolean {
  const months = getDurationMonths(vagaDuracao);
  const normalized = normalize(vagaDuracao);

  if (!normalized) return false;

  if (selected === "3_meses") return months === 3;
  if (selected === "6_meses") return months === 6;
  if (selected === "12_meses") return months === 12;

  return months !== 3 && months !== 6 && months !== 12;
}

function matchesPublicoAlvoOption(
  vagaPublicoAlvo: string[] = [],
  selected: PublicoAlvoFilter
): boolean {
  const text = normalize(vagaPublicoAlvo.join(" "));

  const termsByOption: Record<PublicoAlvoFilter, string[]> = {
    graduando: ["graduando", "graduacao", "graduação"],
    graduado: ["graduado", "formado", "egresso"],
    pos_graduando: [
      "pos graduando",
      "pós graduando",
      "pos-graduando",
      "pós-graduando",
      "mestrando",
      "doutorando",
      "especializacao",
      "especialização",
    ],
    pos_graduado: [
      "pos graduado",
      "pós graduado",
      "pos-graduado",
      "pós-graduado",
      "mestre",
      "doutor",
      "especialista",
    ],
  };

  return termsByOption[selected].some((term) =>
    text.includes(normalize(term))
  );
}

function unique(values: string[]): string[] {
  return Array.from(
    new Set(values.filter((value) => Boolean(value?.trim())))
  ).sort(compareString);
}