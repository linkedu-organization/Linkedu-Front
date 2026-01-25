import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "@fontsource/inter/700.css";
import "./style.css";

const HomePage = () => {
  const items = [{ label: "Vagas" }, { label: "Perfis" }];
  const vagas = [
  { id: 1, title: "Dev Backend Java", work_hours: "20h/semana", type: "Voluntária", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 2, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 3, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 4, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 5, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 6, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  ];

  return (

  <Layout showFooter headerType="full">
    <div className="main-context">
      <TabMenu model={items} className="tab-menu-homepage" />

      <div className="position-header">
        <h1 className="position-title">Painel de Vagas</h1>

        <div className="position-buttons">
          <Button label="Vagas Recomendadas" className="recomendation-button"/>
          <Button label="Filtro" className="filter-button"/>
          <Button label="Ordenação" className="sort-button"/>
        </div>
      </div>

      <div className="position-list-cards">
        {vagas.map((vaga) => (
          <Card key={vaga.id} className="position-card"> 

            <div className="position-header">
              <h2 className="position-title">{vaga.title}</h2>
              <p className="position-work-hours">{vaga.work_hours}</p>
            </div>  

            <p className="position-type">{vaga.type}</p>
            <p className="position-lab">{vaga.lab}</p>
            <p className="position-recruiter"><b>Recrutador: </b>{vaga.recruiter}</p>
            <p className="position-course"><b>Curso: </b>{vaga.course}</p>
            <p className="position-skills"><b>Conhecimentos Obrigatórios: </b>{vaga.previous_knowledge}</p>
            
            <Button label="Ver Detalhes" className="details-button"/>  
            
          </Card>
        ))}
      </div>
      
    </div>
  </Layout>
  );
};
export default HomePage;
