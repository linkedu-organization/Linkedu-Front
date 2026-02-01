import { useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import "./style.css";
import VagaDetails from "./components/vagaDetails";
import VagaCard from "./components/VagaCard";
import PerfilCard from "./components/PerfilCard";
import type { Vaga } from "@domains/Vaga";
import { useVagas } from "@stores/home/vagaStore";
import { usePerfil } from "@stores/home/perfilStore";

const HomePage = () => {
  const { vagas } = useVagas();
  const { perfis } = usePerfil();
  const vagasPublicas = useMemo(
    () => vagas.filter((v) => v.ehPublica),
    [vagas]
  );

  const items = useMemo(
    () => [
      { label: `Vagas (${vagasPublicas.length})` },
      { label: `Perfis (${perfis.length})` },
    ],
    [vagasPublicas.length]
  );

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const isDetailsOpen = selectedVaga !== null;

  const openDetails = (vaga: Vaga) => setSelectedVaga(vaga);
  const closeDetails = () => setSelectedVaga(null);

  const [activeIndex, setActiveIndex] = useState(0);

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

            {vagasPublicas.length === 0 && (
              <div className="message"> Nenhuma vaga pública disponível.</div>
            )}

            <div className="position-list-cards">
              {vagasPublicas.map((vaga) => (
                <VagaCard key={vaga.id} vaga={vaga} openDetails={openDetails} />
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

            <div className="perfis-list-card"></div>
            {perfis.map((perfil) => (
              <PerfilCard key={`${perfil.id}`} perfil={perfil} />
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
