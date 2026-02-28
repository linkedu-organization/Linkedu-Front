import { Dialog } from "primereact/dialog";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import VagaDetails from "@components/Vaga/indexDetail";
import { VagaCard } from "@components/Vaga";
import PerfilCard from "@components/Profile";
import { useHomePage } from "@stores/homePage/indexStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Vaga } from "@domains/Vaga";
import "./style.css";
import { useRecommendedVagas } from "@hooks/useRecommendedVaga";

const HomePage = () => {
  const { vagas, perfis } = useHomePage();
  const { recommendedVagas, loading, error, fetchRecommendedVagas,refetch } = useRecommendedVagas();
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRecommendedOpen, setIsRecommendedOpen] = useState(false);

  const items = useMemo(
    () => [
      { label: `Vagas (${vagas.length})` },
      { label: `Perfis (${perfis.length})` },
    ],
    [vagas.length, perfis.length]
  );
  const isDetailsOpen = selectedVaga !== null;

  const openDetails = useCallback((vaga: Vaga) => {
    setSelectedVaga(vaga);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedVaga(null);
  }, []);

  const openRecommended = () => {
    setIsRecommendedOpen(true);
  };
 
  const closeRecommended = () => {
    setIsRecommendedOpen(false);
  };

  useEffect(() => {
    if (isRecommendedOpen && recommendedVagas.length === 0) {
      fetchRecommendedVagas(); 
    }
  }, [isRecommendedOpen]);

  return (
    <Layout showFooter headerType="full">
      <div className="main-context">
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
                <Button
                  label="Vagas Recomendadas"
                  icon="pi pi-sparkles"
                  className="recomendation-button"
                  onClick={openRecommended}
                />
                <Button
                  label="Filtros"
                  icon="pi pi-filter"
                  className="filter-button"
                />
                <Button
                  label="Ordenação"
                  icon="pi pi-sort-alt"
                  className="sort-button"
                />
              </div>
            </div>

            {vagas.length === 0 && (
              <div className="message"> Nenhuma vaga pública disponível.</div>
            )}

            <div className="position-list-cards">
              {vagas.map((vaga) => (
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
                  label="Filtros"
                  icon="pi pi-filter"
                  className="filter-button"
                />
                <Button
                  label="Ordenação"
                  icon="pi pi-sort-alt"
                  className="sort-button"
                />
              </div>
            </div>

            {perfis.length === 0 && (
              <div className="message"> Nenhum perfil disponível.</div>
            )}

            <div className="perfis-list-card">
              {perfis.map((perfil) => (
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
