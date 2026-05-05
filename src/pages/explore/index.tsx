import { Dialog } from "primereact/dialog";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";

import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";

import VagaDetails from "@components/Vaga/indexDetail";
import { VagaCard } from "@components/Vaga";
import PerfilCard from "@components/Profile";
import { useExplore } from "@stores/explore/exploreStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Vaga } from "@domains/Vaga";
import type { Recrutador } from "@domains/Recrutador";
import { RegisterVagaProvider } from "@stores/register/vaga/formStore";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./style.css";
import { useAuth } from "@contexts/authContext";
import { useRecommendedVagas } from "@hooks/useRecommendedVaga";
import VagaFormPage from "@pages/register/vaga/form";

import {
  applyVagaFiltersAndSort,
  cargaHorariaFilterOptions,
  countActiveVagaFilters,
  defaultVagaFilters,
  duracaoFilterOptions,
  getVagaFilterOptions,
  publicoAlvoFilterOptions,
  type VagaFilters,
  type VagaSortOption,
} from "@utils/vagaFilters";

import {
  applyPerfilFiltersAndSort,
  countActivePerfilFilters,
  defaultPerfilFilters,
  disponibilidadePerfilFilterOptions,
  getPerfilFilterOptions,
  perfilTipoFilterOptions,
  type PerfilFilters,
  type PerfilSortOption,
} from "@utils/perfilFilters";

type TabKey = "vagas" | "perfis";

const VAGAS_PAGE_SIZE = 6;
const PERFIS_PAGE_SIZE = 10;

const STORAGE_KEYS = {
  vagaCursos: "linkedu:vaga-filters:cursos",
  vagaInstituicoes: "linkedu:vaga-filters:instituicoes",
  vagaLocais: "linkedu:vaga-filters:locais",

  perfilAreasInteresse: "linkedu:perfil-filters:areas-interesse",
  perfilPeriodosConclusao: "linkedu:perfil-filters:periodos-conclusao",
  perfilInstituicoes: "linkedu:perfil-filters:instituicoes",
  perfilLaboratorios: "linkedu:perfil-filters:laboratorios",
  perfilAreasAtuacao: "linkedu:perfil-filters:areas-atuacao",
};

const remuneracaoOptions = [
  { label: "Todas", value: "todas" },
  { label: "Remuneradas", value: "remunerada" },
  { label: "Voluntárias", value: "voluntaria" },
];

function normalizeText(value?: string | null): string {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function mergeUniqueStrings(...lists: string[][]): string[] {
  const map = new Map<string, string>();

  lists.flat().forEach((value) => {
    const trimmed = value.trim();
    const key = normalizeText(trimmed);

    if (key && !map.has(key)) {
      map.set(key, trimmed);
    }
  });

  return Array.from(map.values()).sort((a, b) =>
    normalizeText(a).localeCompare(normalizeText(b))
  );
}

function loadCachedOptions(key: string): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) => typeof item === "string");
  } catch {
    return [];
  }
}

