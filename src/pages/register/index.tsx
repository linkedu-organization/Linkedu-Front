import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Layout } from "@components/Layout";
import "./style.css";

const loginRedirect = (
  <div className="login-link">
    <span>Já possui conta? </span>
    <Link to="/login" className="enter-link">
      Entre
    </Link>
  </div>
);

const formatColumn = (title: string, description: string, type: string) => (
  <div className="option-column">
    <h2 className="option-title">{title}</h2>
    <p className="option-description">{description}</p>
    <Link to={`/register/${type}`}>
      <Button className="register-button">Cadastre-se</Button>
    </Link>
    {loginRedirect}
  </div>
);

const RegistrationPage = () => (
  <Layout headerType="none" showFooter>
    <div className="registration-page">
      <img alt="logo" src="/images/logo-azul.png" className="register-logo" />

      <p className="register-question">
        Como você pretende utilizar a plataforma?
      </p>

      <div className="card-register">
        <div className="options-container">
          {formatColumn(
            "Procurar vagas",
            "Desejo buscar boas oportunidades",
            "candidato"
          )}

          <div className="divider" />

          {formatColumn(
            "Ofertar vagas",
            "Desejo cadastrar novas oportunidades",
            "recrutador"
          )}
        </div>
      </div>
    </div>
  </Layout>
);

export default RegistrationPage;
