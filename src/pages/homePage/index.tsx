import { useEffect, useMemo, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import "./style.css";
import VagaDetails from "./VagaDetails";
import VagaCard from "./VagaCard";
import type { Vaga } from "../../domains/Vaga";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const HomePage = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
     const fetchVagas = async () => {
      try {
        const response = await fetch(`${API_URL}/vagas`);
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchVagas();
  }, []);

  const vagasPublicas = useMemo(() => vagas.filter(v => v.ehPublica),[vagas]);

  const items = useMemo(
    () => [{ label: `Vagas (${vagasPublicas.length})` }, { label: "Perfis" }],
    [vagasPublicas.length]
  ); 

  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);
  const isDetailsOpen = selectedVaga !== null;

  const openDetails = (vaga: Vaga) => setSelectedVaga(vaga);
  const closeDetails = () => setSelectedVaga(null);

  return (

  <Layout showFooter headerType="full">
    <div className="main-context">
      <TabMenu model={items} className="tab-menu-homepage" />

      <div className="position-header">
        <h1 className="page-title">Painel de Vagas</h1>

        <div className="position-buttons">
          <Button label="Vagas Recomendadas" icon="pi pi-sparkles" className="recomendation-button"/>
          <Button label="Filtros" icon="pi pi-filter" className="filter-button"/>
          <Button label="Ordenação" icon="pi pi-sort-alt" className="sort-button"/>
        </div>
      </div>

      {vagasPublicas.length === 0 && (
          <div className="message"> Nenhuma vaga pública disponível. </div>
      )} 

      <div className="position-list-cards">
        
        {vagasPublicas.map((vaga) => ( 
          <VagaCard key={vaga.id} vaga={vaga} openDetails={openDetails}/> 
        ))} 

        <Dialog
          className="vaga-dialog"
          visible={isDetailsOpen}
          onHide={closeDetails}
          header={selectedVaga?.titulo}
          style={{ width: "70vw" }}
        >
          {selectedVaga && (<VagaDetails vaga={selectedVaga} />)}
        </Dialog>
      </div>
    </div>
  </Layout>
  );
};

export default HomePage;