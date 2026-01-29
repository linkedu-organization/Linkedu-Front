import { useEffect, useMemo, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import "./style.css";
import VagaDetails from "./vagaDetails";
import type { Vaga } from "../../domains/Vaga";

type RecrutadorAPI = {
  id: number;
  perfil: PerfilAPI;
};

type PerfilAPI = {
  id: number;
  nome: string;
}

const API_URL = "http://localhost:3333/api";

const HomePage = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [recrutadores, setRecrutadores] = useState<RecrutadorAPI[]>([]);


  useEffect(() => {

    const fetchRecrutadores = async () => {
      try {
        const response = await fetch(`${API_URL}/recrutadores`);  
        const data = await response.json();
        setRecrutadores(data);  
      } catch (error) {
        console.error("Erro ao buscar recrutadores:", error);
      }
    };

     const fetchVagas = async () => {
      try {
        const response = await fetch(`${API_URL}/vagas`);
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };

    fetchRecrutadores();
    fetchVagas();

  }, []);

  const vagasPublicas = useMemo(
  () => vagas.filter(v => v.ehPublica),
  [vagas]
  );

  const items = useMemo(
    () => [{ label: `Vagas (${vagasPublicas.length})` }, { label: "Perfis" }],
    [vagasPublicas]
  ); 

  const getRecrutadorNome = (recrutadorId: number): string => {
    const recrutador = recrutadores.find(r => r.id === recrutadorId);
    return recrutador?.perfil.nome || "NULL";
  }

  const [displayBasic, setDisplayBasic] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState<Vaga | null>(null);

  const openDetails = (vaga: Vaga) => {
    setSelectedVaga(vaga);
    setDisplayBasic(true);
  };

  const closeDetails = () => {
    setDisplayBasic(false);
    setSelectedVaga(null);
  };

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
          <Card key={vaga.id} className="position-card"> 

            <div className="position-card-header">
              <h2 className="card-title">{vaga.titulo} - {vaga.categoria}</h2>
              <p className="position-work-hours">{vaga.cargaHoraria}h/semana</p>
            </div>  

            <p className="position-type">
              <span className="value ellipsis">{vaga.ehRemunerada ? "Remunerada" : "Voluntária"}</span>
            </p>

           <p className="position-lab">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-building" />
              </span>
              <span className="value ellipsis">{vaga.instituicao}</span>
            </p>

            <p className="position-recruiter">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-user" />
              </span>
              <b>Ofertada por: </b>
              <span className="value ellipsis">{getRecrutadorNome(vaga.recrutadorId)}</span>
              </p>

            <p className="position-course">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-book" />
              </span>
              <b>Curso: </b>
              <span className="value ellipsis">{vaga.curso}</span>
            </p>

            <p className="position-skills">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-check-circle" />
              </span>
              <b>Conhecimentos Obrigatórios: </b>
              <span className="value ellipsis">{vaga.conhecimentosObrigatorios}</span>
            </p>
            
            <div className="position-card-footer">
              <Button
                  label="Ver Detalhes"
                  className="details-button"
                  onClick={() => openDetails(vaga)}
                />
            </div>
          </Card> 
        ))} 

        <Dialog
          className="vaga-dialog"
          header={selectedVaga ? selectedVaga.titulo : "Detalhes"}
          visible={displayBasic}
          style={{ width: "70vw" }}
          onHide={closeDetails}
        >
          {selectedVaga && (<VagaDetails vaga={selectedVaga} recrutadorNome={getRecrutadorNome(selectedVaga.recrutadorId)} />)}
        </Dialog>
      </div>
    </div>
  </Layout>
  );
};
export default HomePage;
