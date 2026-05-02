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
import type { Vaga } from "@domains/Vaga";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./style.css";
import { useAuth } from "@contexts/authContext";
import { useRecommendedVagas } from "@hooks/useRecommendedVaga";

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

  const { recommendedVagas, loading, error, refetch, fetchRecommendedVagas } =
    useRecommendedVagas();

  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<TabKey>("vagas");

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
      setState: React.Dispatch<React.SetStateAction<string[]>>,
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

  const vagasFilterLabel = useMemo(() => {
    if (activeVagaFiltersCount === 0) return "Nenhum";
    return `${activeVagaFiltersCount} selecionado(s)`;
  }, [activeVagaFiltersCount]);

  const perfisFilterLabel = useMemo(() => {
    if (activePerfilFiltersCount === 0) return "Nenhum";
    return `${activePerfilFiltersCount} selecionado(s)`;
  }, [activePerfilFiltersCount]);

  const filtersLoading = filterTab === "vagas" ? loadingVagas : loadingPerfis;

  const vagaSortLabel =
    vagaSort === "titulo_asc" ? "Título A-Z" : "Título Z-A";

  const perfilSortLabel =
    perfilSort === "nome_asc" ? "Nome A-Z" : "Nome Z-A";

  return !isAuthenticated ? (
    <></>
  ) : (
    <Layout showFooter headerType="full">
      <div className="main-context">
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="tab-menu-homepage"
        />

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
                  label={`Filtros (${vagasFilterLabel})`}
                  icon="pi pi-filter"
                  className="filter-button"
                  onClick={() => openFiltersDialog("vagas")}
                />

                <Button
                  label={vagaSortLabel}
                  icon={
                    vagaSort === "titulo_asc"
                      ? "pi pi-sort-alpha-down"
                      : "pi pi-sort-alpha-up"
                  }
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

            <Dialog
              className="vaga-dialog"
              visible={isDetailsOpen}
              onHide={closeDetails}
              header={selectedVaga?.titulo}
              style={{ width: "70vw" }}
            >
              {selectedVaga && <VagaDetails vaga={selectedVaga} />}
            </Dialog>
          </>
        )}

        {activeIndex === 1 && (
          <>
            <div className="position-header">
              <h1 className="page-title">Listagem de Perfis</h1>

              <div className="position-buttons">
                <Button
                  label={`Filtros (${perfisFilterLabel})`}
                  icon="pi pi-filter"
                  className="filter-button"
                  onClick={() => openFiltersDialog("perfis")}
                />

                <Button
                  label={perfilSortLabel}
                  icon={
                    perfilSort === "nome_asc"
                      ? "pi pi-sort-alpha-down"
                      : "pi pi-sort-alpha-up"
                  }
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
              {perfisPaginados.map((perfil) => (
                <PerfilCard key={`${perfil.id}`} perfil={perfil} />
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

        <Dialog
          className="recommended-vagas-modal"
          visible={isRecommendedOpen}
          onHide={closeRecommended}
          header="Vagas Recomendadas"
          style={{ width: "80vw" }}
        >
          {loading && (
            <p className="loading">Carregando vagas recomendadas...</p>
          )}

          {error && <p>{error}</p>}

          {recommendedVagas.length === 0 && !loading && !error && (
            <p>Não há vagas recomendadas no momento.</p>
          )}

          {!loading && !error && recommendedVagas.length > 0 && (
            <div className="position-list-cards">
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

          <div className="modal-footer">
            <Button
              label="Atualizar Recomendações"
              icon="pi pi-sparkles"
              className="recommended-update-button"
              onClick={refetch}
              loading={loading}
              disabled={loading}
            />
          </div>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ExplorePage;