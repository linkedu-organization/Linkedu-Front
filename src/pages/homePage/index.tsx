import { Dialog } from "primereact/dialog";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import VagaDetails from "@components/Vaga/indexDetail";
import { VagaCard } from "@components/Vaga";
import PerfilCard from "@components/Profile";
import { useHomePage } from "@stores/home/homePageStore";
import "./style.css";

const HomePage = () => {
  const {
    vagas,
    perfis,
    items,
    activeIndex,
    setActiveIndex,
    selectedVaga,
    isDetailsOpen,
    openDetails,
    closeDetails,
  } = useHomePage();

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
      </div>
    </Layout>
  );
};

export default HomePage;