function saveCachedOptions(key: string, values: string[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(key, JSON.stringify(values));
}

function toSelectOptions<T extends string | number>(values: T[]) {
  return values.map((value) => ({
    label: String(value),
    value,
  }));
}

function asText(value: any): string | null {
  if (!value) return null;

  if (Array.isArray(value)) {
    const text = value.map(asText).filter(Boolean).join(", ");
    return text || null;
  }

  if (typeof value === "object") {
    return (
      value.nome ??
      value.name ??
      value.titulo ??
      value.title ??
      value.descricao ??
      null
    );
  }

  return String(value);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatPerfilTipo(tipo?: string | null) {
  if (tipo === "CANDIDATO") return "Aluno";
  if (tipo === "RECRUTADOR") return "Recrutador";
  return "Perfil";
}

function ExploreProfileCard({ perfil }: { perfil: any }) {
  if (!perfil) return null;

  const nome =
    perfil.nome ??
    perfil.usuario?.nome ??
    perfil.user?.nome ??
    perfil.name ??
    "Seu perfil";

  const email =
    perfil.email ??
    perfil.usuario?.email ??
    perfil.user?.email ??
    "";

  const tipo = formatPerfilTipo(perfil.tipo);

  const curso = asText(
    perfil.curso ??
      perfil.aluno?.curso ??
      perfil.formacao?.curso ??
      perfil.areaFormacao ??
      perfil.area_formacao
  );

  const foto =
    perfil.fotoUrl ??
    perfil.foto_url ??
    perfil.foto ??
    perfil.avatarUrl ??
    perfil.avatar_url ??
    perfil.avatar ??
    perfil.imageUrl ??
    perfil.imagem ??
    perfil.usuario?.fotoUrl ??
    perfil.usuario?.avatarUrl ??
    perfil.user?.fotoUrl ??
    perfil.user?.avatarUrl;

  return (
    <div className="explore-profile-card">
      <div className="explore-profile-avatar">
        {foto ? <img src={foto} alt={nome} /> : <span>{getInitials(nome)}</span>}
      </div>

      <h2>{nome}</h2>

      {email && <p>{email}</p>}

      <div className="explore-profile-tags">
        <span>
          <i className="pi pi-user" />
          {tipo}
        </span>

        {curso && (
          <span>
            <i className="pi pi-briefcase" />
            {curso}
          </span>
        )}
      </div>
    </div>
  );
}

interface MultiSelectWithAddProps {
  label: string;
  value: string[];
  options: string[];
  placeholder: string;
  addPlaceholder: string;
  onChange: (value: string[]) => void;
  onAddOption: (value: string) => void;
}

function MultiSelectWithAdd({
  label,
  value,
  options,
  placeholder,
  addPlaceholder,
  onChange,
  onAddOption,
}: MultiSelectWithAddProps) {
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    const trimmed = newOption.trim();

    if (!trimmed) return;

    onAddOption(trimmed);
    onChange(mergeUniqueStrings(value, [trimmed]));
    setNewOption("");
  };

  return (
    <div className="filter-field">
      <label>{label}</label>

      <MultiSelect
        value={value}
        options={toSelectOptions(options)}
        onChange={(e) => onChange(e.value)}
        placeholder={placeholder}
        display="chip"
        filter
        className="w-full"
      />

      <div className="filter-add-row">
        <InputText
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder={addPlaceholder}
          className="filter-add-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddOption();
            }
          }}
        />

        <Button
          icon="pi pi-plus"
          label="Adicionar"
          className="filter-button add-filter-option-button"
          type="button"
          onClick={handleAddOption}
        />
      </div>
    </div>
  );
}

