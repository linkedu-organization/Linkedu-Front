import type { Perfil } from "@domains/Perfil";

export type PerfilTipoFilter = "CANDIDATO" | "RECRUTADOR";

export interface PerfilFilters {
  tipos: PerfilTipoFilter[];

  areasInteresse: string[];
  disponibilidades: number[];
  periodosConclusao: string[];

  instituicoes: string[];
  laboratorios: string[];
  areasAtuacao: string[];
}

export type PerfilSortOption = "nome_asc" | "nome_desc";

export const perfilTipoFilterOptions: {
  label: string;
  value: PerfilTipoFilter;
}[] = [
  { label: "Candidatos", value: "CANDIDATO" },
  { label: "Recrutadores", value: "RECRUTADOR" },
];

export const disponibilidadePerfilFilterOptions = [10, 20, 30, 40];

export const defaultPerfilFilters: PerfilFilters = {
  tipos: [],

  areasInteresse: [],
  disponibilidades: [],
  periodosConclusao: [],

  instituicoes: [],
  laboratorios: [],
  areasAtuacao: [],
};

export function filterPerfis(
  perfis: Perfil[],
  filters: PerfilFilters,
  searchText = ""
): Perfil[] {
  return perfis.filter((perfil) => {
    const texto = normalize(searchText);

    const candidato = perfil.candidato;
    const recrutador = perfil.recrutador;

    const areasInteresse = toStringArray(candidato?.areasInteresse);
    const tempoDisponivel = getNumberValue(candidato?.tempoDisponivel);
    const periodoConclusao = String(candidato?.periodoConclusao ?? "");

    const instituicao = String(recrutador?.instituicao ?? "");
    const laboratorios = toStringArray(recrutador?.laboratorios);
    const areaAtuacao = String(recrutador?.areaAtuacao ?? "");

    const matchesTexto =
      !texto ||
      normalize(perfil.nome).includes(texto) ||
      normalize(perfil.email).includes(texto) ||
      normalize(perfil.tipo).includes(texto) ||
      arrayIncludesText(areasInteresse, texto) ||
      normalize(periodoConclusao).includes(texto) ||
      normalize(instituicao).includes(texto) ||
      arrayIncludesText(laboratorios, texto) ||
      normalize(areaAtuacao).includes(texto);

    const matchesTipo =
      filters.tipos.length === 0 || filters.tipos.includes(perfil.tipo as any);

    const matchesAreasInteresse =
      filters.areasInteresse.length === 0 ||
      arrayMatchesSelected(areasInteresse, filters.areasInteresse);

    const matchesDisponibilidade =
      filters.disponibilidades.length === 0 ||
      (tempoDisponivel !== null &&
        filters.disponibilidades.includes(tempoDisponivel));

    const matchesPeriodoConclusao =
      filters.periodosConclusao.length === 0 ||
      stringMatchesSelected(periodoConclusao, filters.periodosConclusao);

    const matchesInstituicao =
      filters.instituicoes.length === 0 ||
      stringMatchesSelected(instituicao, filters.instituicoes);

    const matchesLaboratorios =
      filters.laboratorios.length === 0 ||
      arrayMatchesSelected(laboratorios, filters.laboratorios);

    const matchesAreaAtuacao =
      filters.areasAtuacao.length === 0 ||
      stringMatchesSelected(areaAtuacao, filters.areasAtuacao);

    return (
      matchesTexto &&
      matchesTipo &&
      matchesAreasInteresse &&
      matchesDisponibilidade &&
      matchesPeriodoConclusao &&
      matchesInstituicao &&
      matchesLaboratorios &&
      matchesAreaAtuacao
    );
  });
}

export function sortPerfis(perfis: Perfil[], sort: PerfilSortOption): Perfil[] {
  const sorted = [...perfis];

  switch (sort) {
    case "nome_desc":
      return sorted.sort((a, b) => compareString(b.nome, a.nome));

    case "nome_asc":
    default:
      return sorted.sort((a, b) => compareString(a.nome, b.nome));
  }
}

export function applyPerfilFiltersAndSort(
  perfis: Perfil[],
  filters: PerfilFilters,
  sort: PerfilSortOption,
  searchText = ""
): Perfil[] {
  return sortPerfis(filterPerfis(perfis, filters, searchText), sort);
}

export function countActivePerfilFilters(filters: PerfilFilters): number {
  let count = 0;

  count += filters.tipos.length;
  count += filters.areasInteresse.length;
  count += filters.disponibilidades.length;
  count += filters.periodosConclusao.length;
  count += filters.instituicoes.length;
  count += filters.laboratorios.length;
  count += filters.areasAtuacao.length;

  return count;
}

export function getPerfilFilterOptions(perfis: Perfil[]) {
  return {
    areasInteresse: unique(
      perfis.flatMap((perfil) =>
        toStringArray(perfil.candidato?.areasInteresse)
      )
    ),

    periodosConclusao: unique(
      perfis.map((perfil) => String(perfil.candidato?.periodoConclusao ?? ""))
    ),

    instituicoes: unique(
      perfis.map((perfil) => String(perfil.recrutador?.instituicao ?? ""))
    ),

    laboratorios: unique(
      perfis.flatMap((perfil) =>
        toStringArray(perfil.recrutador?.laboratorios)
      )
    ),

    areasAtuacao: unique(
      perfis.map((perfil) => String(perfil.recrutador?.areaAtuacao ?? ""))
    ),
  };
}

function normalize(value?: string | null): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function compareString(a?: string | null, b?: string | null): number {
  return normalize(a).localeCompare(normalize(b));
}

function arrayIncludesText(array: string[] = [], texto: string): boolean {
  return array.some((item) => normalize(item).includes(texto));
}

function stringMatchesSelected(value: string, selectedValues: string[]) {
  const normalizedValue = normalize(value);

  return selectedValues.some((selected) => {
    const normalizedSelected = normalize(selected);

    return (
      normalizedValue === normalizedSelected ||
      normalizedValue.includes(normalizedSelected) ||
      normalizedSelected.includes(normalizedValue)
    );
  });
}

function arrayMatchesSelected(values: string[], selectedValues: string[]) {
  return selectedValues.some((selected) =>
    values.some((value) => stringMatchesSelected(value, [selected]))
  );
}

function getNumberValue(value: unknown): number | null {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const match = value.match(/\d+/);
    if (!match) return null;

    return Number(match[0]);
  }

  return null;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[|,;]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function unique(values: string[]): string[] {
  return Array.from(
    new Set(values.filter((value) => Boolean(value?.trim())))
  ).sort(compareString);
}