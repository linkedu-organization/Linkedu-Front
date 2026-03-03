import { Dialog } from "primereact/dialog";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import VagaDetails from "@components/Vaga/indexDetail";
import { VagaCard } from "@components/Vaga";
import PerfilCard from "@components/Profile";
import { useHomePage } from "@stores/homePage/indexStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Vaga } from "@domains/Vaga";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import { useAuth } from "@contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useRecommendedVagas } from "@hooks/useRecommendedVaga";

type FilterField = { campo: string; operador: "eq" | "in"; valor: any };
type Sorter = { campo: string; ordem: "ASC" | "DESC" };

type TabKey = "vagas" | "perfis";

type VagasFilterKey = "remunerada" | "20h" | "30h" | "40h";
type PerfisFilterKey = "candidato" | "recrutador";

const VAGAS_DEFAULT_SORT: Sorter = { campo: "titulo", ordem: "ASC" };
const PERFIS_DEFAULT_SORT: Sorter = { campo: "nome", ordem: "ASC" };

function buildVagasFilters(selected: VagasFilterKey[]): FilterField[] {
  const out: FilterField[] = [];

  if (selected.includes("remunerada")) {
    out.push({ campo: "ehRemunerada", operador: "eq", valor: true });
  }

  const horas: number[] = [];
  if (selected.includes("20h")) horas.push(20);
  if (selected.includes("30h")) horas.push(30);
  if (selected.includes("40h")) horas.push(40);

  if (horas.length === 1) out.push({ campo: "cargaHoraria", operador: "eq", valor: horas[0] });
  if (horas.length > 1) out.push({ campo: "cargaHoraria", operador: "in", valor: horas });

  return out;
}

function buildPerfisFilters(selected: PerfisFilterKey[]): FilterField[] {
  if (selected.length === 0) return [];

  const tipos = selected.map((k) => (k === "candidato" ? "CANDIDATO" : "RECRUTADOR"));

  return tipos.length === 1
    ? [{ campo: "tipo", operador: "eq", valor: tipos[0] }]
    : [{ campo: "tipo", operador: "in", valor: tipos }];
}

