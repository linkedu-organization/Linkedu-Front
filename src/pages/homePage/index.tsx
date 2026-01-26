import { Layout } from "@components/Layout";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import "@fontsource/inter/700.css";
import "@fontsource/inter/300.css";
import "./style.css";

const HomePage = () => {
  const vagas = [
  { id: 1, title: "Dev Backend Java blablbalablablablabalablablabalablabal", work_hours: "20h/semana", type: "Voluntária", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQLblablablabalbalablablabalbalablabalbalablabalbalbalabla" },
  { id: 2, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 3, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 4, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 5, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 6, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 7, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 8, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 9, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 10, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" },
  { id: 11, title: "Dev Frontend", work_hours: "30h/semana", type: "Remunerada", lab: "Lab XYZ", recruiter: "Carlos", course: "Ciência da Computação", previous_knowledge: "Java, TypeScript, Spring Boot, SQL" }
  ];
  const items = [{ label: `Vagas (${vagas.length})` }, { label: "Perfis" }];


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

      <div className="position-list-cards">
        {vagas.map((vaga) => (
          <Card key={vaga.id} className="position-card"> 

            <div className="position-card-header">
              <h2 className="card-title">{vaga.title}</h2>
              <p className="position-work-hours">{vaga.work_hours}</p>
            </div>  

            <p className="position-type">
              <span className="value ellipsis">{vaga.type}</span>
            </p>

           <p className="position-lab">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-building" />
              </span>
              <span className="value ellipsis">{vaga.lab}</span>
            </p>

            <p className="position-recruiter">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-user" />
              </span>
              <b>Ofertada por: </b>
              <span className="value ellipsis">{vaga.recruiter}</span>
              </p>

            <p className="position-course">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-book" />
              </span>
              <b>Curso: </b>
              <span className="value ellipsis">{vaga.course}</span>
            </p>

            <p className="position-skills">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-check-circle" />
              </span>
              <b>Conhecimentos Obrigatórios: </b>
              <span className="value ellipsis">{vaga.previous_knowledge}</span>
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