const ExplorePage = () => {
  const { vagas, perfis, loadingVagas, loadingPerfis } = useExplore();

  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { recommendedVagas, loading, error, refetch, fetchRecommendedVagas } = useRecommendedVagas();

  const outrasVagas = useMemo(() => {
    if (!vagas || vagas.length === 0) return [];
    const idsRecomendadas = recommendedVagas.map((vr) => vr.vagaId);
    return vagas.filter((vaga) => vaga.ehPublica === true && !idsRecomendadas.includes(vaga.id));
  }, [vagas, recommendedVagas]);

  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<TabKey>("vagas");

  const [isCreateVagaOpen, setIsCreateVagaOpen] = useState(false);

  const [vagaFilters, setVagaFilters] =
    useState<VagaFilters>(defaultVagaFilters);

  const [vagaSort, setVagaSort] = useState<VagaSortOption>("titulo_asc");

  const [perfilFilters, setPerfilFilters] =
    useState<PerfilFilters>(defaultPerfilFilters);

  const [perfilSort, setPerfilSort] = useState<PerfilSortOption>("nome_asc");

  const [vagaFirst, setVagaFirst] = useState(0);
  const [perfilFirst, setPerfilFirst] = useState(0);

  const [cachedVagaCursos, setCachedVagaCursos] = useState<string[]>(() =>
    loadCachedOptions(STORAGE_KEYS.vagaCursos)
  );

  const [cachedVagaInstituicoes, setCachedVagaInstituicoes] = useState<
    string[]
  >(() => loadCachedOptions(STORAGE_KEYS.vagaInstituicoes));

  const [cachedVagaLocais, setCachedVagaLocais] = useState<string[]>(() =>
    loadCachedOptions(STORAGE_KEYS.vagaLocais)
  );

  const [cachedPerfilAreasInteresse, setCachedPerfilAreasInteresse] = useState<
    string[]
  >(() => loadCachedOptions(STORAGE_KEYS.perfilAreasInteresse));

  const [cachedPerfilPeriodosConclusao, setCachedPerfilPeriodosConclusao] =
    useState<string[]>(() =>
      loadCachedOptions(STORAGE_KEYS.perfilPeriodosConclusao)
    );

  const [cachedPerfilInstituicoes, setCachedPerfilInstituicoes] = useState<
    string[]
  >(() => loadCachedOptions(STORAGE_KEYS.perfilInstituicoes));

  const [cachedPerfilLaboratorios, setCachedPerfilLaboratorios] = useState<
    string[]
  >(() => loadCachedOptions(STORAGE_KEYS.perfilLaboratorios));

  const [cachedPerfilAreasAtuacao, setCachedPerfilAreasAtuacao] = useState<
    string[]
  >(() => loadCachedOptions(STORAGE_KEYS.perfilAreasAtuacao));

  const navigate = useNavigate();
  const { isAuthenticated, authChecked, perfil } = useAuth();

  const recrutadorAtual = useMemo(() => {
    if (!perfil || perfil.tipo !== "RECRUTADOR") return null;

    return ((perfil as any).recrutador ?? perfil) as Recrutador;
  }, [perfil]);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, navigate]);

  const openRecommended = useCallback(() => {
    setIsRecommendedOpen(true);
    fetchRecommendedVagas();
  }, [fetchRecommendedVagas]);

  const closeRecommended = useCallback(() => {
    setIsRecommendedOpen(false);
  }, []);

  const openCreateVaga = useCallback(() => {
    setIsCreateVagaOpen(true);
  }, []);

  const closeCreateVaga = useCallback(() => {
    setIsCreateVagaOpen(false);
  }, []);

  const updateVagaFilter = useCallback(
    <K extends keyof VagaFilters>(key: K, value: VagaFilters[K]) => {
      setVagaFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const updatePerfilFilter = useCallback(
    <K extends keyof PerfilFilters>(key: K, value: PerfilFilters[K]) => {
      setPerfilFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const addCachedOption = useCallback(
    (
      value: string,
      setState: Dispatch<SetStateAction<string[]>>,
      storageKey: string
    ) => {
      setState((prev) => {
        const next = mergeUniqueStrings(prev, [value]);
        saveCachedOptions(storageKey, next);
        return next;
      });
    },
    []
  );

  const vagaFilterOptions = useMemo(
    () => getVagaFilterOptions(vagas),
    [vagas]
  );

  const perfilFilterOptions = useMemo(
    () => getPerfilFilterOptions(perfis),
    [perfis]
  );

  const vagaCursoOptions = useMemo(
    () => mergeUniqueStrings(vagaFilterOptions.cursos, cachedVagaCursos),
    [vagaFilterOptions.cursos, cachedVagaCursos]
  );

  const vagaInstituicaoOptions = useMemo(
    () =>
      mergeUniqueStrings(
        vagaFilterOptions.instituicoes,
        cachedVagaInstituicoes
      ),
    [vagaFilterOptions.instituicoes, cachedVagaInstituicoes]
  );

  const vagaLocalOptions = useMemo(
    () => mergeUniqueStrings(vagaFilterOptions.locais, cachedVagaLocais),
    [vagaFilterOptions.locais, cachedVagaLocais]
  );

  const perfilAreasInteresseOptions = useMemo(
    () =>
      mergeUniqueStrings(
        perfilFilterOptions.areasInteresse,
        cachedPerfilAreasInteresse
      ),
    [perfilFilterOptions.areasInteresse, cachedPerfilAreasInteresse]
  );

  const perfilPeriodosConclusaoOptions = useMemo(
    () =>
      mergeUniqueStrings(
        perfilFilterOptions.periodosConclusao,
        cachedPerfilPeriodosConclusao
      ),
    [perfilFilterOptions.periodosConclusao, cachedPerfilPeriodosConclusao]
  );

  const perfilInstituicoesOptions = useMemo(
    () =>
      mergeUniqueStrings(
        perfilFilterOptions.instituicoes,
        cachedPerfilInstituicoes
      ),
    [perfilFilterOptions.instituicoes, cachedPerfilInstituicoes]
  );

  const perfilLaboratoriosOptions = useMemo(
    () =>
      mergeUniqueStrings(
        perfilFilterOptions.laboratorios,
        cachedPerfilLaboratorios
      ),
    [perfilFilterOptions.laboratorios, cachedPerfilLaboratorios]
  );

  const perfilAreasAtuacaoOptions = useMemo(
    () =>
      mergeUniqueStrings(
        perfilFilterOptions.areasAtuacao,
        cachedPerfilAreasAtuacao
      ),
    [perfilFilterOptions.areasAtuacao, cachedPerfilAreasAtuacao]
  );

  const activeVagaFiltersCount = useMemo(
    () => countActiveVagaFilters(vagaFilters),
    [vagaFilters]
  );

  const activePerfilFiltersCount = useMemo(
    () => countActivePerfilFilters(perfilFilters),
    [perfilFilters]
  );

  const vagasFiltradas = useMemo(() => {
    return applyVagaFiltersAndSort(vagas, vagaFilters, vagaSort, q);
  }, [vagas, vagaFilters, vagaSort, q]);

  const perfisFiltrados = useMemo(() => {
    return applyPerfilFiltersAndSort(perfis, perfilFilters, perfilSort, q);
  }, [perfis, perfilFilters, perfilSort, q]);

  const vagasPaginadas = useMemo(() => {
    return vagasFiltradas.slice(vagaFirst, vagaFirst + VAGAS_PAGE_SIZE);
  }, [vagasFiltradas, vagaFirst]);

  const perfisPaginados = useMemo(() => {
    return perfisFiltrados.slice(perfilFirst, perfilFirst + PERFIS_PAGE_SIZE);
  }, [perfisFiltrados, perfilFirst]);

  useEffect(() => {
    setVagaFirst(0);
  }, [q, vagaFilters, vagaSort]);

  useEffect(() => {
    setPerfilFirst(0);
  }, [q, perfilFilters, perfilSort]);

  useEffect(() => {
    if (vagaFirst >= vagasFiltradas.length && vagaFirst !== 0) {
      setVagaFirst(0);
    }
  }, [vagaFirst, vagasFiltradas.length]);

  useEffect(() => {
    if (perfilFirst >= perfisFiltrados.length && perfilFirst !== 0) {
      setPerfilFirst(0);
    }
  }, [perfilFirst, perfisFiltrados.length]);

  const items = useMemo(
    () => [
      { label: `Vagas (${vagasFiltradas.length})` },
      { label: `Perfis (${perfisFiltrados.length})` },
    ],
    [vagasFiltradas.length, perfisFiltrados.length]
  );

  const isDetailsOpen = selectedVaga !== null;

  const openDetails = useCallback((vaga: Vaga) => {
    setSelectedVaga(vaga);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedVaga(null);
  }, []);

  const openFiltersDialog = useCallback((tab: TabKey) => {
    setFilterTab(tab);
    setFiltersOpen(true);
  }, []);

  const toggleVagaSort = useCallback(() => {
    setVagaSort((prev) =>
      prev === "titulo_asc" ? "titulo_desc" : "titulo_asc"
    );
  }, []);

  const togglePerfilSort = useCallback(() => {
    setPerfilSort((prev) => (prev === "nome_asc" ? "nome_desc" : "nome_asc"));
  }, []);

  const applySelectedFilters = useCallback(() => {
    setFiltersOpen(false);
  }, []);

  const clearFilters = useCallback(() => {
    if (filterTab === "vagas") {
      setVagaFilters(defaultVagaFilters);
      setVagaFirst(0);
      setFiltersOpen(false);
      return;
    }

    setPerfilFilters(defaultPerfilFilters);
    setPerfilFirst(0);
    setFiltersOpen(false);
  }, [filterTab]);

  const filtersLoading = filterTab === "vagas" ? loadingVagas : loadingPerfis;

  const vagaFilterButtonLabel =
    activeVagaFiltersCount > 0
      ? `Filtros (${activeVagaFiltersCount})`
      : "Filtros";

  const perfilFilterButtonLabel =
    activePerfilFiltersCount > 0
      ? `Filtros (${activePerfilFiltersCount})`
      : "Filtros";

  return !isAuthenticated ? (
    <></>
  ) : (
    <Layout showFooter headerType="full">
      <div className="main-context">
        <div className="explore-page-grid">
          <aside className="explore-profile-sidebar">
            <ExploreProfileCard perfil={perfil} />

            {recrutadorAtual && (
              <Button
                label="Adicionar Vaga"
                icon="pi pi-plus"
                className="add-vaga-profile-button"
                onClick={openCreateVaga}
                aria-label="Adicionar vaga"
              />
            )}
          </aside>

          <section className="explore-content">
            <TabMenu
              model={items}
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="tab-menu-homepage"
            />

            {activeIndex === 0 && (
              <>
                <div className="position-header">
                  <h1 className="page-title">Painel de Vagas</h1>

                  <div className="position-buttons">
                    {perfil?.tipo === "CANDIDATO" && (
                      <Button
                        label="Vagas Recomendadas"
                        icon="pi pi-sparkles"
                        className="recomendation-button"
                        onClick={openRecommended}
                        loading={loading}
                        disabled={loading}
                      />
                    )}

                    <Button
                      label={vagaFilterButtonLabel}
                      icon="pi pi-filter"
                      className="filter-button"
                      onClick={() => openFiltersDialog("vagas")}
                    />

                    <Button
                      label="Ordenação"
                      icon="pi pi-sort-alt"
                      className="sort-button"
                      onClick={toggleVagaSort}
                      loading={loadingVagas}
                      disabled={loadingVagas}
                    />
                  </div>
                </div>

                {vagasFiltradas.length === 0 && (
                  <div className="message">
                    {q
                      ? "Nenhuma vaga encontrada para a busca."
                      : "Nenhuma vaga pública disponível."}
                  </div>
                )}

                <div className="position-list-cards">
                  {vagasPaginadas.map((vaga) => (
                    <VagaCard
                      key={vaga.id}
                      vaga={vaga}
                      openDetails={openDetails}
                      showActions={false}
                    />
                  ))}
                </div>

                {vagasFiltradas.length > VAGAS_PAGE_SIZE && (
                  <div className="pagination-wrapper">
                    <Paginator
                      first={vagaFirst}
                      rows={VAGAS_PAGE_SIZE}
                      totalRecords={vagasFiltradas.length}
                      onPageChange={(e) => {
                        setVagaFirst(e.first);
                      }}
                      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                      currentPageReportTemplate="{first} - {last} de {totalRecords}"
                    />
                  </div>
                )}
              </>
            )}

            {activeIndex === 1 && (
              <>
                <div className="position-header">
                  <h1 className="page-title">Listagem de Perfis</h1>

                  <div className="position-buttons">
                    <Button
                      label={perfilFilterButtonLabel}
                      icon="pi pi-filter"
                      className="filter-button"
                      onClick={() => openFiltersDialog("perfis")}
                    />

                    <Button
                      label="Ordenação"
                      icon="pi pi-sort-alt"
                      className="sort-button"
                      onClick={togglePerfilSort}
                      loading={loadingPerfis}
                      disabled={loadingPerfis}
                    />
                  </div>
                </div>

                {perfisFiltrados.length === 0 && (
                  <div className="message">
                    {q
                      ? "Nenhum perfil encontrado para a busca."
                      : "Nenhum perfil disponível."}
                  </div>
                )}

                <div className="perfis-list-card">
                  {perfisPaginados.map((item) => (
                    <PerfilCard key={`${item.id}`} perfil={item} />
                  ))}
                </div>

                {perfisFiltrados.length > PERFIS_PAGE_SIZE && (
                  <div className="pagination-wrapper">
                    <Paginator
                      first={perfilFirst}
                      rows={PERFIS_PAGE_SIZE}
                      totalRecords={perfisFiltrados.length}
                      onPageChange={(e) => {
                        setPerfilFirst(e.first);
                      }}
                      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                      currentPageReportTemplate="{first} - {last} de {totalRecords}"
                    />
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <Dialog
          header={`Filtros - ${filterTab === "vagas" ? "Vagas" : "Perfis"}`}
          visible={filtersOpen}
          onHide={() => setFiltersOpen(false)}
          style={{ width: "620px", maxWidth: "92vw" }}
        >
          <div className="filters-content">
            <div className="filters-list">
              {filterTab === "vagas" ? (
                <>
                  <MultiSelectWithAdd
                    label="Curso"
                    value={vagaFilters.cursos}
                    options={vagaCursoOptions}
                    placeholder="Selecione cursos"
                    addPlaceholder="Adicionar curso"
                    onChange={(value) => updateVagaFilter("cursos", value)}
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedVagaCursos,
                        STORAGE_KEYS.vagaCursos
                      )
                    }
                  />

                  <MultiSelectWithAdd
                    label="Instituição"
                    value={vagaFilters.instituicoes}
                    options={vagaInstituicaoOptions}
                    placeholder="Selecione instituições"
                    addPlaceholder="Adicionar instituição"
                    onChange={(value) =>
                      updateVagaFilter("instituicoes", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedVagaInstituicoes,
                        STORAGE_KEYS.vagaInstituicoes
                      )
                    }
                  />

                  <MultiSelectWithAdd
                    label="Local"
                    value={vagaFilters.locais}
                    options={vagaLocalOptions}
                    placeholder="Selecione locais"
                    addPlaceholder="Adicionar local"
                    onChange={(value) => updateVagaFilter("locais", value)}
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedVagaLocais,
                        STORAGE_KEYS.vagaLocais
                      )
                    }
                  />

                  <div className="filter-field">
                    <label>Duração</label>
                    <MultiSelect
                      value={vagaFilters.duracoes}
                      options={duracaoFilterOptions}
                      onChange={(e) => updateVagaFilter("duracoes", e.value)}
                      placeholder="Selecione durações"
                      display="chip"
                      className="w-full"
                    />
                  </div>

                  <div className="filter-field">
                    <label>Público-alvo</label>
                    <MultiSelect
                      value={vagaFilters.publicoAlvo}
                      options={publicoAlvoFilterOptions}
                      onChange={(e) =>
                        updateVagaFilter("publicoAlvo", e.value)
                      }
                      placeholder="Selecione públicos"
                      display="chip"
                      className="w-full"
                    />
                  </div>

                  <div className="filter-field">
                    <label>Carga horária</label>
                    <MultiSelect
                      value={vagaFilters.cargasHorarias}
                      options={cargaHorariaFilterOptions.map((hora) => ({
                        label: `${hora}h semanais`,
                        value: hora,
                      }))}
                      onChange={(e) =>
                        updateVagaFilter("cargasHorarias", e.value)
                      }
                      placeholder="Selecione cargas horárias"
                      display="chip"
                      className="w-full"
                    />
                  </div>

                  <div className="filter-field">
                    <label>Remuneração</label>
                    <Dropdown
                      value={vagaFilters.remuneracao}
                      options={remuneracaoOptions}
                      onChange={(e) =>
                        updateVagaFilter("remuneracao", e.value)
                      }
                      className="w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="filter-field">
                    <label>Tipo de perfil</label>
                    <MultiSelect
                      value={perfilFilters.tipos}
                      options={perfilTipoFilterOptions}
                      onChange={(e) => updatePerfilFilter("tipos", e.value)}
                      placeholder="Selecione tipos"
                      display="chip"
                      className="w-full"
                    />
                  </div>

                  <MultiSelectWithAdd
                    label="Áreas de interesse"
                    value={perfilFilters.areasInteresse}
                    options={perfilAreasInteresseOptions}
                    placeholder="Selecione áreas"
                    addPlaceholder="Adicionar área"
                    onChange={(value) =>
                      updatePerfilFilter("areasInteresse", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedPerfilAreasInteresse,
                        STORAGE_KEYS.perfilAreasInteresse
                      )
                    }
                  />

                  <div className="filter-field">
                    <label>Disponibilidade</label>
                    <MultiSelect
                      value={perfilFilters.disponibilidades}
                      options={disponibilidadePerfilFilterOptions.map(
                        (hora) => ({
                          label: `${hora}h semanais`,
                          value: hora,
                        })
                      )}
                      onChange={(e) =>
                        updatePerfilFilter("disponibilidades", e.value)
                      }
                      placeholder="Selecione disponibilidades"
                      display="chip"
                      className="w-full"
                    />
                  </div>

                  <MultiSelectWithAdd
                    label="Período de conclusão"
                    value={perfilFilters.periodosConclusao}
                    options={perfilPeriodosConclusaoOptions}
                    placeholder="Selecione períodos"
                    addPlaceholder="Adicionar período"
                    onChange={(value) =>
                      updatePerfilFilter("periodosConclusao", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedPerfilPeriodosConclusao,
                        STORAGE_KEYS.perfilPeriodosConclusao
                      )
                    }
                  />

                  <MultiSelectWithAdd
                    label="Instituição"
                    value={perfilFilters.instituicoes}
                    options={perfilInstituicoesOptions}
                    placeholder="Selecione instituições"
                    addPlaceholder="Adicionar instituição"
                    onChange={(value) =>
                      updatePerfilFilter("instituicoes", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedPerfilInstituicoes,
                        STORAGE_KEYS.perfilInstituicoes
                      )
                    }
                  />

                  <MultiSelectWithAdd
                    label="Laboratórios"
                    value={perfilFilters.laboratorios}
                    options={perfilLaboratoriosOptions}
                    placeholder="Selecione laboratórios"
                    addPlaceholder="Adicionar laboratório"
                    onChange={(value) =>
                      updatePerfilFilter("laboratorios", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedPerfilLaboratorios,
                        STORAGE_KEYS.perfilLaboratorios
                      )
                    }
                  />

                  <MultiSelectWithAdd
                    label="Área de atuação"
                    value={perfilFilters.areasAtuacao}
                    options={perfilAreasAtuacaoOptions}
                    placeholder="Selecione áreas"
                    addPlaceholder="Adicionar área"
                    onChange={(value) =>
                      updatePerfilFilter("areasAtuacao", value)
                    }
                    onAddOption={(value) =>
                      addCachedOption(
                        value,
                        setCachedPerfilAreasAtuacao,
                        STORAGE_KEYS.perfilAreasAtuacao
                      )
                    }
                  />
                </>
              )}
            </div>

            <div className="filters-actions">
              <Button
                className="limpar-button"
                label="Limpar"
                icon="pi pi-times"
                severity="secondary"
                outlined
                onClick={clearFilters}
                loading={filtersLoading}
                disabled={filtersLoading}
              />

              <Button
                className="aplicar-button"
                label="Aplicar"
                icon="pi pi-check"
                onClick={applySelectedFilters}
                loading={filtersLoading}
                disabled={filtersLoading}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          className="vaga-dialog"
          visible={isDetailsOpen}
          onHide={closeDetails}
          header={selectedVaga?.titulo}
          style={{ width: "70vw", maxWidth: "92vw" }}
        >
          {selectedVaga && <VagaDetails vaga={selectedVaga} />}
        </Dialog>

        <Dialog
          className="recommended-vagas-modal"
          visible={isRecommendedOpen}
          onHide={closeRecommended}
          header="Vagas Recomendadas"
          style={{ width: "80vw", maxWidth: "94vw" }}
        >
          <div className="modal-header-actions" style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "left" }}>
            <Button
              label="Atualizar Recomendações"
              icon="pi pi-sparkles"
              className="recommended-update-button"
              onClick={refetch}
              loading={loading}
              disabled={loading}
            />
          </div>

          {loading && (
            <p className="loading">Carregando vagas recomendadas...</p>
          )}

          {error && <p>{error}</p>}

          {recommendedVagas.length === 0 && !loading && !error && (
            <p>Não encontramos vagas compatíveis com seu perfil no momento.</p>
          )}

          {!loading && !error && recommendedVagas.length > 0 && (
            <div className="position-list-cards recommended-list-cards">
              {recommendedVagas.map((recomendacao) => (
                <VagaCard
                  key={recomendacao.vaga.id}
                  vaga={recomendacao.vaga}
                  openDetails={openDetails}
                  showActions={false}
                />
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="outras-vagas-section" style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #e2e8f0" }}>
              <h3 style={{ marginBottom: "1rem" }}>Outras vagas que você pode se interessar</h3>
              
              {outrasVagas.length > 0 ? (
                <div className="position-list-cards">
                  {outrasVagas.map((vaga) => (
                    <VagaCard
                      key={vaga.id}
                      vaga={vaga}
                      openDetails={openDetails}
                      showActions={false}
                    />
                  ))}
                </div>
              ) : (
                <p>Não encontramos outras vagas no momento.</p>
              )}
            </div>
          )}
        </Dialog>

        {isCreateVagaOpen && recrutadorAtual && (
          <RegisterVagaProvider>
            <Dialog
              className="create-vaga-dialog"
              visible={isCreateVagaOpen}
              onHide={closeCreateVaga}
              header="Vaga"
              modal
              blockScroll
              draggable={false}
              style={{ width: "1200px", maxWidth: "95vw" }}
              contentStyle={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <VagaFormPage
                recrutador={recrutadorAtual}
                switchVisibility={closeCreateVaga}
                callback={closeCreateVaga}
              />
            </Dialog>
          </RegisterVagaProvider>
        )}
      </div>
    </Layout>
  );
};

export default ExplorePage;