const HomePage = () => {
  const { vagas, perfis, fetchVagas, fetchPerfis } = useHomePage();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);
  const navigate = useNavigate();
  const { perfil, authChecked } = useAuth();

  useEffect(() => {
    if (authChecked && !perfil) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, perfil]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<TabKey>("vagas");

  const [vagasSelectedFilters, setVagasSelectedFilters] = useState<VagasFilterKey[]>([]);
  const [perfisSelectedFilters, setPerfisSelectedFilters] = useState<PerfisFilterKey[]>([]);

  const [vagasSort, setVagasSort] = useState<Sorter>(VAGAS_DEFAULT_SORT);
  const [perfisSort, setPerfisSort] = useState<Sorter>(PERFIS_DEFAULT_SORT);

  const vagasFilters = useMemo(
    () => buildVagasFilters(vagasSelectedFilters),
    [vagasSelectedFilters]
  );

  const perfisFilters = useMemo(
    () => buildPerfisFilters(perfisSelectedFilters),
    [perfisSelectedFilters]
  );

  const vagasFiltradas = useMemo(() => {
    if (!q) return vagas;

    return vagas.filter((v) =>
      [
        v.titulo,
        v.categoria,
        v.ehRemunerada,
        v.cargaHoraria
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [vagas, q]);

  const perfisFiltrados = useMemo(() => {
    if (!q) return perfis;

    return perfis.filter((p) =>
      [
        (p as any).nome,
        (p as any).email
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [perfis, q]);

  const items = useMemo(
    () => [
      { label: `Vagas (${vagasFiltradas.length})` },
      { label: `Perfis (${perfisFiltrados.length})` },
    ],
    [vagasFiltradas.length, perfisFiltrados.length]
  );

  const isDetailsOpen = selectedVaga !== null;

  const openDetails = useCallback((vaga: Vaga) => setSelectedVaga(vaga), []);
  const closeDetails = useCallback(() => setSelectedVaga(null), []);

  const applyVagasQuery = useCallback(
    (nextFilters: FilterField[], nextSort: Sorter) => {
      fetchVagas({ filters: nextFilters, sorters: [nextSort] });
    },
    [fetchVagas]
  );

  const applyPerfisQuery = useCallback(
    (nextFilters: FilterField[], nextSort: Sorter) => {
      fetchPerfis({ filters: nextFilters, sorters: [nextSort] });
    },
    [fetchPerfis]
  );

  const openFiltersDialog = useCallback((tab: TabKey) => {
    setFilterTab(tab);
    setFiltersOpen(true);
  }, []);

  const toggleVagasFilter = useCallback((key: VagasFilterKey) => {
    setVagasSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  }, []);

  const togglePerfisFilter = useCallback((key: PerfisFilterKey) => {
    setPerfisSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  }, []);

  const applySelectedFilters = useCallback(() => {
    if (filterTab === "vagas") {
      applyVagasQuery(vagasFilters, vagasSort);
    } else {
      applyPerfisQuery(perfisFilters, perfisSort);
    }
    setFiltersOpen(false);
  }, [filterTab, applyVagasQuery, applyPerfisQuery, vagasFilters, perfisFilters, vagasSort, perfisSort]);

  const clearFilters = useCallback(() => {
    if (filterTab === "vagas") {
      setVagasSelectedFilters([]);
      applyVagasQuery([], vagasSort);
    } else {
      setPerfisSelectedFilters([]);
      applyPerfisQuery([], perfisSort);
    }
    setFiltersOpen(false);
  }, [filterTab, applyVagasQuery, applyPerfisQuery, vagasSort, perfisSort]);

  const toggleSort = useCallback(
    (tab: TabKey) => {
      if (tab === "vagas") {
        setVagasSort((prev) => {
          const next: Sorter = { ...prev, ordem: prev.ordem === "ASC" ? "DESC" : "ASC" };
          applyVagasQuery(vagasFilters, next);
          return next;
        });
      } else {
        setPerfisSort((prev) => {
          const next: Sorter = { ...prev, ordem: prev.ordem === "ASC" ? "DESC" : "ASC" };
          applyPerfisQuery(perfisFilters, next);
          return next;
        });
      }
    },
    [applyVagasQuery, applyPerfisQuery, vagasFilters, perfisFilters]
  );

  const vagasFilterLabel = useMemo(() => {
    if (vagasSelectedFilters.length === 0) return "Nenhum";
    return `${vagasSelectedFilters.length} selecionado(s)`;
  }, [vagasSelectedFilters.length]);

  const perfisFilterLabel = useMemo(() => {
    if (perfisSelectedFilters.length === 0) return "Nenhum";
    return `${perfisSelectedFilters.length} selecionado(s)`;
  }, [perfisSelectedFilters.length]);


  return !perfil ? (
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
          style={{ width: "520px", maxWidth: "92vw" }}
        >
          <div className="filters-content">
            <div className="filters-list">
              {filterTab === "vagas" ? (
                <>
                  <div className="filter-row">
                    <Checkbox
                      inputId="f-remunerada"
                      checked={vagasSelectedFilters.includes("remunerada")}
                      onChange={() => toggleVagasFilter("remunerada")}
                    />
                    <label htmlFor="f-remunerada">Vaga Remunerada</label>
                  </div>

                  <div className="filter-row">
                    <Checkbox
                      inputId="f-20h"
                      checked={vagasSelectedFilters.includes("20h")}
                      onChange={() => toggleVagasFilter("20h")}
                    />
                    <label htmlFor="f-20h">20h semanais</label>
                  </div>

                  <div className="filter-row">
                    <Checkbox
                      inputId="f-30h"
                      checked={vagasSelectedFilters.includes("30h")}
                      onChange={() => toggleVagasFilter("30h")}
                    />
                    <label htmlFor="f-30h">30h semanais</label>
                  </div>

                  <div className="filter-row">
                    <Checkbox
                      inputId="f-40h"
                      checked={vagasSelectedFilters.includes("40h")}
                      onChange={() => toggleVagasFilter("40h")}
                    />
                    <label htmlFor="f-40h">40h semanais</label>
                  </div>
                </>
              ) : (
                <>
                  <div className="filter-row">
                    <Checkbox
                      inputId="p-candidato"
                      checked={perfisSelectedFilters.includes("candidato")}
                      onChange={() => togglePerfisFilter("candidato")}
                    />
                    <label htmlFor="p-candidato">Candidatos</label>
                  </div>

                  <div className="filter-row">
                    <Checkbox
                      inputId="p-recrutador"
                      checked={perfisSelectedFilters.includes("recrutador")}
                      onChange={() => togglePerfisFilter("recrutador")}
                    />
                    <label htmlFor="p-recrutador">Recrutadores</label>
                  </div>
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
              />
              <Button
                className="aplicar-button"
                label="Aplicar"
                icon="pi pi-check"
                onClick={applySelectedFilters}
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
                  />
                )}

                <Button
                  label={`Filtros (${vagasFilterLabel})`}
                  icon="pi pi-filter"
                  className="filter-button"
                  onClick={() => openFiltersDialog("vagas")}
                />

                <Button
                  label="Ordenação"
                  icon="pi pi-sort-alt"
                  className="sort-button"
                  onClick={() => toggleSort("vagas")}
                />
              </div>
            </div>

            {vagasFiltradas.length === 0 && (
              <div className="message">
                {q ? "Nenhuma vaga encontrada para a busca." : "Nenhuma vaga pública disponível."}
              </div>
            )}

            <div className="position-list-cards">
              {vagasFiltradas.map((vaga) => (
                <VagaCard
                  key={vaga.id}
                  vaga={vaga}
                  openDetails={openDetails}
                  showActions={false}
                />
              ))}

              <Dialog
                className="vaga-dialog"
                visible={isDetailsOpen}
                onHide={closeDetails}
                header={selectedVaga?.titulo}
                style={{ width: "70vw" }}
              >
                {selectedVaga && <VagaDetails vaga={selectedVaga} />}
              </Dialog>
            </div>
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
                  label="Ordenação"
                  icon="pi pi-sort-alt"
                  className="sort-button"
                  onClick={() => toggleSort("perfis")}
                />
              </div>
            </div>

            {perfisFiltrados.length === 0 && (
              <div className="message">
                {q ? "Nenhum perfil encontrado para a busca." : "Nenhum perfil disponível."}
              </div>
            )}

            <div className="perfis-list-card">
              {perfisFiltrados.map((perfil) => (
                <PerfilCard key={`${perfil.id}`} perfil={perfil} />
              ))}
            </div>
          </>
        )}

        <Dialog
          className="recommended-vagas-modal"
          visible={isRecommendedOpen}
          onHide={closeRecommended}
          header="Vagas Recomendadas"
          style={{ width: "80vw" }}
        >
          {loading && <p className="loading">Carregando vagas recomendadas...</p>}
          {error && <p>{error}</p>}
          {recommendedVagas.length === 0 && !loading && !error && <p>Não há vagas recomendadas no momento.</p>}

          {!loading && !error && recommendedVagas.length > 0 && (
            <div className="position-list-cards">
              {recommendedVagas.map((recomendacao) => {
                return <VagaCard key={recomendacao.vaga.id} vaga={recomendacao.vaga} openDetails={openDetails} showActions={false} />;
              })}
            </div>
          )}
          <div className="modal-footer">
            <Button
            label="Atualizar Recomendações"
            icon="pi pi-sparkles"
            className="recommended-update-button"
            onClick={refetch} 
            />
          </div>

        </Dialog>
      </div>
    </Layout>
  );
};

export default HomePage;