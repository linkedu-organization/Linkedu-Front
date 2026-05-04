import { Layout } from "@components/Layout";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout showFooter={true} headerType="home">
      <div className="home-page">
        <section className="home-hero">
          <div className="home-hero-decoration home-hero-decoration-left">
            <div className="home-hero-ring" />
            <div className="home-hero-ball" />
          </div>

          <div className="home-hero-decoration home-hero-decoration-right">
            <div className="home-hero-ball" />
          </div>

          <div className="home-hero-content">
            <h1>
              Conecte-se com as melhores
              <span> oportunidades acadêmicas</span>
            </h1>

            <p>
              
            </p>
          </div>
        </section>

        <section className="home-features">
          <div className="home-section-header">
            <h2>Nossas funcionalidades</h2>
            <p>
            
            </p>
          </div>

          <div className="home-feature-grid">

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="pi pi-sparkles" />
              </div>
              <h3>Vagas recomendadas</h3>
              <p>
                Receba sugestões inteligentes baseadas no seu perfil para
                encontrar a vaga ideal mais rápido.
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="pi pi-briefcase" />
              </div>
              <h3>Painel de Vagas</h3>
              <p>
                Navegue por todas as oportunidades acadêmicas publicadas, com
                detalhes completos sobre carga horária e remuneração.
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="pi pi-users" />
              </div>
              <h3>Perfis</h3>
              <p>
                Encontre candidatos e recrutadores da sua área de atuação com
                informações claras e atualizadas.
              </p>
            </div>

            <div className="home-feature-card">
              <div className="home-feature-icon">
                <i className="pi pi-filter" />
              </div>
              <h3>Filtros avançados</h3>
              <p>
                Refine sua busca por carga horária, remuneração, tipo de perfil
                e muito mais.
              </p>
            </div>

          </div>

        </section>
      </div>
    </Layout>
  );
};

export default HomePage;