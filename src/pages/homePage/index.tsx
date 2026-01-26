import { useEffect, useMemo, useState } from "react";
import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import "./style.css";

 type VagaAPI = {
  id: number;
  recrutadorId: number;
  titulo: string;
  descricao: string;
  ehPublica: boolean;
  ehRemunerada: boolean;
  dataExpiracao: string;
  cargaHoraria: number;
  duracao: string;
  instituicao: string;
  curso: string;
  linkInscricao: string;
  local: string;
  publicoAlvo: string[];
  conhecimentosObrigatorios: string[];
  conhecimentosOpcionais: string[];
  categoria: string;
};

type RecrutadorAPI = {
  id: number;
  perfil_id: number;
};

type PerfilAPI = {
  id: number;
  nome: string;
}

const API_URL = "http://localhost:3333/api";

const HomePage = () => {
  const [vagas, setVagas] = useState<VagaAPI[]>([]);
  const [recrutadores, setRecrutadores] = useState<RecrutadorAPI[]>([]);
  const [perfis, setPerfis] = useState<PerfilAPI[]>([]);

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

    const fetchPerfis = async () => {   
      try {
        const response = await fetch(`${API_URL}/perfis`);  
        const data = await response.json();
        setPerfis(data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
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

    fetchPerfis();
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

  const getPerfilId = (recrutadorId: number): number => {
    const recrutador = recrutadores.find((rec) => rec.id === recrutadorId);
    return recrutador ? recrutador.perfil_id : 0;
  }

  const getRecrutadorNome = (recrutadorId: number): string => {
    const perfil_id = getPerfilId(recrutadorId);
    console.log("Perfil ID:", perfil_id);
    const perfil = perfis.find((perfil) => perfil.id === perfil_id);
    return perfil ? perfil.nome : "NULL";
  }

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
              <Button label="Ver Detalhes" className="details-button" />
            </div>
            
          </Card> 
        ))} 
      </div>
      
    </div>
  </Layout>
  );
};
export default HomePage;
